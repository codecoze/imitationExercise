<template>
  <div class="person-card" :class="{ activeCard: person.id == current }">
    <div class="info">
      <HeadPortrait :imgUrl="person.headImg"></HeadPortrait>
      <div class="info-detail">
        <div class="name">{{ person.name }}</div>
        <div class="detail">{{ person.detail }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeadPortrait from "./HeadPortrait.vue";
import { defineProps, ref,watch, toRef} from "vue";

let current = ref("");
const props = defineProps({
  person: {
    type: Object,
    default: () => {
      return {};
    },
  },
  pcurrent: {
    type: [Number,String],
    default: Number
  }
});

const { pcurrent} = toRef(props)

watch(
    pcurrent,
    (newVal)=>{
        isActive();
    }
)

function isActive(){
    current.value = pcurrent.value;
}
</script>

<style lang="scss" scoped>
.person-card {
  width: 250px;
  height: 80px;
  border-radius: 10px;
  background-color: rgb(50,54,68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;
  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%,-50%);
    overflow: hidden;
    display: flex;
    .info-detail {
        margin-top: 5px;
        margin-left: 20px;
        .name {
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-bottom: 5px;
        }
        .detail {
            color: #5c6675;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 12px;
        }
    }
   }
   &:hover {
        background-color: #1d90f5;
        transition: 0.3s;
        box-shadow: 0px 0px 10px 0px rgba(0,136,355,1);
        .info {
            .info-detail {
                .detail {
                color: #fff;
                }
            }
        }
    }
}
</style>
