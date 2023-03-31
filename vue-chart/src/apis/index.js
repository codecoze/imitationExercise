import axios from "@/utils/request.js";

//获取好友
export const getFriend = params =>{
    return axios({
        method: "post",
        url: "/friend/friendList",
        data: params
    }).then(res=>res.data)
}

//获取聊天信息

export const getChatMsg = params => {
    return axios({
      method: 'post',
      baseURL: `/friend/chatMsg`,
      data: params
    }).then(res => res.data)
  }