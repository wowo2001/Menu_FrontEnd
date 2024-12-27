import './PlanPage.css';
import axios from 'axios';
import { useRouter } from 'vue-router'; // To navigate programmatically

const apiHost = "http://13.54.181.1:80";
export default {
    name: "PlanPage",
    data() {
        return {
            MenuIdList: [],
            menuId: null,
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // Days of the week
            currentDayIndex: 0,
            menuDataMain: [],
            menuDataSide: [],           // Menu data for Side Dishes
            menuDataSoup: [],           // Menu data for Soups
            menuDataLunch: [],
            menuDataBaby: [],
            selectedMainDish: null,     // Selected main dish
            selectedSideDish1: null,    // Selected side dish 1
            selectedSideDish2: null,    // Selected side dish 2
            selectedSoup: null,         // Selected soup
            selectedLunch: null,
            selectedBaby: null,
            previousSelectedMainDish: null,     // Selected main dish
            previousSelectedSideDish1: null,    // Selected side dish 1
            previousSelectedSideDish2: null,    // Selected side dish 2
            previousSelectedSoup: null,         // Selected soup
            previousSelectedLunch: null,
            previousSelectedBaby: null,
            mainDishIngredients: [],    // Ingredients for main dish
            sideDish1Ingredients: [],   // Ingredients for side dish 1
            sideDish2Ingredients: [],   // Ingredients for side dish 2
            soupIngredients: [],        // Ingredients for soup
            lunchIngredients: [],
            babyIngredients: [],
            errorMessage: "",           // Error message for validation
        };
    },
    mounted() {
        this.formattedDate();
        this.fetchAllPurchaseList();
        this.fetchMenuData();    // Fetch the menu data when the component is mounted
        this.fetchTodayChoice(this.menuId);
        
    },

    methods: {
        // Fetch menu data from API
        async fetchMenuData() {
            try {
                const responseMain = await axios.get(`${apiHost}/menu/getMenu?category=Main`);
                this.menuDataMain = responseMain.data.name || []; // Make sure it's an array

                const responseSide = await axios.get(`${apiHost}/menu/getMenu?category=Side`);
                this.menuDataSide = responseSide.data.name || []; // Make sure it's an array

                const responseSoup = await axios.get(`${apiHost}/menu/getMenu?category=Soup`);
                this.menuDataSoup = responseSoup.data.name || []; // Make sure it's an array

                const responseLunch = await axios.get(`${apiHost}/menu/getMenu?category=Lunch`);
                this.menuDataLunch = responseLunch.data.name || []; // Make sure it's an array

                const responseBaby = await axios.get(`${apiHost}/menu/getMenu?category=Baby`);
                this.menuDataBaby = responseBaby.data.name || []; // Make sure it's an array
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        },
        // Fetch ingredients for the selected dish
        async fetchIngredients(menuName, dishType) {
            try {
                const response = await axios.get(`${apiHost}/menu/getIngredient?name=${menuName}`);
                if (dishType === 'main') {
                    this.mainDishIngredients = response.data || [];
                } else if (dishType === 'side1') {
                    this.sideDish1Ingredients = response.data || [];
                } else if (dishType === 'side2') {
                    this.sideDish2Ingredients = response.data || [];
                }
                else if (dishType === 'soup') {
                    this.soupIngredients = response.data || [];
                }
                else if (dishType === 'lunch') {
                    this.lunchIngredients = response.data || [];
                }
                else if (dishType === 'baby') {
                    this.babyIngredients = response.data || [];
                }
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        },
        async fetchTodayChoice(menuId) {
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetShopList?Id=${menuId}`);
                
                const todayChoiceList = response.data.myChoice;
                this.clearCache();
                    // Assuming the response contains the allIngredientList
                    todayChoiceList.forEach((item, index) => {
                        if (this.dayOfWeek[this.currentDayIndex] === item.day) {
                            this.selectedMainDish = item.dish[0];
                            this.selectedSideDish1 = item.dish[1];
                            this.selectedSideDish2 = item.dish[2];
                            this.selectedSoup = item.dish[3];
                            this.selectedLunch = item.dish[4];
                            this.selectedBaby = item.dish[5];
                        }
                    });
  

            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
            this.fetchIngredients(this.selectedMainDish, 'main');
            this.fetchIngredients(this.selectedSideDish1, 'side1')
            this.fetchIngredients(this.selectedSideDish2, 'side2')
            this.fetchIngredients(this.selectedSoup, 'soup')
            this.fetchIngredients(this.selectedLunch, 'lunch')
            this.fetchIngredients(this.selectedBaby, 'baby')
            this.cacheDropdownListOptions();
        },

        async fetchIngredientList(menuId) {
            //await this.delay(500);
            try {
                const response = await axios.get(`${apiHost}/ShopList/AggregateList?Id=${menuId}`);

            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
        },

        async fetchAllPurchaseList() {
            try {
            const response = await axios.get(`${apiHost}/ShopList/GetAllPurchaseList`);
                // Assuming the response contains the allIngredientList
                response.data.forEach((menuId, index) => {
                    console.log(this.MenuIdList);
                    if (!this.MenuIdList.includes(menuId)) {
                        this.MenuIdList.push(menuId);
                    }
                });
        } catch(error) {
            console.error("Error fetching ingredient list:", error);
        }
        },
        async setMenuId(menuId) {
            this.menuId = menuId;
            console.log(this.menuId);
            this.fetchTodayChoice(this.menuId);
            this.currentDayIndex = 0;
        },
        async formattedDate() {
            const today = new Date();
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            this.menuId = today.toLocaleDateString('en-US', options);
            this.MenuIdList.push(this.menuId);
            return this.menuId // Format as MM/DD/YYYY
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async updateShopList(menuName, dishType) {
            var existingInThisWeeksMenu = await this.isDishExistingInThisWeeksMenu(menuName);
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetPurchaseList`, {
                    params: {
                        Id: this.menuId
                    }
                });
                var notExistingPurchaseList = response.data.id == null;
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }

            const requestBody = {
                Id: this.menuId,  // Using the formatted menu ID (e.g., "12/2/2024")
                MyChoice: [
                    {
                        Day: this.dayOfWeek[this.currentDayIndex],  // Get the current day of the week
                        Dish: [
                            this.selectedMainDish,   // Add selected main dish
                            this.selectedSideDish1,  // Add selected side dish 1
                            this.selectedSideDish2,  // Add selected side dish 2
                            this.selectedSoup,        // Add selected soup
                            this.selectedLunch,        // Add selected soup
                            this.selectedBaby        // Add selected soup
                        ].filter(Boolean) // Remove any null/undefined values from the list
                    }
                ]
            };
            if (notExistingPurchaseList == true && !existingInThisWeeksMenu) {
                axios.post(`${apiHost}/ShopList/UpdateShopList`, requestBody)
                    .then(response => {
                        console.log("Successfully updated the shop list:", response.data);
                    })
                    .catch(error => {
                        console.error('Error updating the shop list:', error);
                        // Handle error (e.g., show an error message to the user)
                    });
                this.cacheDropdownListOptions();
            }
            else {
                var userResponse = true;
                if (!notExistingPurchaseList) {
                    userResponse = confirm("已经生成购物清单，更改菜单可能影响购物清单，是否更改？") && userResponse;
                }
                if (existingInThisWeeksMenu && userResponse) {
                    userResponse = confirm("本周菜单已有此菜，是否继续选择？") && userResponse;
                }
                if (userResponse) {
                    axios.post(`${apiHost}/ShopList/UpdateShopList`, requestBody)
                        .then(response => {
                            console.log("Successfully updated the shop list:", response.data);
                        })
                        .catch(error => {
                            console.error('Error updating the shop list:', error);
                            // Handle error (e.g., show an error message to the user)
                        });
                    this.cacheDropdownListOptions();
                }
                else {
                    if (dishType === 'main') {
                        this.selectedMainDish = this.previousSelectedMainDish;
                        this.fetchIngredients(this.selectedMainDish, 'main');
                    } else if (dishType === 'side1') {
                        this.selectedSideDish1 = this.previousSelectedSideDish1;
                        this.fetchIngredients(this.selectedSideDish1, 'side1');
                    } else if (dishType === 'side2') {
                        this.selectedSideDish2 = this.previousSelectedSideDish2;
                        this.fetchIngredients(this.selectedSideDish2, 'side2');
                    }
                    else if (dishType === 'soup') {
                        this.selectedSoup = this.previousSelectedSoup;
                        this.fetchIngredients(this.selectedSoup, 'soup');
                    }
                    else if (dishType === 'lunch') {
                        this.selectedLunch = this.previousSelectedLunch;
                        this.fetchIngredients(this.selectedLunch, 'lunch');
                    }
                    else if (dishType === 'baby') {
                        this.selectedBaby = this.previousSelectedBaby;
                        this.fetchIngredients(this.selectedBaby, 'baby');
                    }
                }
            }
        },
        async handleUpdateDropList(menuName, dishType) {
            this.fetchIngredients(menuName, dishType);
            this.updateShopList(menuName, dishType);
           
        },
        cacheDropdownListOptions() {
            this.previousSelectedMainDish = this.selectedMainDish;
            this.previousSelectedSideDish1 = this.selectedSideDish1;
            this.previousSelectedSideDish2 = this.selectedSideDish2;
            this.previousSelectedSoup = this.selectedSoup;
            this.previousSelectedLunch = this.selectedLunch;
            this.previousSelectedBaby = this.selectedBaby;

        },

        async isDishExistingInThisWeeksMenu(dishName) {
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetShopList?Id=${this.menuId}`);
                const todayChoiceList = response.data.myChoice;
                var thisWeeksMenu = new Set();
                todayChoiceList.forEach((item, index) => {
                    item.dish.forEach((dish, index) => {
                        thisWeeksMenu.add(dish);
                    });
            });
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
            return thisWeeksMenu.has(dishName);
        },
        clickNextButton() {
            if (this.currentDayIndex < 4) {
                this.fetchTodayChoice(this.menuId);
                this.currentDayIndex++;
                this.clearCache();
            }
            else {
                this.fetchIngredientList(this.menuId);
                this.$router.push({ path:'/miscellaneous', query: { menuId: this.menuId } });
            }
           
        },
        clickPreviousButton() {
            this.fetchTodayChoice(this.menuId);
            this.currentDayIndex--;
            this.clearCache();
        },
        setDay(day) {
            this.fetchTodayChoice(this.menuId);
            this.currentDayIndex = day;
            this.clearCache();
        },
        clearCache() {
            this.selectedMainDish = null;
            this.selectedSideDish1 = null;
            this.selectedSideDish2 = null;
            this.selectedSoup = null;
            this.selectedLunch = null;
            this.selectedBaby = null;
            this.mainDishIngredients = [];
            this.sideDish1Ingredients = [];
            this.sideDish2Ingredients = [];
            this.soupIngredients = [];
            this.lunchIngredients = [];
            this.babyIngredients = [];
            this.previousSelectedMainDish = null;
            this.previousSelectedSideDish1 = null;
            this.previousSelectedSideDish2 = null;
            this.previousSelectedSoup = null;
            this.previousSelectedLunch = null;
            this.previousSelectedBaby = null;
        },
        async randomSelect(dishType) {
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetShopList?Id=${this.menuId}`);
                const todayChoiceList = response.data.myChoice;
                var thisWeeksMenu = [];
                todayChoiceList.forEach((item, index) => {
                    item.dish.forEach((dish, index) => {
                        thisWeeksMenu.push(dish);
                    });
                });
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
  
            var selectPool = [];
            if (dishType === 'main') {
                this.menuDataMain.forEach((dish, index) => {
                    if (!thisWeeksMenu.includes(dish)) {
                        selectPool.push(dish);
                    }
                });
                var randomIndex = await this.getRandomInt(0, selectPool.length-1);
                this.selectedMainDish = selectPool[randomIndex];
                this.handleUpdateDropList(this.selectedMainDish,'main');
            }
            if (dishType === 'side1') {
                this.menuDataSide.forEach((dish, index) => {
                    if (!thisWeeksMenu.includes(dish)) {
                        selectPool.push(dish);
                    }
                });
                var randomIndex = await this.getRandomInt(0, selectPool.length-1);
                this.selectedSideDish1 = selectPool[randomIndex];
                this.handleUpdateDropList(this.selectedSideDish1, 'side1');
            }
            if (dishType === 'side2') {
                this.menuDataSide.forEach((dish, index) => {
                    if (!thisWeeksMenu.includes(dish)) {
                        selectPool.push(dish);
                    }
                });
                var randomIndex = await this.getRandomInt(0, selectPool.length-1);
                this.selectedSideDish2 = selectPool[randomIndex];
                this.handleUpdateDropList(this.selectedSideDish2, 'side2');
            }
            if (dishType === 'soup') {
                this.menuDataSoup.forEach((dish, index) => {
                    if (!thisWeeksMenu.includes(dish)) {
                        selectPool.push(dish);
                    }
                });
                var randomIndex = await this.getRandomInt(0, selectPool.length-1);
                this.selectedSoup = selectPool[randomIndex];
                this.handleUpdateDropList(this.selectedSoup, 'soup');
            }
        },
        async getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    },
    
};
