<template>
    <div class="chat-window">
        <div class="top">
            <div class="head-pic">
                <HeadPortrait :imgUrl="friendInfo.headImg" />
            </div>
            <div class="info-detail">
                <div class="name">{{ friendInfo.name }}</div>
                <div class="detail">{{ friendInfo.detail }}</div>
            </div>
            <div class="other-fun">
                <span class="iconfont icon-shipin" @click="video"> </span>
                <span class="iconfont icon-gf-telephone" @click="telephone"></span>
                <label for="docFile">
                    <span class="iconfont icon-wenjian"></span>
                </label>
                <label for="imgFile">
                    <span class="iconfont icon-tupian"></span>
                </label>
                <input  type="file" name="" id="imgFile" @change="sendImg" accept="image/*" />
                <input type="file" name="" id="docFile" @change="sendFile" accept="application/*,text/*" />
            </div>
        </div>
        <div class="bottom">
            <div class="chat-content" ref="chatContent">
                <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
                    <div class="chat-friend" v-if="item.uid !== '1001'">
                        <div class="chat-text" v-if="item.chatType == 0">
                        {{ item.msg }}
                        </div>
                        <div class="chat-img" v-if="item.chatType == 1">
                            <img :src="item.msg" alt="表情" v-if="item.extend.imgType == 1" style="width: 100px; height: 100px" />
                            <el-image :src="item.msg" :preview-src-list="srcImgList" v-else>
                            </el-image>
                        </div>
                        <div class="chat-img" v-if="item.chatType == 2">
                            <div class="word-file">
                                <FileCard
                                :fileType="item.extend.fileType"
                                :file="item.msg"
                                ></FileCard>
                            </div>
                        </div>
                        <div class="info-time">
                            <img :src="item.headImg" alt="" />
                            <span>{{ item.name }}</span>
                            <span>{{ item.time }}</span>
                        </div>
                    </div>
                    <div class="chat-me" v-else>
                        <div class="chat-text" v-if="item.chatType == 0">
                        {{ item.msg }}
                        </div>
                        <div class="chat-img" v-if="item.chatType == 1">
                            <img
                                :src="item.msg"
                                alt="表情"
                                v-if="item.extend.imgType == 1"
                                style="width: 100px; height: 100px"
                            />
                           
                            <el-image
                                style="max-width: 300px; border-radius: 10px"
                                :src="item.msg"
                                :preview-src-list="srcImgList"
                                v-else
                            >
                            </el-image>
                        </div>
                        <div class="chat-img" v-if="item.chatType == 2">
                            <div class="word-file">
                                <FileCard
                                :fileType="item.extend.fileType"
                                :file="item.msg"
                                ></FileCard>
                            </div>
                            </div>
                            <div class="info-time">
                            <span>{{ item.name }}</span>
                            <span>{{ item.time }}</span>
                            <img :src="item.headImg" alt="" />
                        </div>
                    </div>
                    </div>
            </div>
            <div class="chatInputs">
                <div class="emoji boxinput" @click="clickEmoji">
                    <img src="@/assets/img/emoji/smiling-face.png" alt="" />
                </div>
                <div class="emoji-content">
                    <Emoji
                        v-show="showEmoji"
                        @sendEmoji="sendEmoji"
                        @closeEmoji="clickEmoji"
                    ></Emoji>
                </div>
                <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
                <div class="send boxinput" @click="sendText">
                    <img src="@/assets/img/emoji/rocket.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import HeadPortrait from "@/components/HeadPortrait.vue";
import FileCard from "@/components/FileCard.vue";
import { defineProps,ref,toRefs,nextTick,onMounted,watch,defineEmits} from "vue"

import { animation } from "@/utils/util";
import { ElMessage } from 'element-plus';
import {  getChatMsg } from "@/apis/index.js";


const inputMsg = ref("");
const chatList = ref([]);
const chatContent = ref(null);
const emit = defineEmits(["personCardSort"]);
const srcImgList = ref([]);
const showEmoji = ref(false);
let userInfo = {
    headImg: new URL("@/assets/img/head_portrait.jpg",import.meta.url),
    name: "大毛是小白",
    time: "09：12 AM",
    msg: "",
    chatType: 0, //信息类型，0文字，1图片
    uid: "1001", //uid
}

const props = defineProps({
    friendInfo : {
        type: Object,
        default:()=>{}
    }
})

const {friendInfo }= toRefs(props);

// console.log(friendInfo,'props')

onMounted(()=>{
    getFriendChatMsg();
})

//监听聊天对象的变化
watch( 
    friendInfo ,
    (newVal,oldVal)=>{
        console.log('watch监听inputVal的变化 newVal ------>', newVal);
        getFriendChatMsg();
    },
    { deep: true}
)

//获取聊天记录
function getFriendChatMsg(){
    let params = {
        friendId: friendInfo.value.id,
    }
    getChatMsg(params).then(res=>{
        // console.log(res);
        chatList.value = res;
        chatList.value.forEach((item)=>{
            if(item.chatType == 2 && item.extend.imgType == 2){
                srcImgList.value.push(item.msg)
            }
        })
        scrollBottom();
    })

}

