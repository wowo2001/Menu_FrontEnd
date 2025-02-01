import './MiscellaneousPage.css';
import axios from 'axios';
import config from '.././config';

const apiHost = config.menu_backend_url;
const headers = {
    'token': localStorage.getItem('authToken'),  // Example: Adding an Authorization header
};
export default {
    name: "MiscellaneousPage",
    data() {
        return {
            // Initial rows with 5 empty rows
            rows: [
            ],
            menuId: null,
            isLoading: false,
        };
    },
    async mounted() {
        await this.getMenuId();
        this.rows = await this.getUpdatePurchaseList(this.menuId);
    },
    methods: {
        // Method to add a new row
        addRow() {
            this.rows.push({ name: '', amount: 0.0, unit: '', purchased: false, location: '', source: 'extra' });
        },
        removeRow(index) {
            this.rows.splice(index, 1);
        },
        async  submit() {
            var ingredientList = await this.fetchIngredientList(this.menuId);
            var validateRows = await this.validateRows();
            if (validateRows ==false) {
                alert("新增购买列表名称必须不为空!")
            }
            else {
                ingredientList.allIngredientList.push(...this.rows);
                ingredientList = JSON.parse(JSON.stringify(ingredientList));
                console.log(ingredientList);
                this.postUpdatePurchaseList(ingredientList);
                this.isLoading = true;
                await this.delay(500);
                this.isLoading = false;
                this.$router.push({ path:'/review', query: { menuId: this.menuId } });
            }
        },
        formattedDate() {
            const today = new Date();
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            this.menuId = today.toLocaleDateString('en-US', options);
            return this.menuId // Format as MM/DD/YYYY
        },
        getMenuId() {
            if (this.$route.query.menuId != null) {
                this.menuId = this.$route.query.menuId;
            }
            else {
                this.formattedDate(); 
            }
            console.log(this.menuId);

        },
        async fetchIngredientList(menuId) {
            try {
                const response = await axios.get(`${apiHost}/ShopList/AggregateList?Id=${menuId}`, {
                    headers: headers
                });
                return response.data;
                

            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }

        },
        async getUpdatePurchaseList(menuId) {
            try {
                const response = await axios.get(`${apiHost}/ShopList/GetPurchaseList?Id=${menuId}`, {
                    headers: headers
                });
                console.log(response.data.allIngredientList);
                var extra = response.data.allIngredientList.filter(ingredient => ingredient.source === 'extra');
                console.log(extra);
                return extra;

            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }

        },
        async fetchIngredientUnit(ingredientName) {
            var validateIndex = null;
            this.rows.forEach((ingredient, index) => {
                if (ingredient.name == ingredientName) {
                    validateIndex = index;
                }
            });
            console.log(validateIndex);
            if (validateIndex != null) {
                try {
                    const response = await axios.get(`${apiHost}/menu/GetIngredientUnit?ingredientName=${this.rows[validateIndex].name}`, {
                        headers: headers
                    });
                    this.rows[validateIndex].unit = response.data;
                } catch (error) {
                    console.error("Error fetching ingredient list:", error);
                }
            }
        },
        async validateUnit(ingredientName) {
            this.fetchIngredientUnit(ingredientName);
        },


        async postUpdatePurchaseList(request) {
            console.log(request);
            try {
                const response = await axios.post(`${apiHost}/ShopList/UpdatePurchaseList`, request, {
                    headers: headers
                });
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error("Error update purchase list:", error);
            }
        },
        async validateRows() {
            let emptyName = true;
            this.rows.forEach(row => {
                if (row.name == '') {
                    emptyName = false;
                }
            });
            return emptyName;
        },
        async delay(ms) {
           return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
};