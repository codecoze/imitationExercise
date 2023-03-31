<template>
    <div class="nav">
        <div class="nav-menu-wrapper">
            <ul class="memu-list">

            </ul>
        </div>
    </div>

</template>

<script setup>
import { ref,createRouter } from "vue";

const menuList = ref([]);
const current = ref(0);

const imgUrl = ref(null);

imgUrl.value = require("@/assets/img/head_portrait.jpg")

menuList.value = [
        "icon-xinxi",
        "icon-shipin",
        "icon-shu",
        "icon-shandian",
        "icon-shezhi",];


function changeMenu(index){
    switch (index) {
        case 0:
          this.$router.push({
            name: "ChatHome",
          }, () => {});
          break;
        case 1:
          this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        case 2:
          this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        case 3:
          this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        case 4:
          this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        default:
          this.$router.push({
            name: "ChatHome",
          });
    }

}

</script>

<style lang="scss" scoped>

</style>