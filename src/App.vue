<template>
  <div class="mainpage" style="touch-action: manipulation;">
    <el-container>
        <el-header>
            <el-affix target=".mainpage" position="top" :offset="0">
                <div style="width: 100%;height: 100%;padding-top: 1rem;z-index: 0;background-color:#f1e6d8;">
                    <span style="font-size: 1.6rem"> {{ value }} </span>
                </div>
            </el-affix>
        </el-header>
      <el-main> <router-view> </router-view></el-main>
      <el-footer>
        <el-affix target=".mainpage" position="bottom" :offset="0">
            <div>
                <el-segmented v-model="value"
                              :options="options"
                              direction="horizontal"
                              size="default">
                    <template #default="{ item }">
                        <div :class="['flex', 'items-center', 'gap-2', 'flex-col']"
                             @click="goToPage(item.path, item.label)">
                            <el-icon size="40">
                                <component :is="item.icon" />
                            </el-icon>
                            <div style="font-size: 1rem">{{ item.label }}</div>
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
    path: "/plan",
    icon: ForkSpoon,
  },
  {
    label: "采购清单",
    value: "采购清单",
    path: "/review",
    icon: Handbag,
  },
  {
    label: "菜谱管理",
    value: "菜谱管理",
    path: "/menu",
    icon: Notebook,
  },

  {
    label: "原料管理",
    value: "原料管理",
    path: "/ingredientManagement",
    icon: RefreshLeft,
  },
];

function handleClick(buttonName) {
  alert(`You clicked ${buttonName}`);
}
function goToPage(route, title) {
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
.el-segmented__item {
  margin: 0 auto;
  text-align: center;
}

.mainpage {
  padding: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-header {
  text-align: center;
  padding: 0;


}
.el-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-main {
  height: 100%;
  overflow: hidden;
}
.el-footer {
  display: flex;
  height: 4vh;
  width: 100%;
  align-items: center;
}

.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;

}
</style>
