<template>
    <div>
        <h1>采购清单</h1>
        <!-- Displaying the menuId (current date) -->
        <div class="button-container">
            <button v-for="(Id, index) in MenuIdList"
                    :key="index"
                    :class="['menu-id-button', {'selected': menuId === Id}]"
                    @click="setMenuId(Id)">
                {{ Id }}
            </button>
        </div>

        <div class="button-container">
            <button v-for="(filter, index) in filterList"
                    :key="index"
                    :class="['menu-id-button', {'selected': filterName === filter}]"
                    @click="setFilter(filter)">
                {{ filter }}
            </button>
        </div>

        <!-- Check if the data is loaded before showing the table -->
        <table v-if="sortedIngredientList.length" border="1">
            <thead>
                <tr>
                    <th @click="sortTable('name')">Name</th>
                    <th @click="sortTable('amount')">Amount</th>
                    <th @click="sortTable('unit')">Unit</th>
                    <th @click="sortTable('location')">Location</th>
                    <th>Toggle</th> <!-- New Toggle Column -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="ingredient in sortedIngredientList" :key="ingredient.name">
                    <td>{{ ingredient.name }}</td>
                    <td>{{ ingredient.amount }}</td>
                    <td>{{ ingredient.unit }}</td>
                    <td>{{ ingredient.location }}</td>
                    <td>
                        <!-- Toggle switch with color changes -->
                        <button @click="toggleStatus(ingredient)"
                                :class="{'btn-on': ingredient.purchased, 'btn-off': !ingredient.purchased}">
                            {{ ingredient.purchased ? '已购买' : '未购买' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="dlt">
            <button @click="deletePurchaseList" class="red-button" v-if="menuId !== null">删除菜单</button>
        </div>
    </div>
</template>

<script src="./ReviewPage.js"></script>

