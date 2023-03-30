<template>
  <div class="wrapper">
    <BarChart :boxOfficeData="boxOfficeData" class="chart" />
    <DoughnutChart :boxOfficeData="boxOfficeData" class="chart" />
  </div>
</template>

<script setup>
import { ref, onMounted} from "vue";
import BarChart from './components/BarChart.vue';
import DoughnutChart from './components/DoughnutChart.vue';
const boxOfficeData = ref([]);

const fetchData = async ()=>{
  const res =  await fetch("/boxOffice.json");
  const data = await res.json();
  boxOfficeData.value = data;
}

onMounted(()=>{
  fetchData();
});
</script>

<style  >
body {
  background: hsl(210deg, 20%, 10%);
}
.wrapper {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  place-items: center;
}

.wrapper .chart {
  width: 80%;
  height: 400px;
}


</style>
