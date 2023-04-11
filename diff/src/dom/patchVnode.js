import createElement from "./createElement";
import updateChild from "./updateChild";

/**
 * 
 * @param {*} oldVnode 旧节点
 * @param {*} newVnode  新节点
 */

export default function patchVnode( oldVnode, newVnode ) {
    //判断新节点是否有子节点
    if( newVnode.children == undefined ) {
        //新节点没有子节点  

        if( newVnode.text !== oldVnode.text){
            oldVnode.elm.innerText = newVnode.text;
        }
    
    
    }else {
        //新的子节点

        //新的有子节点 旧的虚拟节点有
        if( oldVnode.children !== undefined && oldVnode.children.length){
            //diff算法核心
            updateChild( oldVnode.elm , oldVnode.children ,newVnode.children )
        }else{
            //新的虚拟节点有 旧的虚拟节点没有子元素
            //创建 新的子节点 添加到页面中
             oldVnode.elm.innerHTML= "";
            for(let child of newVnode.children) {
                let childDom = createElement(child);
                oldVnode.elm.appendChild(childDom);
            }

        }
    }


}