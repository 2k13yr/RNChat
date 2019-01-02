import { observable,decorate, action } from 'mobx';
import SDK from '../SDK/NIM_Web_SDK_rn_v5.6.0';
import storage from '../Storage/storage';
import global from '../Global/global'
import Realm from 'realm';
import store from '../Store/store'
import comparator from '../util/comparator';
import refreshContact from '../util/refreshContact';
import _init from './_init'
class Action {
    INIT(id,password,callback){     
        SDK.usePlugin({
            db: Realm,
        });  
        nim = SDK.NIM.getInstance({
        db : true,
        appKey: '5fea611469c0f5517860dcab029fc2f7',
        account: id,
        token: password,
        //customTag: 'TV',
        onconnect: this.onConnect,
        onerror: this.onError,
        onwillreconnect: this.onWillReconnect,
        ondisconnect: this.onDisconnect,
        // 多端登录
        onloginportschange: this.onLoginPortsChange,
        // 用户关系
        onblacklist: this.onBlacklist,
        onsyncmarkinblacklist: this.onMarkInBlacklist,
        onmutelist: this.onMutelist,
        onsyncmarkinmutelist: this.onMarkInMutelist,
        // 好友关系
        onfriends: this.onFriends,
        onsyncfriendaction: this.onSyncFriendAction,
        // 用户名片
        onmyinfo: this.onMyInfo,
        onupdatemyinfo: this.onUpdateMyInfo,
        onusers: this.onUsers,
        onupdateuser: this.onUpdateUser,
        // 机器人列表的回调
        onrobots: this.onRobots,
        // 群组
        onteams: this.onTeams,
        onsynccreateteam: this.onCreateTeam,
        onUpdateTeam: this.onUpdateTeam,
        onteammembers: this.onTeamMembers,
        //onsyncteammembersdone: onSyncTeamMembersDone,
        onupdateteammember: this.onUpdateTeamMember,
        // 群消息业务已读通知
        onTeamMsgReceipt: this.onTeamMsgReceipt,
        // 会话
        onsessions: this.onSessions,
        onupdatesession: this.onUpdateSession,
        // 消息
        onroamingmsgs: this.onRoamingMsgs,
        onofflinemsgs: this.onOfflineMsgs,
        onmsg: this.onMsg,
        // 系统通知
        onofflinesysmsgs: this.onOfflineSysMsgs,
        onsysmsg: this.onSysMsg,
        onupdatesysmsg: this.onUpdateSysMsg,
        onsysmsgunread: this.onSysMsgUnread,
        onupdatesysmsgunread: this.onUpdateSysMsgUnread, 
        onofflinecustomsysmsgs: this.onOfflineCustomSysMsgs,
        oncustomsysmsg: this.onCustomSysMsg,
        // 收到广播消息
        onbroadcastmsg: this.onBroadcastMsg,
        onbroadcastmsgs: this.onBroadcastMsgs,
        // 同步完成
        onsyncdone: function(){
            callback();
        },
        autoMarkRead:false
        });
        
    }
        onConnect() {
            //alert('连接成功');
        }
        onWillReconnect(obj) {
        // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
        alert('即将重连');
        //alert(obj.retryCount);
        //alert(obj.duration);
        }
        onDisconnect(error) {
        // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
        alert('丢失连接');
        alert(error);
        if (error) {
        switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
        break;
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
        break;
        default:
        break;
        }
        }
        }
        onError(error) {
        alert(error);
        }

        onLoginPortsChange(loginPorts) {
        alert('当前登录帐号在其它端的状态发生改变了'+JSON.stringify(loginPorts));
        }

        onBlacklist(blacklist) {
        //alert('收到黑名单'+JSON.stringify(blacklist));
        store.blacklist = nim.mergeRelations(store.blacklist, blacklist);
        store.blacklist = nim.cutRelations(store.blacklist, blacklist.invalid);

        }
        onMarkInBlacklist(obj) {
        alert(obj);
        alert(obj.account + '被你在其它端' + (obj.isAdd ? '加入' : '移除') + '黑名单');
        if (obj.isAdd) {
        addToBlacklist(obj);
        } else {
        removeFromBlacklist(obj);
        }
        }
        addToBlacklist(obj) {
        store.blacklist = nim.mergeRelations(store.blacklist, obj.record);

        }
        removeFromBlacklist(obj) {
        store.blacklist = nim.cutRelations(store.blacklist, obj.record);

        }

        onMutelist(mutelist) {
        //alert('收到静音列表'+JSON.stringify(mutelist));
        store.mutelist = nim.mergeRelations(store.mutelist, mutelist);
        store.mutelist = nim.cutRelations(store.mutelist, mutelist.invalid);

        }
        onMarkInMutelist(obj) {
        alert(obj);
        alert(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表');
        if (obj.isAdd) {
        addToMutelist(obj);
        } else {
        removeFromMutelist(obj);
        }
        }
        addToMutelist(obj) {
        store.mutelist = nim.mergeRelations(store.mutelist, obj.record);

        }
        removeFromMutelist(obj) {
        store.mutelist = nim.cutRelations(store.mutelist, obj.record);

        }


        onFriends(friends) {
        //alert('收到好友列表'+JSON.stringify(store.friends));
            store.friends = nim.mergeFriends(store.friends, friends);
            store.friends = nim.cutFriends(store.friends, friends.invalid);
            store.contacts = refreshContact(store.friends)
        }
        onSyncFriendAction(obj) {
        alert(obj);
        switch (obj.type) {
        case 'addFriend':
        alert('你在其它端直接加了一个好友' + obj.account + ', 附言' + obj.ps);
        onAddFriend(obj.friend);
        break;
        case 'applyFriend':
        alert('你在其它端申请加了一个好友' + obj.account + ', 附言' + obj.ps);
        break;
        case 'passFriendApply':
        alert('你在其它端通过了一个好友申请' + obj.account + ', 附言' + obj.ps);
        onAddFriend(obj.friend);
        break;
        case 'rejectFriendApply':
        alert('你在其它端拒绝了一个好友申请' + obj.account + ', 附言' + obj.ps);
        break;
        case 'deleteFriend':
        alert('你在其它端删了一个好友' + obj.account);
        onDeleteFriend(obj.account);
        break;
        case 'updateFriend':
        alert('你在其它端更新了一个好友', obj.friend);
        onUpdateFriend(obj.friend);
        break;
        }
        }
        onAddFriend(friend) {
            //alert(JSON.stringify(store.friends))
            store.friends = nim.mergeFriends(store.friends, friend);
            store.contacts = refreshContact(store.friends)
        }
        onDeleteFriend(account) {
            //alert(JSON.stringify(store.friends))
            store.friends = nim.cutFriendsByAccounts(store.friends, account);
            store.contacts = refreshContact(store.friends)
        }
        onUpdateFriend(friend) {
            store.friends = nim.mergeFriends(store.friends, friend);
            store.contacts = refreshContact(store.friends)      
        }


        onMyInfo(user) {
        //alert('收到我的名片'+JSON.stringify(user));
        store.myInfo = user;
        }
        onUpdateMyInfo(user) {
        //alert('我的名片更新了'+JSON.stringify(user));
            store.myInfo = SDK.NIM.util.merge(store.myInfo, user);
        }
        onUsers(users) {
        //alert('收到用户名片列表'+JSON.stringify(users));
        store.users = nim.mergeUsers(store.users, users);
        }
        onUpdateUser(user) {
        //alert('用户名片更新了'+JSON.stringify(user));
        store.users = nim.mergeUsers(store.users, user);
        
        }
        onRobots (robots) {
        // 客户私有化方案不支持
        //alert('收到机器人列表'+JSON.stringify(robots));
        store.robots = robots;
        }
        onTeams(teams) {
            //alert('群列表'+JSON.stringify(teams));
            store.teams = nim.mergeTeams(store.teams, teams);
            (function onInvalidTeams(teams) {
                store.teams = nim.cutTeams(store.teams, teams);
                store.invalidTeams = nim.mergeTeams(store.invalidTeams, teams);
        
            })(teams.invalid)
        }
        // onInvalidTeams(teams) {
        // store.teams = nim.cutTeams(store.teams, teams);
        // store.invalidTeams = nim.mergeTeams(store.invalidTeams, teams);

        // }
        onCreateTeam(team) {
        //alert('你创建了一个群'+JSON.stringify(team));
        store.teams = nim.mergeTeams(store.teams, team);

        onTeamMembers({
        teamId: team.teamId,
        members: owner
        });
        }

        onTeamMembers(teamId, members) {
        //alert('群id'+JSON.stringify(teamId)+'群成员'+JSON.stringify(members));
        var teamId = obj.teamId;
        var members = obj.members;
        store.teamMembers = store.teamMembers || {};
        store.teamMembers[teamId] = nim.mergeTeamMembers(store.teamMembers[teamId], members);
        store.teamMembers[teamId] = nim.cutTeamMembers(store.teamMembers[teamId], members.invalid);

        }
        // onSyncTeamMembersDone() {
        // alert('同步群列表完成');
        // }
        onUpdateTeam (team) {
        //alert('群状态更新'+JSON.stringify(team))
        }
        onUpdateTeamMember(teamMember) {
        //alert('群成员信息更新了'+JSON.stringify(teamMember));
        onTeamMembers({
        teamId: teamMember.teamId,
        members: teamMember
        });
        }

        onTeamMsgReceipt (teamMsgReceipts) {
        //alert('群消息已读通知'+JSON.stringify(teamMsgReceipts))
        }

        onSessions(sessions) {
            //alert('收到会话列表'+JSON.stringify(sessions));
            store.sessions = nim.mergeSessions(store.sessions, sessions);

        }
        onUpdateSession(session) {
            store.sessions = nim.mergeSessions(store.sessions, session);
        }


        onRoamingMsgs(obj) {
            alert('漫游消息'+JSON.stringify(obj));
            if (!Array.isArray(obj.msgs)) { obj.msgs = [obj.msgs]; }
            var sessionId = obj.msgs[0].sessionId;
            store.msgs = store.msgs || {}; 
            store.msgs[sessionId] = nim.mergeMsgs(store.msgs[sessionId], obj.msgs);

        }
        onOfflineMsgs(obj) {
            alert('离线消息'+JSON.stringify(obj));
            if (!Array.isArray(obj.msgs)) { obj.msgs = [obj.msgs]; }
            var sessionId = obj.msgs[0].sessionId;
            store.msgs = store.msgs || {}; 
            store.msgs[sessionId] = nim.mergeMsgs(store.msgs[sessionId], obj.msgs);
        }
        onMsg(msg) {
            if(store.msgs!=null){
                store.msgs.push(msg)  
            }
            // if (!Array.isArray(msg)) { msg = [msg]; }
            // var sessionId = msg[0].sessionId;
            // store.msgs = store.msgs || {};  
            // store.msgs[sessionId] = nim.mergeMsgs(store.msgs[sessionId], msg);
            // //因为出来之后是一个数组，需要把数组外壳去掉，取里面的元素
            // // msg.forEach(element => {
            // //     store.msgs.push(element)
            // // })
            // store.msgs.concat(msg)
            // alert(JSON.stringify(msg))
        }
        onBroadcastMsg(msg) {
            alert('收到广播消息'+JSON.stringify(msg));
        }
        onBroadcastMsgs(msgs) {
            alert('收到广播消息列表'+JSON.stringify(msgs));
        }
        pushMsg(msgs) {
            if (!Array.isArray(msgs)) { msgs = [msgs]; }
            var sessionId = msgs[0].sessionId;
            store.msgs = store.msgs || {}; 
            store.msgs[sessionId] = nim.mergeMsgs(store.msgs[sessionId], msgs);
        }

        onOfflineSysMsgs(sysMsgs) {
            //alert('收到离线系统通知'+JSON.stringify(sysMsgs));
            store.sysMsgs = nim.mergeSysMsgs(store.sysMsgs, sysMsgs);
        }
        onSysMsg(sysMsg) {
            store.sysMsgs = nim.mergeSysMsgs(store.sysMsgs, sysMsg);
            //
           if(sysMsg.type=='passFriendApply'){
                store.friends = nim.mergeFriends(store.friends, sysMsg.friend);
                store.contacts = refreshContact(store.friends)
           }else if(sysMsg.type=='deleteFriend'){
                store.friends = nim.cutFriendsByAccounts(store.friends, sysMsg.from);
                store.contacts = refreshContact(store.friends) 
            }
        }
        onUpdateSysMsg(sysMsg) {
            store.sysMsgs = nim.mergeSysMsgs(store.sysMsgs, sysMsg);
        }
        pushSysMsgs(sysMsgs) {
            store.sysMsgs = nim.mergeSysMsgs(store.sysMsgs, sysMsgs);
        } 
        onSysMsgUnread(obj) {
            //alert('收到系统通知未读数'+JSON.stringify(obj));
            store.sysMsgUnread = obj;
        }
        onUpdateSysMsgUnread(obj) {
            //alert('系统通知未读数更新了'+JSON.stringify(obj));
            store.sysMsgUnread = obj;
        }

        onOfflineCustomSysMsgs(sysMsgs) { 
            //alert('收到离线自定义系统通知'+JSON.stringify(sysMsgs));
        }
        onCustomSysMsg(sysMsg) {
            //alert('收到自定义系统通知'+JSON.stringify(sysMsg));
        }


    
}
decorate(Action,{
    //store : observable,
    //-----------//
    onConnect : action,
    onError : action,
    onWillReconnect : action,
    onDisconnect : action,
    onLoginPortsChange : action,
    onBlacklist : action,
    onMarkInBlacklist : action,
    onMutelist : action,
    onMarkInMutelist : action,
    onFriends : action,
    onSyncFriendAction : action,
    onMyInfo : action,
    onUpdateMyInfo : action,
    onUsers : action,
    onUpdateUser : action,
    onRobots : action,
    onTeams : action,
    onCreateTeam : action,
    onUpdateTeam : action,
    onTeamMembers : action,
    onUpdateTeamMember : action,
    onTeamMsgReceipt : action,
    onSessions : action,
    onUpdateSession : action,
    onRoamingMsgs : action,
    onOfflineMsgs : action,
    onMsg : action,
    onOfflineSysMsgs : action,
    onSysMsg : action,
    onUpdateSysMsg : action,
    onSysMsgUnread : action,
    onUpdateSysMsgUnread : action, 
    onOfflineCustomSysMsgs : action,
    onCustomSysMsg : action,
    onBroadcastMsg : action,
    onBroadcastMsgs : action,
    onSyncDone : action,
})
export default new Action();


