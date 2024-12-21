<template>
    <div class="header">
    <h1>杂项</h1>
   
    </div>
  <div class="container">
    <!-- Table header -->
    <div class="row">
      <div class="col">
        <strong>名称</strong>
      </div>
      <div class="col">
        <strong>数量</strong>
      </div>
      <div class="col">
        <strong>单位</strong>
      </div>
    </div>

    <!-- Dynamically generated rows for inputs -->
    <div v-for="(row, index) in rows" :key="index" class="row">
      <div class="col">
        <input type="text" v-model="row.name" placeholder="Enter name" />
      </div>
      <div class="col">
        <input type="number" v-model="row.amount" placeholder="Enter amount" />
      </div>
      <div class="col">
        <input type="text" v-model="row.unit" placeholder="Enter unit" />
      </div>
    </div>

      <div class="container">
    <!-- Button to add new row -->
    <button @click="addRow" class="btn btn-primary mt-3">增加更多</button>
    <button @click="submit" class="btn btn-primary mt-3 custom-margin">下一页</button>
    </div>
  </div>
</template>

<script src="./MiscellaneousPage.js"></script> <!-- Link to the JS file -->


