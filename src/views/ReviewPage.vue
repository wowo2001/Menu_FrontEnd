<template>
    <div>
        <h2>采购清单</h2>
        <!-- Displaying the menuId (current date) -->
        <p>Menu ID: {{ formattedDate }}</p>

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
                                :class="{'btn-on': ingredient.isOn, 'btn-off': !ingredient.isOn}">
                            {{ ingredient.isOn ? 'On' : 'Off' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Loading message if data is not loaded yet -->
        <p v-else>Loading ingredients...</p>
    </div>
</template>

<script>
    // Importing Axios for HTTP requests
    import axios from 'axios';

    const apiHost = "http://localhost:5270"; // Your backend API

    export default {
        data() {
            return {
                menuId: null,
                allIngredientList: [], // Will store the list of ingredients
            };
        },
        computed: {
            formattedDate() {
                const today = new Date();
                const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                this.menuId = today.toLocaleDateString('en-US', options);
                console.log(this.menuId); // Logs the menu ID (current date)
                return this.menuId; // Format as MM/DD/YYYY
            }
        },
        watch: {
            // Watch for changes in the menuId and make the API call
            menuId(newMenuId) {
                if (newMenuId) {
                    this.fetchIngredientList(newMenuId);
                }
            }
        },
        methods: {
            // Fetch ingredients list from the API
            async fetchIngredientList(menuId) {
                try {
                    const response = await axios.get(`${apiHost}/ShopList/AggregateList?Id=${menuId}`);
                    console.log(response.data); // Logs the API response
                    // Assuming the response contains the allIngredientList
                    this.allIngredientList = response.data.allIngredientList.map(ingredient => ({
                        ...ingredient,
                        isOn: false // Set default toggle state to off (false)
                    }));
                } catch (error) {
                    console.error("Error fetching ingredient list:", error);
                }
            },
            // Toggle the state of the ingredient
            toggleStatus(ingredient) {
                ingredient.isOn = !ingredient.isOn; // Toggle the state (on/off)
            }
        },
        mounted() {
            // Call the API when the component is mounted
            if (this.menuId) {
                this.fetchIngredientList(this.menuId);
            }
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
