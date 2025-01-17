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
                color="#9f6955"
                type="primary"
                @click="clickPreviousButton"
                ><el-icon><ArrowLeft /></el-icon
              ></el-button>
              <el-button color="#9f6955" type="primary" @click="setDay(0)"
                >周一</el-button
              >
              <el-button color="#9f6955" type="primary" @click="setDay(1)"
                >周二</el-button
              >
              <el-button color="#9f6955" type="primary" @click="setDay(2)"
                >周三</el-button
              >
              <el-button color="#9f6955" type="primary" @click="setDay(3)"
                >周四</el-button
              >
              <el-button color="#9f6955" type="primary" @click="setDay(4)"
                >周五</el-button
              >
              <el-button color="#9f6955" type="primary" @click="clickNextButton"
                ><el-icon><ArrowRight /></el-icon
              ></el-button>
            </el-button-group>
    
        </div>
      </el-col>

      <el-col :span="24" style="margin-top: 1rem">
        <div class="plan-section">
          <div class="content">
            <el-text
              size="large"
              style="color: #000; font-weight: bolder; font-size: 1.4rem"
              >主菜</el-text
            >
            <el-button
              color="#f1e6d8"
              @click="randomSelect('main')"
              class="graphic-button"
            >
              <el-icon size="1rem"><Refresh /></el-icon>
            </el-button>
            <el-select
              v-model="selectedMainDish"
              filterable
              placeholder="Select"
              @change="handleUpdateDropList(selectedMainDish, 'main')"
              style="width: 10rem"
            >
              <el-option
                v-for="(menu, index) in menuDataMain"
                :key="index"
                :label="menu"
                :value="menu"
              />
            </el-select>
          </div>

          <!-- Main Dish -->
          <div class="content">
            <el-table :data="mainDishIngredients" table-layout="fixed">
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="amount" label="数量" />
              <el-table-column prop="unit" label="单位" />
            </el-table>

            <!-- <div v-if="mainDishIngredients.length" class="table-container">
              <table class="ingredients-table">
                <thead>
                  <tr>
                    <th>名称</th>
                    <th>数量</th>
                    <th>单位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(ingredient, index) in mainDishIngredients"
                    :key="index"
                  >
                    <td>{{ ingredient.name }}</td>
                    <td>{{ ingredient.amount }}</td>
                    <td>{{ ingredient.unit }}</td>
                  </tr>
                </tbody>
              </table>
            </div> -->
          </div>
        </div>
      </el-col>

      <el-col :span="24" style="margin-top: 1rem">
        <div class="content">
          <el-text
            size="large"
            style="color: #000; font-weight: bolder; font-size: 1.4rem"
            >配菜</el-text
          >
          <el-button
            color="#f1e6d8"
            @click="randomSelect('side1')"
            class="graphic-button"
          >
            <el-icon size="1rem"><Refresh /></el-icon>
          </el-button>
          <el-select
            v-model="selectedSideDish1"
            filterable
            placeholder="Select"
            @change="handleUpdateDropList(selectedSideDish1, 'side1')"
            style="width: 10rem"
          >
            <el-option
              v-for="(menu, index) in menuDataSide"
              :key="index"
              :value="menu"
            />
          </el-select>
        </div>

        <!-- Main Dish -->
        <div class="content">
          <el-table :data="sideDish1Ingredients" table-layout="fixed">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="amount" label="数量" />
            <el-table-column prop="unit" label="单位" />
          </el-table>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top: 1rem">
        <div class="content">
          <el-text
            size="large"
            style="color: #000; font-weight: bolder; font-size: 1.4rem"
            >配菜</el-text
          >
          <el-button
            color="#f1e6d8"
            @click="randomSelect('side2')"
            class="graphic-button"
          >
            <el-icon size="1rem"><Refresh /></el-icon>
          </el-button>
          <el-select
            v-model="selectedSideDish2"
            filterable
            placeholder="Select"
            @change="handleUpdateDropList(selectedSideDish2, 'side2')"
            style="width: 10rem"
          >
            <el-option
              v-for="(menu, index) in menuDataSide"
              :key="index"
              :value="menu"
            />
          </el-select>
        </div>

        <!-- Main Dish -->
        <div class="content">
          <el-table :data="sideDish2Ingredients" table-layout="fixed">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="amount" label="数量" />
            <el-table-column prop="unit" label="单位" />
          </el-table>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top: 1rem">
        <div class="content">
          <el-text
            size="large"
            style="color: #000; font-weight: bolder; font-size: 1.4rem"
            >汤</el-text
          >
          <el-button
            color="#f1e6d8"
            @click="randomSelect('side2')"
            class="graphic-button"
          >
            <el-icon size="1rem"><Refresh /></el-icon>
          </el-button>
          <el-select
            v-model="selectedSoup"
            filterable
            placeholder="Select"
            @change="handleUpdateDropList(selectedSoup, 'soup')"
            style="width: 10rem"
          >
            <el-option
              v-for="(menu, index) in menuDataSoup"
              :key="index"
              :value="menu"
            />
          </el-select>
        </div>

        <!-- Main Dish -->
        <div class="content">
          <el-table :data="soupIngredients" table-layout="fixed">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="amount" label="数量" />
            <el-table-column prop="unit" label="单位" />
          </el-table>
        </div>
      </el-col>

      <el-col :span="24" style="margin-top: 1rem">
        <div class="content">
          <el-text
            size="large"
            style="color: #000; font-weight: bolder; font-size: 1.4rem"
            >午餐</el-text
          >
          <el-button
            color="#f1e6d8"
            @click="randomSelect('lunch')"
            class="graphic-button"
          >
            <el-icon size="1rem"><Refresh /></el-icon>
          </el-button>
          <el-select
            v-model="selectedLunch"
            filterable
            placeholder="Select"
            @change="handleUpdateDropList(selectedLunch, 'lunch')"
            style="width: 10rem"
          >
            <el-option
              v-for="(menu, index) in menuDataLunch"
              :key="index"
              :value="menu"
            />
          </el-select>
        </div>

        <!-- Main Dish -->
        <div class="content">
          <el-table :data="lunchIngredients" table-layout="fixed">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="amount" label="数量" />
            <el-table-column prop="unit" label="单位" />
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="plan-page">
    <div class="header">
      <div class="demo-date-picker">
        <div class="container"></div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" src="./PlanPage.js">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";

const drawer = ref(false);
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
