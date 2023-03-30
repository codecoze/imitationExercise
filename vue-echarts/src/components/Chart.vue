<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import { ref, defineProps,toRefs,watch,onMounted} from "vue";
import * as echarts from "echarts";

const container = ref(null);
let chart = ref(null);

const props = defineProps({
    options: {
        required: true,
        type: Object,
        default: {}
    }
});

const { options } = toRefs(props)

onMounted(() => {
    chart.value = echarts.init(container.value,"dark"); 
    console.log(props.options)
    chart.value.setOption(props.options);
    window.addEventListener('resize', function () {//执行
        // 窗口变化 重新渲染图表
        chart.value.resize();

    })
});

watch(
    options,
    (newOptions)=>{
        chart.value.setOption(newOptions)
    },
    {deep: true}
);
 


</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>