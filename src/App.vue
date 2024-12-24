<template>
    <div id="app">
        <div class="tabs-container">
            <!-- Buttons acting as tabs -->
            <button @click="goToPage('/plan')" class="tab-button">规划</button>
            <button @click="goToPage('/review')" class="tab-button">采购清单</button>
            <button @click="goToPage('/menu')" class="tab-button">修改菜单</button>
        </div>
        <!-- Router view to display the page content for the current route -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        methods: {
            handleClick(buttonName) {
                alert(`You clicked ${buttonName}`);
            },
            goToPage(route) {
                console.log(`Navigating to: ${route}`); // Add logging here
                this.$router.push(route).catch((err) => {
                    console.error("Error navigating:", err); // Log if there's an error in the navigation
                });
            },
        },
    };
</script>

<style scoped>
    #app {
        display: flex;
        flex-direction: column;
        height: 100vh; /* Full screen height */
    }

    .tabs-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 60px; /* Height for the tabs section */
        background-color: #333; /* Dark background for tabs */
    }

    .tab-button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        background-color: transparent; /* Transparent background */
        color: white;
        border-right: 1px solid #fff; /* Add a border between the buttons */
        text-align: center;
        flex: 1; /* Spread the buttons evenly */
    }

        .tab-button:last-child {
            border-right: none; /* Remove border on the last button */
        }

        .tab-button:hover {
            background-color: #444; /* Darker background on hover */
        }

        .tab-button:focus {
            outline: none; /* Remove focus outline */
        }

    /* Add some space for the content below the tabs */
    router-view {
        flex: 1;
        padding: 20px;
    }
</style>
