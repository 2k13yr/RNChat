//用于保存所有的数据
import { observable,decorate,action } from 'mobx';

class Store{
    //用户ID
    account = null;
    //用户密码
    token = null;
    //黑名单
    blacklist = null;
    //静音列表
    mutelist = null;
    //好友列表
    friends = null;
    //联系人列表
    contacts = null;        //由于sectionlist的sections参数貌似不能是个函数，而数据又需要
                            //特殊处理后才能放进section，因此将新建多一个属性
    //我的名片
    myInfo = null;
    //用户列表
    users = null;
    //群列表
    teams = null;
    //群成员
    teamMembers = null;
    //会话列表
    sessions = null
    //消息列表
    msgs = null;
    //系统通知列表
    sysMsgs = null;
    //系统消息未读数
    sysMsgUnread = null;

    /**
     */
    reset(){
        //用户ID
        this.account = null;
        //用户密码
        this.token = null;
        //黑名单
        this.blacklist = null;
        //静音列表
        this.mutelist = null;
        //好友列表
        this.friends = null;
        //联系人列表
        this.contacts = null; 
        //我的名片
        this.myInfo = null;
        //用户列表
        this.users = null;
        //群列表
        this.teams = null;
        //群成员
        this.teamMembers = null;
        //会话列表
        this.sessions = null
        //消息列表
        this.msgs = null;
        //系统通知列表
        this.sysMsgs = null;
        //系统消息未读数
        this.sysMsgUnread = null;
    }
}
decorate(Store,{
    account : observable,
    token : observable ,
    blacklist: observable ,
    mutelist: observable , 
    friends: observable , 
    contacts: observable,
    myInfo: observable , 
    users: observable , 
    teams: observable , 
    teamMembers: observable ,
    sessions: observable ,
    msgs: observable ,
    sysMsgs: observable ,
    sysMsgUnread: observable ,
    //----------//
    reset : action
})

export default new Store()