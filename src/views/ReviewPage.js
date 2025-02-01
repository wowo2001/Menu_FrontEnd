import './ReviewPage.css';
import axios from 'axios';
import config from '.././config';

const apiHost = config.menu_backend_url;
const headers = {
    'token': localStorage.getItem('authToken'),  // Example: Adding an Authorization header
};
export default {
    data() {
        return {
            MenuIdList: null,
            menuId: null,
            allIngredientList: [], // Will store the list of ingredients
            sortBy: 'purchased', // Column to sort by
            sortOrder: 'asc', // Sorting order (ascending or descending)
            filterList: [],
            filterName: null,
            sortedIngredientList: [],
            firstOpen: true,
        };
    },
    methods: {
        // Fetch ingredients list from the API
        async fetchIngredientList(menuId) {
            //await this.delay(1000);
            try {
                var response = await axios.get(`${apiHost}/ShopList/GetPurchaseList?Id=${menuId}`, {
                    headers: headers
                });
                this.allIngredientList = response.data.allIngredientList.map(ingredient => ({
                    ...ingredient,
                    purchased: ingredient.purchased, // Retain the purchased status from the API
                }));
                this.sortedIngredientList = this.allIngredientList;
                this.sortTable(this.sortBy);
                
                
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
        },

        // Toggle the purchased status of an ingredient
        async toggleStatus(ingredient) {
            ingredient.purchased = !ingredient.purchased; // Toggle the status

            // Prepare the payload to send to the server
            const payload = {
                id: this.menuId, // Use the current menuId as the ID
                allIngredientList: this.allIngredientList // Send the updated ingredient list
            };

            try {
                // Send a POST request with the updated list
                const response = await axios.post(`${apiHost}/ShopList/UpdatePurchaseList`, payload, {
                    headers: headers
                });
                console.log('Update response:', response.data); // Log the response
            } catch (error) {
                console.error("Error updating purchase status:", error);
            }
            this.sortTable('purchased','asc');
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async fetchAllPurchaseList() {
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetAllPurchaseList`, {
                    headers: headers
                });
                console.log(response.data); // Logs the API response
                // Assuming the response contains the allIngredientList
                this.MenuIdList = response.data;
                console.log(this.MenuIdList);
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
        },
        async setMenuId(menuId) {
            this.menuId = menuId;
            await this.fetchIngredientList(this.menuId);
            this.filterList = [];
            await this.allIngredientList.forEach((ingredient, index) => {
                if (!this.filterList.includes(ingredient.location)) {
                    this.filterList.push(ingredient.location);
                }
            });
            if (this.firstOpen) {
                this.filterName = decodeURIComponent(this.$route.query.filter);
                if (this.filterName === 'undefined') {
                    this.filterName = "All";
                }
                this.setFilter(this.filterName);
                this.firstOpen = false;
            }
            else {
                this.filterName = null;
            }
            this.$router.push({ path: '/review', query: { menuId: this.menuId } });

        },
        sortTable(column, order) {

            if (this.sortBy === column && order === undefined) {
                // Toggle the sorting order
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                // Set the sorting column and default to ascending order
                this.sortBy = column;
                this.sortOrder = order === undefined ? 'asc' : order;
            }

            // Sort the list based on the selected column
            this.sortedIngredientList.sort((a, b) => {
                const valueA = a[column];
                const valueB = b[column];
                if (this.sortOrder === 'asc') {
                    return valueA > valueB ? 1 : (valueA < valueB ? -1 : 0);
                } else {
                    return valueA < valueB ? 1 : (valueA > valueB ? -1 : 0);
                }
            });
 
        },
        async deletePurchaseList() {
            const payload = {
                Id: this.menuId // Use the current menuId as the ID
            };
            console.log(payload);
            try {
                const response = await axios.post(`${apiHost}/ShopList/DeleteShopList`, payload, {
                    headers: headers
                });
                console.log(response.data); // Logs the API response
                location.reload();
            } catch (error) {
                console.error("Error delete purchase list:", error);
            }
        },
        async setFilter(filter) {
            this.filterName = filter;
            this.sortedIngredientList = [];
            this.allIngredientList.forEach((ingredient, index) => {
                if (ingredient.location === this.filterName) {
                    this.sortedIngredientList.push(ingredient);
                }
            });
            if (this.filterName === "All") {
                this.sortedIngredientList = this.allIngredientList;
            }
            this.$router.push({ path: '/review', query: { menuId: this.menuId, filter: encodeURIComponent(this.filterName) } });
        },
    },


    mounted() {
        this.fetchAllPurchaseList();
        this.menuId = this.$route.query.menuId;
        this.setMenuId(this.menuId);


    }


};