<template>
    <div class="nav">
        <div class="nav-menu-wrapper">
            <ul class="menu-list">
              <li v-for="(item,index) in menuList" :key="index" :class="{active: index === current}" @click="changeMenu(index)">
                <div class="block"></div>
                <span class="iconfont" :class="item"></span>
              </li>
            </ul>
        </div>
        <div class="own-pic">
            <HeadPortrait :imgUrl="imgUrl"></HeadPortrait>
        </div>
    </div>

</template>

<script setup>
import HeadPortrait from "./HeadPortrait.vue";
import { ref, } from "vue";
import { useRouter } from "vue-router";

import { ElMessage } from 'element-plus'

const menuList = ref([]);
const current = ref(0);

const imgUrl = ref(null);
const router = useRouter();

imgUrl.value = new URL("../assets/img/head_portrait.jpg", import.meta.url);

menuList.value = [
        "icon-xinxi",
        "icon-shipin",
        "icon-shu",
        "icon-shandian",
        "icon-shezhi",
      ];


function changeMenu(index){
    switch (index) {
        case 0:
          router.push({
            name: "ChatHome",
          }, () => {});
          break;
        case 1:
          ElMessage("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        case 2:
          ElMessage("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        case 3:
          ElMessage("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        case 4:
          ElMessage("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        default:
           router.push({
            name: "ChatHome",
          });
    }

}

</script>

<style lang="scss" scoped >
.nav {
  width: 100%;
  height: 90vh;
  position: relative;
  border-radius: 20px 0 0 20px;
  .nav-menu-wrapper {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);
  }
  .menu-list {
    margin-left: 10px;

    li {
      margin: 40px 0 0 30px;
      cursor: pointer;
      position: relative;
      .block {
        background-color: rgb(29,144,245);
        position: absolute;
        left: -40px;
        width: 6px;
        height: 25px;
        transition: 0.5s;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        opacity: 0;
      }
      &:hover {
        span {
          color: rgb(29, 144, 245);
        }
        .block {
          opacity: 1;
        }
      }
    }
  }
  .own-pic {
    position: absolute;
    bottom: 10%;
    margin-left: 25px;
  }
}
.activeNav {
  span {
    color: rgb(29, 144, 245);
  }
  .block {
    opacity: 1 !important;
  }
}
</style>