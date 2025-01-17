<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-affix :offset="0" style="text-align: center;padding: 1rem;">
            <span style="font-size: 1.6rem;"> {{  value}} </span>
        </el-affix></el-header
      >
      <el-main style="height: 1000px;"><router-view class="container"> </router-view></el-main>
      <el-footer style="margin-bottom: 1rem;">
        <el-affix style="text-align: center;" position="bottom" :offset="0">
            <div class="custom-style">
          <el-segmented
            v-model="value"
            :options="options"
            direction="horizontal"
            size="default"
          >
            <template #default="{ item }">
              <div
                :class="[
                  'flex',
                  'items-center',
                  'gap-2',
                  'flex-col',
                  
                ]"

                @click="goToPage(item.path,item.label)"
              >
                <el-icon size="40" >
                  <component :is="item.icon" />
                </el-icon>
                <div style="font-size: 1rem;">{{ item.label }}</div>
              </div>
            </template>
          </el-segmented>
        </div>
        </el-affix>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import {
  ForkSpoon,
  Handbag,
  Notebook,
  RefreshLeft,
} from "@element-plus/icons-vue";

const router = useRouter();
const value = ref("菜单规划");


const options = [
  {
    label: "菜单规划",
    value: "菜单规划",
    path:"/plan",
    icon: ForkSpoon,
  },
  {
    label: "采购清单",
    value: "采购清单",
    path:"/review",
    icon: Handbag,
  },
  {
    label: "菜谱管理",
    value: "菜谱管理",
    path:"/menu",
    icon: Notebook,
  },

  {
    label: "原料管理",
    value: "原料管理",
    path:"/ingredientManagement",
    icon: RefreshLeft,
  },
];

function handleClick(buttonName) {
  alert(`You clicked ${buttonName}`);
}
function goToPage(route,title) {

      value.value = title;
  console.log(`Navigating to: ${route}`); // Add logging here
  router.push(route).catch((err) => {
    console.error("Error navigating:", err); // Log if there's an error in the navigation
  });
}
</script>
<style scoped>
.custom-style .el-segmented {
  
  background-color: #f1e6d8;
  --el-segmented-item-selected-color: #f1e6d8;
  --el-segmented-item-selected-bg-color: #9f6955;
 
}
.el-segmented__item{
    margin: 0 auto;
    text-align: center;
}
</style>