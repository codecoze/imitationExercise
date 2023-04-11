import vnode from "./vnode.js";

/**
 * 
 * @param {*} sel   tagName
 * @param {*} data  数据ß
 * @param {*} params 
 */
export default function( sel , data , params){
    //params 为string 则说明 该节点没有子元素
    if(typeof params === 'string'){
        return vnode(sel, data,undefined,params,undefined)
    }else if(Array.isArray(params)){
        //params 为数组 则说明 存在子元素
        let children =[];

        for(let item of params){ 
            children.push(item);
        }  

        return vnode(sel,data,children,undefined,undefined)
    }
}