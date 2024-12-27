import './MiscellaneousPage.css';
import axios from 'axios';

const apiHost = "http://13.54.181.1:80";
export default {
    name: "MiscellaneousPage",
    data() {
        return {
            // Initial rows with 5 empty rows
            rows: [
            ],
            menuId: null,
        };
    },
    mounted() {
        this.getMenuId();
    },
    methods: {
        // Method to add a new row
        addRow() {
            this.rows.push({ name: '', amount: 0.0, unit: '', purchased: false, location:'' });
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
                const response = await axios.get(`${apiHost}/ShopList/AggregateList?Id=${menuId}`);
                return response.data;
                

            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }

        },

        async postUpdatePurchaseList(request) {
            console.log(request);
            try {
                const response = await axios.post(`${apiHost}/ShopList/UpdatePurchaseList`, request);
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
        }
    }
};