function sendText(){
    if(inputMsg.value){
        let chatMsg = {
            ...userInfo,
            msg: inputMsg.value,
        }
        sendMsg(chatMsg);
        emit('personCardSort', friendInfo.value.id);
        inputMsg.value = "";
    }else {
        ElMessage({
            message: "消息不能为空",
            type: "warning"
        })
    }
}

//获取窗口高度并滚动至最底层
function scrollBottom(){
    nextTick(()=>{
        let scrollDom = chatContent.value;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight)
    })
}


// 打开表情
function clickEmoji(){
    showEmoji.value = !showEmoji.value;
}

//发送表情
function sendEmoji(msg){
    let chatMsg = {
        ...userInfo,
        msg: msg,
        chatType: 1, //信息类型，0文字，1图片
        extend: {
          imgType: 1, //(1表情，2本地图片)
        },
    }
    sendMsg(chatMsg);
    clickEmoji();
}

 //发送信息
function sendMsg(msgList){
    chatList.value.push(msgList);
    // console.log(chatList.value)
    scrollBottom();
}


//发送本地图片
function sendImg(e){
    console.log(e.target.files)
    let chatMsg = {
        ...userInfo,
        msg: "",
        chatType: 1, //信息类型，0文字，1图片
        extend: {
          imgType: 2, //(1表情，2本地图片)
        },
    };

    let files = e.target.files[0];//图片文件名
    if(!e || !window.FileReader) return;  // 看是否支持
    let reader =  new FileReader();
    reader.readAsDataURL(files); //
    reader.onload = function(){
        chatMsg.msg = this.result;
        srcImgList.value.push(chatMsg.msg);
        sendMsg(chatMsg);
    }
   
    e.target.files=null;

}

//发送文件
function sendFile(e) {
    let chatMsg = {
        ...userInfo,
        msg: "",
        chatType: 2, //信息类型，0文字，1图片,2 文件
        extend: {
            fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt)
        },
    };
    let files = e.target.files[0]; //图片文件名
    chatMsg.msg = files;
    if(files){
        switch(files.type){
            case "application/msword":
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            chatMsg.extend.fileType = 1;
            break;
          case "application/vnd.ms-excel":
          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            chatMsg.extend.fileType = 2;
            break;
          case "application/vnd.ms-powerpoint":
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            chatMsg.extend.fileType = 3;
            break;
          case "application/pdf":
            chatMsg.extend.fileType = 4;
            break;
          case "application/zip":
          case "application/x-zip-compressed":
            chatMsg.extend.fileType = 5;
            break;
          case "text/plain":
            chatMsg.extend.fileType = 6;
            break;
          default:
            chatMsg.extend.fileType = 0;
        }
        sendMsg(chatMsg);
        e.target.files = null;
    }

}

//发送视频
function telephone(){
    ElMessage("该功能还没有开发哦，敬请期待一下吧~🥳")
}

 //发送视频
function  video() {
    ElMessage("该功能还没有开发哦，敬请期待一下吧~🥳");
}


</script>

<style lang="scss" scoped>
.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;

  .top {
    margin-bottom: 50px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .head-pic {
      float: left;
    }
    .info-detail {
      float: left;
      margin: 5px 20px 0;
      .name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }
      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }
    .other-fun {
      float: right;
      margin-top: 20px;
      span {
        margin-left: 30px;
        cursor: pointer;
      }
      // .icon-tupian {

      // }
      input {
        display: none;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 70vh;
    background-color: rgb(50, 54, 68);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
      .chat-wrapper {
        position: relative;
        word-break: break-all;
        .chat-friend {
          width: 100%;
          float: left;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .chat-text {
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 20px 5px;
            background-color: rgb(56, 60, 75);
            color: #fff;
            &:hover {
              background-color: rgb(39, 42, 55);
            }
          }
          .chat-img {
            img {
              width: 100px;
              height: 100px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
            }
            span:last-child {
              color: rgb(101, 104, 115);
              margin-left: 10px;
              vertical-align: middle;
            }
          }
        }
        .chat-me {
          width: 100%;
          float: right;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          .chat-text {
            float: right;
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 5px 20px;
            background-color: rgb(29, 144, 245);
            color: #fff;
            &:hover {
              background-color: rgb(26, 129, 219);
            }
          }
          .chat-img {
            img {
              max-width: 300px;
              max-height: 200px;
              border-radius: 10px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }
            span {
              line-height: 30px;
            }
            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .chatInputs {
      width: 90%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;
      .boxinput {
        width: 50px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .emoji {
        transition: 0.3s;
        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
      }

      .inputs {
        width: 90%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #fff;
        font-weight: 100;
        margin: 0 20px;
        &:focus {
          outline: none;
        }
      }
      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        }
      }
    }
  }
}
</style>