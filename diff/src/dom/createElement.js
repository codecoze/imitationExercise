/**
 * 
 * @param {*} vnode 需要创建的虚拟节点 
 */
export default function createElement( vnode) {
    let domNode = document.createElement( vnode.sel );

    //判断有没有children
    if( vnode.children == undefined ){
        domNode.innerText = vnode.text;
    }else if( Array.isArray(vnode.children)){ //新的节点 有子节点
        for(let child of vnode.children){
            let childDom = createElement(child);
            domNode.appendChild(childDom);
        }

    }

    vnode.elm = domNode;
    return domNode;

}