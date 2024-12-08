<template>
    <div>
        <h2>采购清单</h2>
        <!-- Displaying the menuId (current date) -->
        <div class="dropdown-container">
            <select v-model="menuId" class="menu-dropdown" @change="setMenuId(menuId)">
                <option value="" disabled>Select Menu</option>
                <option v-for="(Id, index) in MenuIdList" :key="index" :value="Id">
                    {{ Id }}
                </option>
            </select>
        </div>

        <!-- Check if the data is loaded before showing the table -->
        <table v-if="allIngredientList.length" border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Unit</th>
                    <th>Toggle</th> <!-- New Toggle Column -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="ingredient in allIngredientList" :key="ingredient.name">
                    <td>{{ ingredient.name }}</td>
                    <td>{{ ingredient.amount }}</td>
                    <td>{{ ingredient.unit }}</td>
                    <td>
                        <!-- Toggle switch with color changes -->
                        <button @click="toggleStatus(ingredient)"
                                :class="{'btn-on': ingredient.purchased, 'btn-off': !ingredient.purchased}">
                            {{ ingredient.purchased ? 'Purchased' : 'Not yet' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';

    const apiHost = "http://13.54.181.1:80";
    export default {
        data() {
            return {
                MenuIdList: null,
                menuId: null,
                allIngredientList: [], // Will store the list of ingredients
            };
        },
        methods: {
            // Fetch ingredients list from the API
            async fetchIngredientList(menuId) {
                await this.delay(1000);
                try {
                    const response = await axios.get(`${apiHost}/ShopList/GetPurchaseList?Id=${menuId}`);
                    this.allIngredientList = response.data.allIngredientList.map(ingredient => ({
                        ...ingredient,
                        purchased: ingredient.purchased, // Retain the purchased status from the API
                    }));
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
                this.fetchIngredientList(this.menuId);
            }
        },


        mounted() {
            this.fetchAllPurchaseList();
            this.menuId = this.$route.query.menuId;
            this.fetchIngredientList(this.menuId);

        }
        

    };
</script>

<style scoped>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 8px;
        text-align: center;
    }

    th {
        background-color: #f2f2f2;
    }

    /* Toggle button styles */
    .btn-on {
        background-color: green;
        color: white;
        padding: 5px 10px;
        border: none;
        cursor: pointer;
    }

    .btn-off {
        background-color: red;
        color: white;
        padding: 5px 10px;
        border: none;
        cursor: pointer;
    }

        .btn-on:hover, .btn-off:hover {
            opacity: 0.8;
        }
</style>
