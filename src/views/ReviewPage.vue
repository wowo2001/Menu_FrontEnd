<template>
    <div>
        <div>
            <!-- Displaying the menuId (current date) -->
            <el-button-group style="display: flex">
                <el-button :color="Id === menuId ? '#ffd633' : '#9f6955'"
                           v-for="(Id, index) in MenuIdList"
                           :key="index"
                           @click="setMenuId(Id)">{{ Id }}</el-button>
            </el-button-group>
        </div>
        <div>
            <el-button-group style="margin-top: 1rem; margin-bottom: 1rem; display: flex ">
                <el-button :color="filterName === filter ? '#ffd633' : '#9f6955'"
                           v-for="(filter, index) in filterList"
                           :key="index"
                           @click="setFilter(filter)">{{ filter }}</el-button>
            </el-button-group>
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
                    <tr v-for="ingredient in sortedIngredientList">
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

