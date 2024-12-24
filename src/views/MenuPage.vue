<template>
    <div class="header">
        <h1>修改菜单</h1>
    </div>

    <div class="dropdown-container">
        <select v-model="MenuType" class="menu-dropdown" @change="setMenuList()">
            <option value="Main">主菜</option>
            <option value="Side">配菜</option>
            <option value="Soup">汤</option>
            <option value="Lunch">午餐</option>
        </select>
    </div>

    <div class="dropdown-container">
        <select v-model="MenuName" class="menu-dropdown" @change="setMenuName(MenuName)">
            <option value="newMenu">新增菜单</option>
            <option v-for="(MenuName, index) in MenuList" :key="index" :value="MenuName">
                {{ MenuName }}
            </option>
        </select>
        <button @click="deleteMenu" class="menu-button">删除菜单</button>
    </div>

    <div class="container">
        <div class="col-12 col-md-4" v-if="MenuName === 'newMenu'">
            <input type="text" v-model="newMenuName" class="form-control custom-input" placeholder="菜单名称" />
        </div>
        <!-- Dynamically generated rows for inputs -->
        <div v-for="(row, index) in rows" :key="index" class="row">
            <div class="col-12 col-md-4">
                <input type="text" v-model="row.name" class="form-control custom-input" placeholder="原料名称" @change="validateUnit(row.name)" />
            </div>
            <div class="col-12 col-md-4">
                <input type="number" v-model="row.amount" class="form-control custom-input" placeholder="数量" />
            </div>
            <div class="col-12 col-md-4">
                <input type="text" v-model="row.unit" class="form-control custom-input" placeholder="单位" />
            </div>
            <div class="col-12 col-md-4">
                <button @click="removeRow(index)" class="btn red-button mt-3">X</button>
            </div>
         </div>

            <!-- Buttons -->
            <div class="container">
                <button @click="addRow" class="btn btn-primary mt-3">更多</button>
                <button @click="submit" class="btn btn-primary mt-3 custom-margin">提交</button>
            </div>
        </div>
</template>

<script src="./MenuPage.js"></script>