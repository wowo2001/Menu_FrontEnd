import './PlanPage.css';
import axios from 'axios';
import config from '.././config';
import { useRouter } from 'vue-router'; // To navigate programmatically
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref, onMounted } from 'vue'




class Dish {
    constructor(type,name) {
        this.type = type;
        this.name = name;
        this.ingredient = [];
        this.typeInChinese = this.typeInChinese(type);
    }

    async updateIngredient() {
        try {
                if (this.name !== '') {
                    const response = await axios.get(`${apiHost}/menu/getIngredient?name=${this.name}`, {
                        headers: headers
                    });
                    this.ingredient=response.data;
                }
                else {
                    this.ingredient=[];
                }
                
        } catch (error) {
            console.error('Error fetching ingredient data:', error);
        }
    }
    typeInChinese(type) {
        const typeMap = {
            'Main': '主菜',
            'Side': '配菜',
            'Soup': '汤',
            'Lunch': '午餐'
        };

        return typeMap[type]
    }
 
}
class Day {
    constructor(periodOfDays) {
        this.indexOfDay = 0;
        this.periodOfDays = periodOfDays;
        this.dayListEnglish = this.dayListInEnglish(periodOfDays);
        this.dayListChinese = this.dayListInChinese(periodOfDays);
    }
 
    get dayEnglish() {
        return this.dayInEnglish(this.indexOfDay);
    }
    get dayChinese() {
        return this.dayInChinese(this.indexOfDay);
    }
    dayInChinese(index) {
        const dayMap = {
            '0': '周一',
            '1': '周二',
            '2': '周三',
            '3': '周四',
            '4': '周五',
            '5': '周六',
            '6': '周日'
        };
        return dayMap[index];
    }
    dayInEnglish(index) {
        const dayMap = {
            '0': 'Monday',
            '1': 'Tuesday',
            '2': 'Wednesday',
            '3': 'Thursday',
            '4': 'Friday',
            '5': 'Saturday',
            '6': 'Sunday'
        };
        return dayMap[index];
    }
    dayListInEnglish(length) {
        const dayListEnglish = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        return dayListEnglish.slice(0, length)
    }
    dayListInChinese(length) {
        const dayListChinese = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        return dayListChinese.slice(0, length)
    }
}


