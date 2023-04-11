import h  from "./dom/h.js";
import patch from "./dom/patch.js";

let vnode1 = h('ul',{},[
    h('li',{key: 'a'},'a'),
    h('li',{key: 'b'},'b'),
    h('li',{key: 'c'},'c'),
    h('li',{key: 'd'},'d'),
]);
//  console.log(vnode1);

let vnode2 = h('ul',{},[
    h('li',{key: 'a'},'a'),
    h('li',{key: 'd'},'d'),
    h('li',{key: 'b'},'b'),
    h('li',{key: 'c'},'c'),
]);

let container = document.getElementById('container');
// console.log(container);

let button = document.getElementById('button');

patch( container, vnode1)

// console.log(vnode2)

button.onclick = function(){
    patch( vnode1 , vnode2)

}