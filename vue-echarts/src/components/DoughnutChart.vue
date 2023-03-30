<template>
    <!-- 如果只有一个顶层标签， :class=$attrs.class 可以省略 -->
    <Chart :options="options" :class="$attrs.class" />
</template>

<script setup>
    import Chart from "./Chart.vue";
    import doughnutChartCreator from "../charts/doughnutChart.js";
    import { computed, toRefs,defineProps  } from "vue";


    const props = defineProps({
        boxOfficeData: Array
    });

    const { boxOfficeData} = toRefs(props);

    //环形图中的数据只有一个纬度
    const options = computed(()=>{
        const data = populateMovieData(boxOfficeData.value);
        return doughnutChartCreator(data);
    })

    function populateMovieData(rawData){
        let data = []
        rawData.forEach((movie)=>{
            data.push({
                name: movie?.name,
                value: movie?.boxOffice
            })
        });
        return data
    }
</script>

<script scoped>

</script>