const apiHost = config.menu_backend_url;
const headers = {
    'token': localStorage.getItem('authToken'),  // Example: Adding an Authorization header
};
export default {
    name: "PlanPage",
    setup() {
        const myCarousel = ref(null);
        return {
            myCarousel,
        };
    },
    data() {
        return {
            MenuIdList: [],
            menuId: null,
            day: new Day(5), // Days of the week
            menuData: { 'Main': [], 'Side': [], 'Soup': [], 'Lunch': [] },
            selectedDishList: [],
            previousSelectedDishList: [],
            weeklyDishList: [],
            indexOfDay: 0,
            dialogVisible: false,
            dialogType: null,
            carouselConfig : {
                itemsToShow: 2.5,
                wrapAround: false,
                itemsToShow: 1,
                breakpointMode: 'carousel'
            },
            dialogTypeList: ['Main', 'Side', 'Soup', 'Lunch'],
        };
    },
    async mounted() {
        await this.formattedDate();
        await this.fetchAllPurchaseList();
        await this.fetchMenuData();
        await this.fetchTodayChoice(this.menuId);
        this.weeklyDishList = await this.weeklyDish();
    },
    components:
        { Carousel, Slide, Pagination, Navigation },

    methods: {
        hanldleButtonColor(menu) {
            var inSelectedDishList = false;
            this.selectedDishList.forEach((dish, index) => {
                if (dish.name === menu) {
                    inSelectedDishList = true;
                }
   
            });
            var inWeeklySelectedDishList = false;
            this.weeklyDishList.forEach((dish, index) => {
                if (dish === menu) {
                    inWeeklySelectedDishList = true;
                }

            });
            if (inSelectedDishList) {
                return "#4d79ff";
            }
            else if (inWeeklySelectedDishList)
            {
                return "#ffe6e6";
            }
            else {
                return "#e6f3ff";
            }
        },
       
        async stagingSelectedDishUpdate(dishType, selectedDish) {
            
            var inSelectedDishList = false;
            this.selectedDishList.forEach((dish, index) => {
                if (dish.name === selectedDish) {
                    inSelectedDishList = true;
                }

            });
            if (!inSelectedDishList) {
                var dish = new Dish(dishType, selectedDish);
                await dish.updateIngredient();
                this.selectedDishList.push(dish);
            }
            else {
                this.selectedDishList = this.selectedDishList.filter(dish => dish.name !== selectedDish);
            }
            this.sortDish();
            this.updateShopList(selectedDish);
            this.hanldleButtonColor(selectedDish);
            
                

        },

        openDialog(Menu) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            this.dialogVisible = true;
            const dishTypeOrder = {
                'Main': 0,
                'Side': 1,
                'Soup': 2,
                'Lunch': 3
            };
            this.myCarousel.slideTo(dishTypeOrder[Menu]);
            //this.dialogType = Menu;
        },

        // Close the dialog
        closeDialog() {
            document.body.style.position = '';
            document.body.style.width = '';
            this.dialogVisible = false;
        },
        
        addMoreDish(type)
        {
            this.selectedDishList.push(new Dish(type, ''));
            this.sortDish();
        },
        sortDish() {
            var main = 0;
            var side = 0;
            var soup = 0;
            var lunch = 0;
            var targetMain = 1;
            var targetside = 2;
            var targetsoup = 1;
            var targetlunch = 1;
            this.selectedDishList.forEach((dish, index) => {
                if (dish.type === 'Main') {
                    main++;
                }
                if (dish.type === 'Side') {
                    side++;
                }
                if (dish.type === 'Soup') {
                    soup++;
                }
                if (dish.type === 'Lunch') {
                    lunch++;
                }
            });
            //if (main < targetMain) {
            //    for (let i = 0; i < targetMain - main; i++) {
            //        this.selectedDishList.push(new Dish('Main', ''));
            //    }
            //}
            //if (side < targetside) {
            //    for (let i = 0; i < targetside - side; i++) {
            //        this.selectedDishList.push(new Dish('Side', ''));
            //    }
            //}
            //if (soup < targetsoup) {
            //    for (let i = 0; i < targetsoup - soup; i++) {
            //        this.selectedDishList.push(new Dish('Soup', ''));
            //    }
            //}
            //if (lunch < targetlunch) {
            //    for (let i = 0; i < targetlunch - lunch; i++) {
            //        this.selectedDishList.push(new Dish('Lunch', ''));
            //    }
            //}

            const dishTypeOrder = {
                'Main': 0,
                'Side': 1,
                'Soup': 2,
                'Lunch': 3
            };

            this.selectedDishList.sort((a, b) => {
                return dishTypeOrder[a.type] - dishTypeOrder[b.type];
            });
        },
        // Fetch menu data from API
        async fetchMenuData() {
            try {
                const responseMain = await axios.get(`${apiHost}/menu/getMenu?category=Main`, {
                    headers: headers
                });
                this.menuData['Main'] = responseMain.data.name;

                const responseSide = await axios.get(`${apiHost}/menu/getMenu?category=Side`, {
                    headers: headers
                });
                this.menuData['Side'] = responseSide.data.name;

                const responseSoup = await axios.get(`${apiHost}/menu/getMenu?category=Soup`, {
                    headers: headers
                });
                this.menuData['Soup'] = responseSoup.data.name;

                const responseLunch = await axios.get(`${apiHost}/menu/getMenu?category=Lunch`, {
                    headers: headers
                });
                this.menuData['Lunch'] = responseLunch.data.name;

            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        },
        // Fetch ingredients for the selected dish
        async fetchIngredients(menuName) {
            try {
                const response = await axios.get(`${apiHost}/menu/getIngredient?name=${menuName}`, {
                    headers: headers
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        },
        async fetchTodayChoice(menuId) {
            this.selectedDishList = [];
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetShopList?Id=${menuId}`, {
                    headers: headers
                });
                
                const todayChoiceList = response.data.myChoice;
                //this.clearCache();
                    // Assuming the response contains the allIngredientList
                for (const item of todayChoiceList) {
                    if (this.day.dayEnglish === item.day) {

                        for (const dish of item.dish) {
                            let type = null; // Initialize type to null

                            // Check categories and assign the type accordingly
                            if (this.menuData['Main'].includes(dish)) {
                                type = 'Main';
                            }
                            if (this.menuData['Side'].includes(dish)) {
                                type = 'Side';
                            }
                            if (this.menuData['Soup'].includes(dish)) {
                                type = 'Soup';
                            }
                            if (this.menuData['Lunch'].includes(dish)) {
                                type = 'Lunch';
                            }

                            if (type) {
                                var newDish = new Dish(type, dish);
                                await newDish.updateIngredient(); // Await the asynchronous updateIngredient
                                this.selectedDishList.push(newDish);
                            }
                        }
                    }
                }
  

            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
            //this.sortDish();
            
            this.cacheDropdownListOptions();
        },

        

        async fetchAllPurchaseList() {
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetAllPurchaseList`, {
                    headers: headers
                });
                // Assuming the response contains the allIngredientList
                for (let index = 0; index < response.data.length; index++) {
                    const menuId = response.data[index];
                    if (!this.MenuIdList.includes(menuId)) {
                        this.MenuIdList.push(menuId);
                    }
                    if (this.MenuIdList.length >= 4) {
                        break;  // Exit the loop once we have 4 items in the list
                    }
                }
                
        } catch(error) {
            console.error("Error fetching ingredient list:", error);
            }
            
        },
        async setMenuId(menuId) {
            this.menuId = menuId;
            this.fetchTodayChoice(this.menuId);
            this.day.indexOfDay = 0;
            this.indexOfDay = 0;
            this.weeklyDishList = await this.weeklyDish();
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
        async updateShopList(dishName) {
            //var existingInThisWeeksMenu = await this.isDishExistingInThisWeeksMenu(dishName);
            
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetPurchaseList`, {
                    params: {
                        Id: this.menuId
                    },
                    headers: headers
                });
                var notExistingPurchaseList = response.data.id == null;
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
            var dishList = [];
            this.selectedDishList.forEach((dishName, index) => {
                if (dishName !== '') {
                    dishList.push(dishName.name);
                }
            })
            const requestBody = {
                Id: this.menuId,  // Using the formatted menu ID (e.g., "12/2/2024")
                MyChoice: [
                    {
                        Day: this.day.dayEnglish,  // Get the current day of the week
                        Dish: dishList.filter(Boolean) // Remove any null/undefined values from the list
                    }
                ]
            };
            console.log(requestBody);
 

            if (notExistingPurchaseList == true) {
                await axios.post(`${apiHost}/ShopList/UpdateShopList`, requestBody, {
                    headers: headers
                })
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
                if (userResponse) {
                    axios.post(`${apiHost}/ShopList/UpdateShopList`, requestBody, {
                        headers: headers
                    })
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
                    this.selectedDishList = this.previousSelectedDishList;
                    await this.fetchTodayChoice(this.menuId);
                }
            }
            this.weeklyDishList = await this.weeklyDish();
        },
        async handleUpdateDropList(dishListIndex, selectedName) {
            this.selectedDishList[dishListIndex].name = selectedName;
            this.selectedDishList[dishListIndex].ingredient = await this.fetchIngredients(selectedName);
            this.updateShopList(selectedName);
           
        },
        cacheDropdownListOptions() {

            this.previousSelectedDishList = this.selectedDishList;

        },

        async weeklyDish() {
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetShopList?Id=${this.menuId}`, {
                    headers: headers
                });
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
            return thisWeeksMenu;
        },
        clickNextButton() {
            if (this.day.indexOfDay < this.day.periodOfDays - 1) {
                this.setDay(this.day.indexOfDay+1);
            }
            else {
                //this.fetchIngredientList(this.menuId);
                this.$router.push({ path:'/miscellaneous', query: { menuId: this.menuId } });
            }
           
        },
        clickPreviousButton() {
            this.setDay(this.day.indexOfDay - 1);
        },
        setDay(index) {
            this.day.indexOfDay = index;
            this.day.dayInEnglish();
            this.day.dayInChinese();
            this.fetchTodayChoice(this.menuId);
            this.clearCache();
            this.indexOfDay = this.day.indexOfDay;
            this.myCarousel.slideTo(0);
        },
        clearCache() {
            this.selectedDishList = [];
            this.previousSelectedDishList = [];
        },
        async randomSelect(dishType, dishListIndex) {
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetShopList?Id=${this.menuId}`, {
                    headers: headers
                });
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
                this.menuData[dishType].forEach((dish, index) => {
                    if (!thisWeeksMenu.includes(dish)) {
                        selectPool.push(dish);
                    }
                });
                var randomIndex = await this.getRandomInt(0, selectPool.length-1);

                this.handleUpdateDropList(dishListIndex,selectPool[randomIndex]);

            
        },
        async getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    },
    
};
