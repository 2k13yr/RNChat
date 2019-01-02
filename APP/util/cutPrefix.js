/**
 *  msgs的id有多种形式："p2p-xsc"、"team-xsc"
 *  因此需要用正则将 “ - ” 前的字符去掉，再对比
 */

function cutPrefix(msgId){
    let result = msgId.replace(/(p2p-)|(team-)/i,"")
    return result;
}

module.exports = cutPrefix