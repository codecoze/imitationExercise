import patchVnode from "./patchVnode";
import createElement from "./createElement";
// 判断两个虚拟节点是否是同一个节点
function sameVnode(vNode1,vNode2){
    return vNode1.key === vNode2.key
}

/**
 * 
 * @param {*} parentElm 真实dom节点
 * @param {*} oldCh  旧的虚拟节点
 * @param {*} newCh   新的虚拟节点
 */

export default function updateChild( parentElm, oldCh, newCh ) {

    let oldStartIndex = 0;                  //旧前指针
    let oldEndIndex = oldCh.length -1;      //旧后指针
    let newStartIndex = 0;                  //新前指针
    let newEndIndex = newCh.length - 1;     //新后指针

    let oldStartNode = oldCh[0];
    let oldEndNode = oldCh[oldEndIndex];
    let newStartNode = newCh[0];
    let newEndNode = newCh[newEndIndex];

    while( oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex ){

        if( oldStartNode == undefined){
            oldStartNode = oldCh[++oldStartIndex];
        }else if ( oldEndNode == undefined){
            oldEndNode = oldCh[--oldEndIndex];
        }else if(  sameVnode(oldStartNode, newStartNode) ){
            //旧前 新前
            patchVnode( oldStartNode , newStartNode );
            if( newStartNode ) newStartNode.elm = oldStartNode?.elm; 


            oldStartNode = oldCh[++oldStartIndex];
            newStartNode = newCh[++newStartIndex];
        
        }else if( sameVnode(oldEndNode, newEndNode)  ){
            //旧后 新后
            patchVnode( oldEndNode , newEndNode );
            if( newEndNode ) newEndNode.elm = oldEndNode?.elm; 


            oldEndNode = oldCh[--oldEndIndex];
            newEndNode = newCh[--newEndIndex];
        
        }else if( sameVnode(oldStartNode, newEndNode) ){
            //旧前 新后
            patchVnode( oldStartNode , newEndNode );
            if( newEndNode ) newEndNode.elm = oldStartNode?.elm; 
            //把旧前指定的节点移动到旧后指向的节点后面
            parentElm.insertBefore(oldStartNode.elm,oldEndNode.elm.nextSibling);

            oldStartNode = oldCh[++oldStartIndex];
            newEndNode = newCh[--newEndIndex];
        
        }else if( sameVnode(oldEndNode, newStartNode) ){
            //旧后  新前
            patchVnode( oldEndNode , newStartNode );
            if( newStartNode ) newStartNode.elm = oldEndNode?.elm; 
            //把旧前指定的节点移动到旧前指向的节点前面
            parentElm.insertBefore(oldEndNode.elm,oldStartNode.elm);

            oldEndNode = oldCh[--oldEndIndex];
            newStartNode = newCh[++newStartIndex];
        }else {
            //前面几种都不符合 那新节点去旧节点中查找
            //创建一个对象，存在虚拟节点的（判断新旧有没有相同节点）
            const keyMap = {};
            for(let i = oldStartIndex;i<=oldEndIndex;i++) {
                const key = oldCh[i]?.key;
                if(key) keyMap[key] = i;
            }
            //在旧节点中查找新前指向的节点
            let idxInOld = keyMap[newStartNode.key];
            if( idxInOld ) {
                //如果有，说明该节在新旧节点中都存在
                const elmMove = oldCh[idxInOld];
                patchVnode(elmMove, newStartNode);
                //处理过的节点 在旧虚拟节点的数组中，设置为undefined
                oldCh[idxInOld] = undefined;
                parentElm.insertBefore(elmMove.elm, newStartNode.elm);
            }else {
                //没有找到 说明是一个新的节点【创建】
                parentElm.insertBefore( createElement(newStartNode), oldStartNode.elm )
            }
            //新数据指针 +1
            newStartNode = newChild[++newStartIndex];


        } 
    
    }

    //结束 while循环 只有两种情况 新增 和 删除
    if( oldStartIndex > oldEndIndex){
        const before = newCh[newEndIndex +1]? newCh[newEndIndex+1].elm : null;
        for(let i =newStartIndex;i<=newEndIndex;i++){
            parentElm.insertBefore(createElement(newCh[i]),before)
        }   
    }else {
        //进入删除操作
        for(let i = oldStartIndex; i <= oldEndIndex;i++){
            parentElm.removeChild(oldCh[i].elm)
        }
    }

}