import './ReviewPage.css';
import axios from 'axios';

const apiHost = "http://13.54.181.1:80";
export default {
    data() {
        return {
            MenuIdList: null,
            menuId: null,
            allIngredientList: [], // Will store the list of ingredients
            sortBy: '', // Column to sort by
            sortOrder: 'asc', // Sorting order (ascending or descending)
            isLoading: false,
            filterList: [],
            filterName: null,
            sortedIngredientList: [],
            firstOpen: true,
        };
    },
    methods: {
        // Fetch ingredients list from the API
        async fetchIngredientList(menuId) {
            this.isLoading = true;
            await this.delay(1000);
            try {
                var response = await axios.get(`${apiHost}/ShopList/GetPurchaseList?Id=${menuId}`);
                this.allIngredientList = response.data.allIngredientList.map(ingredient => ({
                    ...ingredient,
                    purchased: ingredient.purchased, // Retain the purchased status from the API
                }));
                this.sortedIngredientList = this.allIngredientList;
                this.sortTable(this.sortBy);
                this.isLoading = false;
                
                
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
                this.isLoading = false;
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
                const response = await axios.post(`${apiHost}/ShopList/UpdatePurchaseList`, payload);
                console.log('Update response:', response.data); // Log the response
            } catch (error) {
                console.error("Error updating purchase status:", error);
            }
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async fetchAllPurchaseList() {
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetAllPurchaseList`);
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
                this.firstOpen = false;
            }
            else {
                this.filterName = null;
            }
            this.$router.push({ path: '/review', query: { menuId: this.menuId } });

        },
        sortTable(column) {
            if (this.sortBy === column) {
                // Toggle the sorting order
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                // Set the sorting column and default to ascending order
                this.sortBy = column;
                this.sortOrder = 'asc';
            }

            // Sort the list based on the selected column
            this.allIngredientList.sort((a, b) => {
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
                const response = await axios.post(`${apiHost}/ShopList/DeleteShopList`, payload);
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
            this.$router.push({ path: '/review', query: { menuId: this.menuId, filter: encodeURIComponent(this.filterName) } });
        },
    },


    mounted() {
        this.fetchAllPurchaseList();
        this.menuId = this.$route.query.menuId;
        this.setMenuId(this.menuId);


    }


};