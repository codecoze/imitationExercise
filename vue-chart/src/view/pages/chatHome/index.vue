<template>
    <div class="chatHome">
        <div class="chatLeft">
            <div class="title">
                <h1>大猫聊天室</h1>
            </div>
            <div class="online-person">
                <span class="online-text">
                    聊天列表
                </span>
                <div class="person-cards-wrapper">
                    <div class="personList"  v-for="person in  personList" :key-="'person_'+person.id" @click="clickPerson(person)">
                        <PersonCard :person="person" :pcurrent="pcurrent" />
                    </div>
                </div>
            </div>
        </div>
        <div class="chatRight">
            <div v-if="showChatWindow">
                <ChatWindow
                :friendInfo="chatWindowInfo"
                @personCardSort="personCardSort"
                ></ChatWindow>
            </div>
            <div class="showIcon" v-else>
                <span class="iconfont icon-snapchat"></span>
                <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { getFriend } from "@/apis/index.js";
import { onMounted,ref,reactive } from "vue";

import PersonCard from "@/components/PersonCard.vue";
import ChatWindow from "./chatwindow.vue";

const  personList = ref([]);
let  pcurrent = ref("");   
let showChatWindow = ref(false);
let chatWindowInfo  = reactive({})

onMounted(()=>{
    fetchData();
})

function fetchData(){

    getFriend().then(res=>{
        // console.log(res)
        personList.value = res;
    })
};
function clickPerson(info){
 showChatWindow.value = true;
 chatWindowInfo = info;
//  personInfo.value = info;
 pcurrent.value = info.id;

//  console.log(chatWindowInfo,"clickPerson") 
}

function personCardSort(id){
    console.log(id)
    
    if(id !== personList.value[0].id){
        console.log(id);
        let nowPersonInfo;
        for(let i = 0; i< personList.value.length; i++){
            if(personList.value[i].id === id){
                nowPersonInfo = personList.value[i];
                personList.value.splice(i,1);
                break;
            }
        }
        personList.value.unshift(nowPersonInfo);
    }

}

</script>

<style lang="scss" scoped>
.chatHome {
    display: flex;
    .chatLeft {
        width: 280px;
        .title {
            color: #fff;
            padding-left: 10px;
        }
        .online-person {
            margin-top: 100px;
            .online-text {
                padding-left: 10px;
                color: rgba(176,178,189);
            }
            .person-cards-wrapper {
                padding-left:  10px;
                height: 65vh;
                margin-top: 20px;
                overflow: hidden;
                overflow-y: scroll;
                box-sizing: border-box;
                &::-webkit-scrollbar {
                    width: 0;/* Safari,Chrome 隐藏滚动条 */
                    height: 0;/* Safari,Chrome 隐藏滚动条 */
                    display: none;/* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
                }
            }
        }
    }
    .chatRight {
    flex: 1;
    padding-right: 30px;
    .showIcon {
      position: absolute;
      top: calc(50% - 150px); /*垂直居中 */
      left: calc(50% - 50px); /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}
</style>