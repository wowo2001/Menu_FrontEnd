<template>
  <div class="header">
    <h1>杂项</h1>
  </div>

  <div class="container">
    <div v-if="isLoading" class="spinner-overlay">
    <div class="spinner"></div>
    </div>

    <!-- Dynamically generated rows for inputs -->
    <div v-for="(row, index) in rows" :key="index" class="row">
      <div class="col-12 col-md-4">
        <input type="text" v-model="row.name" class="form-control custom-input" placeholder="名称" />
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
    <button @click="addRow" class="btn blue-button mt-3">增加更多</button>
    <!-- Buttons -->
    <div class="container">
      
      <button @click="submit" class="btn btn-primary mt-3 custom-margin">下一页</button>
    </div>
  </div>
</template>

<script src="./MiscellaneousPage.js"></script>