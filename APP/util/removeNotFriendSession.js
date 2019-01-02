/**
 * 因为在添加好友之后会向请求方发送一条信息，然后双方会生成一个会话
 * 在删除好友之后，将被操作的这个用户的会话和通知都删除了，但是对方
 * 的会话还在，因此需要在渲染会话列表时加一层判断，是否是好友关系，不是的话就
 * 不渲染
 */


 function isFriendSession(friends,sessions){
        let arr = [];
        friends.forEach(friend => {
            sessions.forEach(session => {
                if(friend.account == session.to){
                    arr.push(session);
                }
            })
        });
        return arr.reverse();
 }

 module.exports = isFriendSession;