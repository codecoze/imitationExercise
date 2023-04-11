import vnode from "./vnode"
import createElement from "./createElement";
import patchVnode from "./patchVnode";
/**
 * 
 * @param {*} oldVnode  旧的虚拟节点
 * @param {*} newVnode  新的虚拟节点
 */

export default function( oldVnode, newVnode ){

    //oldVnode 可能是真实节点 ，此时需要将真实节点转化成虚拟节点
    if( oldVnode.sel == undefined ){
        //如果节点没有sel属性 则说明是真实节点
        oldVnode = vnode(
            oldVnode.tagName.toLowerCase(), //sel
            {}, //data
            [],
            undefined,
            oldVnode
        )
    }

    //判断 旧的虚拟节点 与 新的虚拟节点 是不是同一个节点    
    if(oldVnode.sel === newVnode.sel){
        patchVnode(oldVnode, newVnode);
    
    }else {
        //  不是同一节点  就暴力删除旧节点，创建插入新的节点
        //  把新的虚拟节点 创建为 dom节点
        let newVnodeElm = createElement(  newVnode );
        //获取旧的虚拟节点。elm
        let oldVnodeElm = oldVnode.elm;
        if( newVnodeElm ){
            oldVnodeElm.parentNode.insertBefore( newVnodeElm, oldVnodeElm);
        }
        //删除旧节点
        oldVnodeElm.parentNode.removeChild( oldVnodeElm );
    }

}