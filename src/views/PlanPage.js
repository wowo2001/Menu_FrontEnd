import './PlanPage.css';
import axios from 'axios';
import { useRouter } from 'vue-router'; // To navigate programmatically

const apiHost = "http://13.54.181.1:80";
export default {
    name: "PlanPage",
    data() {
        return {
            MenuIdList: null,
            menuId: null,
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // Days of the week
            currentDayIndex :0,
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
                console.log(response.data); // Logs the API response
                const todayChoiceList = response.data.myChoice;
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
        },

        async fetchIngredientList(menuId) {
            await this.delay(500);

            try {
                const response = await axios.get(`${apiHost}/ShopList/AggregateList?Id=${menuId}`);
                console.log(response.data); // Logs the API response

            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
        },

        async fetchAllPurchaseList() {
            try {
            const response = await axios.get(`${apiHost}/ShopList/GetAllPurchaseList`);
            console.log(response.data); // Logs the API response
                // Assuming the response contains the allIngredientList
            this.MenuIdList = response.data;
            console.log(this.MenuIdList);
        } catch(error) {
            console.error("Error fetching ingredient list:", error);
        }
        },
        async setMenuId(menuId) {
            this.menuId = menuId;
            this.fetchTodayChoice(this.menuId);
        },
        async formattedDate() {
            const today = new Date();
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            this.menuId = today.toLocaleDateString('en-US', options);
            return this.menuId // Format as MM/DD/YYYY
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async updateShopList() {
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
            axios.post(`${apiHost}/ShopList/UpdateShopList`, requestBody)
                .then(response => {
                    console.log("Successfully updated the shop list:", response.data);
                })
                .catch(error => {
                    console.error('Error updating the shop list:', error);
                    // Handle error (e.g., show an error message to the user)
                });
            console.log(requestBody);
        },
        async handleUpdateDropList(menuName, dishType) {
            this.fetchIngredients(menuName, dishType);
            this.updateShopList();
        },

        clickNextButton() {
            console.log(this.currentDayIndex);
            if (this.currentDayIndex < 4) {
                this.fetchTodayChoice(this.menuId);
                this.currentDayIndex++;
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
            }
            else {
                this.fetchIngredientList(this.menuId);
                this.$router.push({ path:'/review', query: { menuId: this.menuId } });
            }
           
        },
        clickPreviousButton() {
            this.fetchTodayChoice(this.menuId);
            this.currentDayIndex--;
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
        }

    },
    
};
