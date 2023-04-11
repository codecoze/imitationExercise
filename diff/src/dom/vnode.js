/**
 * 
 * @param {*} sel  tagName
 * @param {*} data  
 * @param {Array} children  子元素
 * @param {String} text  节点内容
 * @param {domNode} elm 节点内容
 * @returns 
 */
export default function ( sel, data,children,text,elm) {
    let key = data.key;
    return {
        sel, 
        data,
        key,
        children,
        text,
        elm
    }
}