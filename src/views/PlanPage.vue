<template>
    <div class="plan-page">
        <div class="header">
            <h1>规划页</h1>
            <div class="dropdown-container">
                <select v-model="menuId" class="menu-dropdown" @change="setMenuId(menuId)">
                    <option value="" disabled>Select Menu</option>
                    <option v-for="(Id, index) in MenuIdList" :key="index" :value="Id">
                        {{ Id }}
                    </option>
                </select>
            </div>
        </div>

        <h2>{{ dayOfWeek[currentDayIndex] }}</h2>  <!-- Displaying the current day -->
        <!-- Error Message -->
        <div v-if="errorMessage" class="error-message">
            <p>{{ errorMessage }}</p>
        </div>

        <!-- Main Dish -->
        <div class="content">
            <h2>主菜</h2>
            <div class="dropdown-container">
                <select v-model="selectedMainDish" class="menu-dropdown" @change="fetchIngredients(selectedMainDish, 'main')">
                    <option value="" disabled selected>Select a dish</option>
                    <option v-for="(menu, index) in menuDataMain" :key="index" :value="menu">
                        {{ menu }}
                    </option>
                </select>
            </div>

            <div v-if="mainDishIngredients.length" class="table-container">
                <table class="ingredients-table">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>数量</th>
                            <th>单位</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ingredient, index) in mainDishIngredients" :key="index">
                            <td>{{ ingredient.name }}</td>
                            <td>{{ ingredient.amount }}</td>
                            <td>{{ ingredient.unit }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Side Dish 1 -->
        <div class="content">
            <h2>配菜 1</h2>
            <div class="dropdown-container">
                <select v-model="selectedSideDish1" class="menu-dropdown" @change="fetchIngredients(selectedSideDish1, 'side1')">
                    <option value="" disabled selected>Select a dish</option>
                    <option v-for="(menu, index) in menuDataSide" :key="index" :value="menu">
                        {{ menu }}
                    </option>
                </select>
            </div>

            <div v-if="sideDish1Ingredients.length" class="table-container">
                <table class="ingredients-table">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>数量</th>
                            <th>单位</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ingredient, index) in sideDish1Ingredients" :key="index">
                            <td>{{ ingredient.name }}</td>
                            <td>{{ ingredient.amount }}</td>
                            <td>{{ ingredient.unit }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Side Dish 2 -->
        <div class="content">
            <h2>配菜 2</h2>
            <div class="dropdown-container">
                <select v-model="selectedSideDish2" class="menu-dropdown" @change="fetchIngredients(selectedSideDish2, 'side2')">
                    <option value="" disabled selected>Select a dish</option>
                    <option v-for="(menu, index) in menuDataSide" :key="index" :value="menu">
                        {{ menu }}
                    </option>
                </select>
            </div>

            <div v-if="sideDish2Ingredients.length" class="table-container">
                <table class="ingredients-table">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>数量</th>
                            <th>单位</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ingredient, index) in sideDish2Ingredients" :key="index">
                            <td>{{ ingredient.name }}</td>
                            <td>{{ ingredient.amount }}</td>
                            <td>{{ ingredient.unit }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Soup -->
        <div class="content">
            <h2>汤</h2>
            <div class="dropdown-container">
                <select v-model="selectedSoup" class="menu-dropdown" @change="fetchIngredients(selectedSoup, 'soup')">
                    <option value="" disabled selected>Select a dish</option>
                    <option v-for="(menu, index) in menuDataSoup" :key="index" :value="menu">
                        {{ menu }}
                    </option>
                </select>
            </div>

            <div v-if="soupIngredients.length" class="table-container">
                <table class="ingredients-table">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>数量</th>
                            <th>单位</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ingredient, index) in soupIngredients" :key="index">
                            <td>{{ ingredient.name }}</td>
                            <td>{{ ingredient.amount }}</td>
                            <td>{{ ingredient.unit }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="next-button-container">
            <button class="next-button" @click="clickNextButton">Next</button>
        </div>

    </div>
</template>

<script src="./PlanPage.js"></script> <!-- Link to the JS file -->
