<template>


    <!-- Modal Dialog -->
    <el-dialog v-model="dialogVisible"
               title="可用菜单"
               width="80%"
               @close="closeDialog">
        <div>
            <p>请选择需要的菜:</p>
            <div class="custom-slide">
                <Carousel v-bind="carouselConfig">
                    <Slide v-for="(dialogType, index) in dialogTypeList" :key="index">

                        <div class="button-container">
                            <el-button v-for="(menu, index) in menuData[dialogType]"
                                       :color="hanldleButtonColor(menu)"
                                       :ref="`button-${index}`" style="width: fit-content; padding: 1rem; margin-bottom: 1rem">
                                <span class="button-text" @click="stagingSelectedDishUpdate(menu)">{{ menu }}</span>
                            </el-button>
                        </div>

                    </Slide>
                </Carousel>
            </div>
        </div>
     

    </el-dialog>
    <div>
        <el-row>
            <el-col :span="24">
                <div>
                    <el-button-group style="display: flex">
                        <el-button :color="Id === menuId ? '#ffd633' : '#9f6955'"
                                   v-for="(Id, index) in MenuIdList"
                                   :key="index"
                                   @click="setMenuId(Id)">{{ Id }}</el-button>
                    </el-button-group>
                    <el-button-group style="display: flex; margin-top: 1rem; margin-bottom: 1rem;">
                        <el-button :disabled="day.indexOfDay === 0"
                                   color="#9f6955"
                                   type="primary"
                                   @click="clickPreviousButton">
                            <el-icon><ArrowLeft /></el-icon>
                        </el-button>
                        <el-button :color="index === indexOfDay ? '#ffd633' : '#9f6955'"
                                   v-for="(day,index) in day.dayListChinese"
                                   :key="index"
                                   @click="setDay(index)">{{day}} </el-button>
                        <el-button color="#9f6955" type="primary" @click="clickNextButton">
                            <el-icon><ArrowRight /></el-icon>
                        </el-button>
                    </el-button-group>

                </div>
            </el-col>
            <el-col :span="24">
                <el-button-group style="display: flex">
                    <el-button type="primary" @click="openDialog('Main')">主菜</el-button>
                    <el-button type="primary" @click="openDialog('Side')">配菜</el-button>
                    <el-button type="primary" @click="openDialog('Soup')">汤</el-button>
                    <el-button type="primary" @click="openDialog('Lunch')">午餐</el-button>
                </el-button-group>
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
    .custom-slide {
        width: 100%; /* Make slide width 100% of the carousel */

    }
    .button-container {
  display: flex;            /* Enable flexbox layout */
  flex-wrap: wrap;          /* Allow buttons to wrap to the next line if needed */
  width: 100%;              /* Ensure the container takes full width of the dialog */
  align-items: flex-start;  /* Align buttons to the top of the container */
  padding: 0rem;            /* Optional: remove padding if unnecessary */
  height: 100%;             /* Optional: ensure the container takes full height */
  overflow-y: auto;         /* Enable vertical scrolling if content exceeds the height */
}
    

</style>
