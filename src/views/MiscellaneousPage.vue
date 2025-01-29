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

        <el-input type="text" v-model="row.name"  placeholder="名称" @change="validateUnit(row.name)"/>

        <el-input type="number" v-model="row.amount"  placeholder="数量" />

        <el-input type="text" v-model="row.unit"  placeholder="单位" />

        <el-button @click="removeRow(index)" color="red" style="width: 1rem;">X</el-button>

    </div>
    <el-button @click="addRow" color="blue">增加更多</el-button>
    <!-- Buttons -->
    <div class="container">
      
      <el-button @click="submit" color="green">下一页</el-button>
    </div>
  </div>
</template>

<script src="./MiscellaneousPage.js"></script>