/*
    聊天时候最下方的软键盘
    
*/
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    PixelRatio,
    TouchableOpacity,
    Image,
    TouchableNativeFeedback,
    DeviceEventEmitter,
    Keyboard
} from 'react-native';
import PressSendVoice from './pressSendVoice';
import ChatKeyBoardMore from './chatKeyboard_more'; 
import SendButton from './sendButton';
import _init from '../Action/_init';
import Action from '../Action/INIT'
import store from '../Store/store';

class chatKeyboard extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = { 
            keyboard_voice: 'voice', //keyboard
            more: 'hide', //show
            contents: '' ,  //输入框输入的内容 
            value:null
        };
        this._keyboardOrvoice = this._keyboardOrvoice.bind(this);
        this._more = this._more.bind(this);
        this._hideMoreAndEmoji = this._hideMoreAndEmoji.bind(this);
        this._handleSend = this._handleSend.bind(this);
        this.sendMsgDone = this.sendMsgDone.bind(this)
    }
    //
      
    _handleSend(){  
        let msg = _init().sendText({
            scene: 'p2p',
            to: this.props.toName,
            text: this.state.contents,
            done: this.sendMsgDone
        });   
    }
    sendMsgDone(error, msg) {
        store.msgs.push(msg)
        this.clearInput.clear();
        this.setState({
            contents : ''
        })
        //发送事件到chatDetailScreen，触发scrollToEnd方法
    }
    //初始化情况下是语音icon，此时可以使用keyboard，
    //当点击了按钮之后将keyboard隐藏，显示语音
    _keyboardOrvoice(){
        if(this.state.keyboard_voice == 'voice'){
            this.setState({keyboard_voice:'keyborad'})
        }else{
            this.setState({keyboard_voice:'voice'})
        }
    }  
    _hideMoreAndEmoji(){
        if(this.state.more == 'show'){
            this.setState({more:'hide'})
        } 
    }  
    _more(){ 
        
        if(this.state.more == 'show'){
            this.setState({more:'hide'})
        }else{
            this.setState({more:'show'})
        }       
    }
    // 
    render(){
        return(
            <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={this._keyboardOrvoice}>
                    {
                        this.state.keyboard_voice == 'voice'?
                        <View style={styles.iconContainer} >
                        <Image 
                            source={require('../../assets/images/icon/chat_sound.png')}
                            style={styles.icon}
                        />
                        </View> :
                        <View style={styles.iconContainer} >
                        <Image 
                            source={require('../../assets/images/icon/chat_keyboard.png')}
                            style={styles.icon}
                        />
                        </View>
                    }
                </TouchableOpacity>              
                {
                    this.state.keyboard_voice == 'voice'?
                    <TextInput 
                        style={styles.textInput} 
                        multiline={true} 
                        onFocus={this._hideMoreAndEmoji}
                        onChangeText={(text)=>this.setState({contents:text})}
                        ref={(ref)=>this.clearInput = ref}
                    />:
                    <PressSendVoice  />
                }
                <TouchableOpacity>
                    <View style={styles.iconContainer} >
                        <Image 
                            source={require('../../assets/images/icon/chat_emoji.png')}
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
                {
                    this.state.contents == ''?
                    <TouchableOpacity 
                        onPress={this._more}
                        onPressIn={Keyboard.dismiss}
                    >
                        <View style={styles.iconContainer} >
                            <Image 
                                source={require('../../assets/images/icon/chat_add.png')}
                                style={styles.icon}
                            />  
                        </View>  
                    </TouchableOpacity> :
                    <SendButton handleSend={this._handleSend} />
                }
                
            </View>
            {
                this.state.more =='show'?
                <ChatKeyBoardMore pickPicktrue={this.props.pickPicktrue} scan={this.props.scan} shop={this.props.shop} />:null
            } 
            </View> 
        )
    }
}  
  
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',       
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#F6F6F6',
        paddingLeft: 10,
        paddingRight: 10,
    },
    textInput:{
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#00d205',
        fontSize: 15,
        margin: 5,
        paddingBottom: 0,
    },
    iconContainer:{
        flex: 1,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    icon:{
        height:32, 
        width:32,
        
    }
})

module.exports = chatKeyboard;