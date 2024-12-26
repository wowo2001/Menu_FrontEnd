import './IngredientManagementPage.css';
import axios from 'axios';

const apiHost = "http://13.54.181.1:80";
export default {
    name: "IngredientManagementPage",
    data() {
        return {
            // Initial rows with 5 empty rows
            rows: [
            ],
            backend_data: null,
            isLoading: true,
            
        };
    },
    mounted() {
        this.updateNameLocationList();
    },
    methods: {
       
        async fetchNameLocationList() {
            try {
                this.isLoading = true;
                const response = await axios.get(`${apiHost}/Location/GetAllIngredientLocationList`);
                this.backend_data = response.data;
                this.isLoading = false;
                return response.data;
            } catch (error) {
                console.error("Error fetching ingredient list:", error);
                this.isLoading = false;
            }
        },
        async updateNameLocationList() {
            var nameLocationList = await this.fetchNameLocationList();
            nameLocationList.forEach((nameLocation, index) => {
                this.rows.push({ 'name': nameLocation.name, 'location': nameLocation.location })
            });
            
        },
        async updateLocation(index,rowLocation) {
            this.rows[index].location = rowLocation;
            console.log(this.rows[index].name);
            console.log(this.rows[index].location);
        },
        async editNameLocationList() {
            var difference = [];
            this.backend_data.forEach((backend_nameLocation, index) => {
                this.rows.forEach((row_nameLocation, index) => {
                    if (backend_nameLocation.name === row_nameLocation.name && backend_nameLocation.location !== row_nameLocation.location) {
                        difference.push(row_nameLocation);
                    }
                });
            });
            console.log(difference);
            try {
                const response = await axios.post(`${apiHost}/Location/EditLocation`, difference);
                if (response.status === 200) {
                    alert("原料已更新");
                }
            }
            catch (error) {
                // Handle error (e.g., show an error message to the user)
                console.log('Error updating the menu:', error);
            }
        },
    }
};