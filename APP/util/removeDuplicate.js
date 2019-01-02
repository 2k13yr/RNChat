/**
 * 将通知去重，
    1、通知数组循环一遍，与新数组对比一遍，如果新数组中没有该元素，则添加进去
    2、直接将数组初始化为Set(ES6)
 */
// let a =[
//     {"to":"xsc1","from":"xsc3"},
//     {"to":"xsc1","from":"xsc4"},
//     {"to":"xsc2","from":"xsc3"},
//     {"to":"xsc3","from":"xsc3"},
//     {"to":"xsc1","from":"xsc1"}
// ]


function removeDuplicate(arr){
    let hash = [];  
    for(let i=0;i<arr.length;i++){
        let k=0;
        if(!hash.length){
            hash.push(arr[0]);
            continue;
        }
        for(let n=0;n<hash.length;n++){
            if(arr[i].from == hash[n].from){
               k++; 
            }
        }
        if(k==0) hash.push(arr[i])
    }
    return hash;
}
//console.log(removeDuplicate(a));
module.exports = removeDuplicate