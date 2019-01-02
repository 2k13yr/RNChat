/*
    初始化部分，只将部分需要初始时处理的函数放在该文件里面
    其他的例如添加好友、会话更新，全都分开处理
*/
import SDK from '../SDK/NIM_Web_SDK_rn_v5.6.0';
import global from '../Global/global';
import store from '../Store/store'
function _init(){
    var nim = SDK.NIM.getInstance({ 
        appKey: '5fea611469c0f5517860dcab029fc2f7',
        account: global.id, 
        token: global.password, 
    });
    return nim
}
    
    


module.exports = _init;