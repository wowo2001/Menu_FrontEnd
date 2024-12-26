<template>
    <div class="header">
        <h1>原料管理</h1>
    </div>

    <div class="container">
        <div v-if="isLoading" class="spinner-overlay">
            <div class="spinner"></div>
        </div>

        <!-- Dynamically generated rows for inputs -->
        <div v-for="(row, index) in rows" :key="index" class="row">
            <div class="col-12 col-md-4">
                <input type="text" v-model="row.name" class="form-control custom-input" placeholder="原料名称" disabled />
            </div>
            <div class="col-12 col-md-4">
                <input type="text" v-model="row.location" class="form-control custom-input" placeholder="购买地点" @change="updateLocation(index,row.location)" />
            </div>
        </div>
    </div>
    
    <button @click="editNameLocationList" class="btn btn-primary mt-3 custom-margin">更新</button>

</template>

<script src="./IngredientManagementPage.js"></script>