/*
    刷新联系人列表
*/
import comparator from '../util/comparator';
function refreshContact(friends){
    let friendsName = [];
        if(friends!=null){
            friends.forEach(element => {
                friendsName.push(element.account)
            })
    }
    return comparator(friendsName);
}

module.exports = refreshContact
