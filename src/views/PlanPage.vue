<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div >
  
            <el-button-group style="display: flex">
              <el-button
                color="#ab2b3a"
                v-for="(Id, index) in MenuIdList"
                :key="index"
                @click="setMenuId(Id)"
                :class="['menu-id-button', { selected: menuId === Id }]"
                >{{ Id }}</el-button
              >
            </el-button-group>
            <el-button-group style="display: flex">
              <el-button
                        :disabled="day.indexOfDay === 0"
                color="#9f6955"
                type="primary"
                @click="clickPreviousButton"
                ><el-icon><ArrowLeft /></el-icon
              ></el-button>
              <el-button v-for="(day,index) in day.dayListChinese" color="#9f6955" type="primary" :class="{'highlight-button': index === day.indexOfDay}" @click="setDay(index)">{{day}} </el-button>
              <el-button color="#9f6955" type="primary" @click="clickNextButton"
                ><el-icon><ArrowRight /></el-icon
              ></el-button>
            </el-button-group>
    
        </div>
      </el-col>

      <el-col :span="24" style="margin-top: 1rem">
        <div class="plan-section">
            <div v-for="(selectedDish, dishListIndex) in selectedDishList" :key="dishListIndex" class="content">
                <div>
                    <el-text size="large"
                             style="color: #000; font-weight: bolder; font-size: 1.4rem">{{selectedDish.typeInChinese}}</el-text>
                    <el-button color="#f1e6d8"
                               @click="randomSelect(selectedDish.type, dishListIndex)"
                               class="graphic-button">
                        <el-icon size="1rem"><Refresh /></el-icon>
                    </el-button>
                    <el-select v-model="selectedDish.name"
                               filterable
                               placeholder="Select"
                               @change="handleUpdateDropList(dishListIndex, selectedDish.name)"
                               style="width: 10rem">
                        <el-option v-for="(menu, index) in menuData[selectedDish.type]"
                                   :key="index"
                                   :label="menu"
                                   :value="menu" />
                    </el-select>
                    <el-table :data="selectedDish.ingredient" table-layout="fixed">
                        <el-table-column prop="name" label="名称" />
                        <el-table-column prop="amount" label="数量" />
                        <el-table-column prop="unit" label="单位" />
                    </el-table>
                    <el-button color="#f1e6d8"
                               @click="addMoreDish(selectedDish.type)"
                               class="graphic-button">
                        <el-icon size="1rem"><Plus /></el-icon>
                    </el-button>
                    </div>

                    </div>

                </div>
      </el-col>

     
    </el-row>
  </div>

</template>

<script lang="ts" src="./PlanPage.js">
</script>
<style scoped>
.el-button {
  padding: 0;
}
.el-teble {
  text-align: center;
}
.el-table_body {
  background-color: #000; /* 你想要的背景色 */
}
</style>
