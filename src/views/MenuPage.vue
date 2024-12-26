<template>
    <div class="header">
        <h1>修改菜谱</h1>
    </div>

    <div>
        <button v-for="(menu, index) in menuTypes"
            :key="index"
            :class="{'selected': MenuType === menu.value}"
            @click="setMenuList(menu.value)"
            class="menu-button">
        {{ menu.text }} <!-- Display custom text for each button -->
        </button>
    </div>

    <div class="dropdown-container" v-if="MenuType !== null">
        <select v-model="MenuName" class="menu-dropdown" @change="setMenuName(MenuName)">
            <option value="newMenu">新增菜单</option>
            <option v-for="(MenuName, index) in MenuList" :key="index" :value="MenuName">
                {{ MenuName }}
            </option>
        </select>

    </div>
    <button @click="deleteMenu" class="btn red-button mt-3" v-if="MenuName !== null && MenuName !== 'newMenu'">删除菜单</button>

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
        <button @click="addRow" class="btn blue-button mt-3" v-if="MenuName !== null">+</button>
        <!-- Buttons -->
        <div class="container">

            <button @click="submit" class="btn btn-primary mt-3 custom-margin" v-if="MenuName !== null">提交</button>
        </div>
    </div>
</template>

<script src="./MenuPage.js"></script>