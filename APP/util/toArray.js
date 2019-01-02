/**
 * 由于mobx observe的变量并不是普通的array对象，而是observeArray，用isArray()
 * 是返回false的，而flatlist又是需要普通Array，因此需要将数据转化成普通Array
 */

function toArray(param){
    
}

module.exports = toArray;