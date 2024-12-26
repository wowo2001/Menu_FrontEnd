<template>
    <div class="plan-page">
        <div class="header">
            <h1>菜单规划</h1>
            <div class="dropdown-container">
                <select v-model="menuId" class="menu-dropdown" @change="setMenuId(menuId)">
                    <option value="" disabled>Select Menu</option>
                    <option v-for="(Id, index) in MenuIdList" :key="index" :value="Id">
                        {{ Id }}
                    </option>
                </select>
            </div>
        </div>

        <h1>{{ dayOfWeek[currentDayIndex] }}</h1>  <!-- Displaying the current day -->
        <!-- Error Message -->
        <div v-if="errorMessage" class="error-message">
            <p>{{ errorMessage }}</p>
        </div>

        <div class="plan-section">
            <h2>主菜</h2>
            <!-- Main Dish -->
            <div class="content">
                <div class="dropdown-container">
                    <select v-model="selectedMainDish" class="menu-dropdown" @change="handleUpdateDropList(selectedMainDish, 'main')">
                        <option value="" disabled selected>选择一个主菜</option>
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
            <h2>配菜</h2>
            <div class="content">
                <div class="dropdown-container">
                    <select v-model="selectedSideDish1" class="menu-dropdown" @change="handleUpdateDropList(selectedSideDish1, 'side1')">
                        <option value="" disabled selected>选择一个配菜</option>
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
            <h2>配菜</h2>
            <div class="content">
                <div class="dropdown-container">
                    <select v-model="selectedSideDish2" class="menu-dropdown" @change="handleUpdateDropList(selectedSideDish2, 'side2')">
                        <option value="" disabled selected>选择一个配菜</option>
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
            <h2>汤</h2>
            <div class="content">
                <div class="dropdown-container">
                    <select v-model="selectedSoup" class="menu-dropdown" @change="handleUpdateDropList(selectedSoup, 'soup')">
                        <option value="" disabled selected>选择一个汤</option>
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

            <h2>午餐</h2>
            <div class="content">
                <div class="dropdown-container">
                    <select v-model="selectedLunch" class="menu-dropdown" @change="handleUpdateDropList(selectedLunch, 'lunch')">
                        <option value="" disabled selected>选择一个午餐</option>
                        <option v-for="(menu, index) in menuDataLunch" :key="index" :value="menu">
                            {{ menu }}
                        </option>
                    </select>
                </div>

                <div v-if="lunchIngredients.length" class="table-container">
                    <table class="ingredients-table">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>数量</th>
                                <th>单位</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ingredient, index) in lunchIngredients" :key="index">
                                <td>{{ ingredient.name }}</td>
                                <td>{{ ingredient.amount }}</td>
                                <td>{{ ingredient.unit }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!--<div class="content">
        <div class="dropdown-container">
            <select v-model="selectedBaby" class="menu-dropdown" @change="handleUpdateDropList(selectedLunch, 'baby')">
                <option value="" disabled selected>选择一个宝宝餐</option>
                <option v-for="(menu, index) in menuDataBaby" :key="index" :value="menu">
                    {{ menu }}
                </option>
            </select>
        </div>

        <div v-if="babyIngredients.length" class="table-container">
            <table class="ingredients-table">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>数量</th>
                        <th>单位</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ingredient, index) in babyIngredients" :key="index">
                        <td>{{ ingredient.name }}</td>
                        <td>{{ ingredient.amount }}</td>
                        <td>{{ ingredient.unit }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>-->

            <div class="next-button-container" v-if="currentDayIndex > 0">
                <button class="previous-button" @click="clickPreviousButton">上一页</button>
            </div>
            <div class="next-button-container">
                <button class="next-button" @click="clickNextButton">下一页</button>
            </div>
        </div>

    </div>
</template>

<script src="./PlanPage.js"></script> <!-- Link to the JS file -->
