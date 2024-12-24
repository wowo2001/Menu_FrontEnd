import './MenuPage.css';
import axios from 'axios';

const apiHost = "http://13.54.181.1:80";
export default {
    name: "MenuPage",
    data() {
        return {
            // Initial rows with 5 empty rows
            rows: [
            ],
            MenuList: null,
            MenuName: null,
            MenuType: this.MenuType,
            newMenuName: null
        };
    },
    mounted() {
        this.fetchMenuList();
    },
    methods: {
        // Method to add a new row
        addRow() {
            this.rows.push({ name: '', amount: 0.0, unit: ''});
        },
        removeRow(index) {
            this.rows.splice(index, 1);
        },
        async setMenuList() {
            this.fetchMenuList();
            this.MenuName = null;
            this.rows = [];
        },
        
        async fetchMenuList() {
            try {
                const response = await axios.get(`${apiHost}/menu/getMenu?category=${this.MenuType}`);
                this.MenuList = response.data.name;
                console.log(this.MenuList);
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
            
        },

        async fetchIngredient() {
            try {
                
                const response = await axios.get(`${apiHost}/menu/getIngredient?name=${this.MenuName}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
            }
        },

        async setMenuName(menuName) {
            this.MenuName = menuName;
            console.log(this.MenuName);
            if (this.MenuName == "newMenu") {
                this.rows = [];
                this.rows.push({ name: '', amount: 0.0, unit: '' });
            }
            else {
                this.rows = [];
                var ingredientList = await this.fetchIngredient();
                ingredientList.forEach((ingredient, index) => {
                    this.rows.push({ name: ingredient.name, amount: ingredient.amount, unit: ingredient.unit });
                });
            }
            

        },

        async updateMenu() {
            if (this.MenuName == "newMenu") {
                this.MenuName = this.newMenuName;
                if (this.newMenuName == null) {
                    alert("新增菜单必须有名称！")
                    return;
                }
            }
            
            const requestBody = {
                Name: this.MenuName, 
                Ingredient: [
                ],
                Category: this.MenuType
            };
            this.rows.forEach((ingredient, ingex) => {
                requestBody.Ingredient.push({ name: ingredient.name, amount: ingredient.amount, unit: ingredient.unit})
            });
            console.log(requestBody);
            try {
                const response = await axios.post(`${apiHost}/menu/EditMenu`, requestBody);
                if (response.status === 200) {
                    await this.fetchMenuList();
                    await this.setMenuName(this.MenuName);
                    this.newMenuName = null;
                    alert("菜单已更新");
                }
            }
            catch (error) {
                // Handle error (e.g., show an error message to the user)
                console.log('Error updating the menu:', error);
            }
            

        },

        async deleteMenuPost() {
            const requestBody = {
                "Name": this.MenuName
            };
            try {
                const response = await axios.post(`${apiHost}/menu/DeleteMenu`, requestBody);
                if (response.status === 200) {
                    await this.fetchMenuList();
                    alert("菜单已删除");
                }
            }
            catch (error) {
                // Handle error (e.g., show an error message to the user)
                console.log('Error deleting the menu:', error);
            }

        },
        async submit() {
            await this.updateMenu();
            await this.fetchIngredient();
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
        async deleteMenu() {
            var userResponse = confirm("是否删除菜单？");
            if (userResponse) {
                this.deleteMenuPost();
                this.rows = [];
                this.MenuName = null;
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
                    const response = await axios.get(`${apiHost}/menu/GetIngredientUnit?ingredientName=${this.rows[validateIndex].name}`);
                    this.rows[validateIndex].unit = response.data;
                } catch (error) {
                    console.error("Error fetching ingredient list:", error);
                }
            }
        },
        async validateUnit(ingredientName) {
            this.fetchIngredientUnit(ingredientName);
        }
    }
};