/**
 * 因为过来的消息是这个格式 
 *       msgs:{"p2p-xsc":[{..},{..},{..}]}
 * 所以需要将其分类
 *           群聊                       单聊
 *  group1、group2...           friend1、friend2...
 * 
 */

import store from '../Store/store';


function classifyMsgs(msgs){
    switch(msgs){}
}