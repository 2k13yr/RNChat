/**
 * 我的个人资料页面
 */
import React, { Component } from 'react';
import {
    View,
    TouchableNativeFeedback,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    DeviceEventEmitter,
    Modal,
    Dimensions
} from 'react-native'
import ChatBackBar from '../Components/chatBackBar';
import _init from '../Action/_init';
import store from '../Store/store';
import DrawMenu from '../Components/drawMenu';
//import ImagePicker from 'react-native-image-crop-picker';
import Action from '../Action/INIT';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class MyInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar : null,
            nick : null,
            gender : null,
            account : null,
            radio_props : [
                {label: '男', value: 0 },
                {label: '女', value: 0 },
                {label: '保密', value: 1 }
            ],
            show : false,
            isModal : false
        }
        this._Back = this._Back.bind(this)
        this._hide = this._hide.bind(this)
        this._pickPictrue = this._pickPictrue.bind(this)
        this.updateMyInfoDone = this.updateMyInfoDone.bind(this)
    }
    _Back(){
        this.props.navigation.goBack();
    }
    _toUpdateNick(){
        this.props.navigation.navigate('UpdateNick',{
            nick : this.state.nick
        })
    }
    _toUpdateSign(){
        this.props.navigation.navigate('UpdateNick',{
            sign : this.state.sign
        })
    }
    _hide(){
        this.setState({
            show : false
        })
    }
    chose(){
        this.state.radio_props.forEach(element => {
            
        })

        this.setState({
            isModal : false
        })  
    }
    //修改头像
    _pickPictrue(){
        ImagePicker.openPicker({
            width: 70,
            height: 70,
            cropping: true,
            includeBase64: true  
        }).then(image => {
            this._hide()             
            fetch('http://120.78.223.192/uploadAvatar',{
                method : 'POST',
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                },
                body : '{"content":"'+image.data+'"}'
            }).then((ret)=>{  
                alert(JSON.stringify(ret)) 
                _init().updateMyInfo({
                    avatar: JSON.parse(ret._bodyInit).url,
                    done: this.updateMyInfoDone
                }); 
            }).catch((err)=>{
                alert('这是修改出错'+JSON.stringify(err))
                this._hide()  
            }) 
        }).catch((err)=>{
            alert('这是选图出错'+JSON.stringify(err))
            this._hide() 
        })                  
    }
    updateMyInfoDone(error, user) {
        if(!error){
            this.setState({
                avatar : {uri:user.avatar}
            })
        }
    }
    componentWillMount() {
        this.setState({
            avatar : store.myInfo.avatar?{uri:store.myInfo.avatar}:require('../../assets/images/myAvatar.jpg'),
            account : store.myInfo.account,
            nick : store.myInfo.nick,
            gender : store.myInfo.gender=='unknown'?'未知': store.myInfo.gender,
            sign : store.myInfo.sign?store.myInfo.sign:'未填写'
        })
    }
    componentDidMount() {
        DeviceEventEmitter.addListener('refreshInfo',param => {
            this.setState({
                avatar : store.myInfo.avatar,
                account : store.myInfo.account,
                nick : store.myInfo.nick,
                gender : store.myInfo.gender=='unknown'?'未知': store.myInfo.gender,
                sign : store.myInfo.sign?store.myInfo.sign:'未填写'
            })
            DeviceEventEmitter.emit('updateMyInfo',()=>{})
        })
    }
    componentWillUnmount(){
        DeviceEventEmitter.removeListener('refreshInfo')
    }
    
    render(){
        return(
            <View style={styles.container}>
                <ChatBackBar name='个人信息' goBack={this._Back} />
                {
                    this.state.isModal==true?
                    <Modal
                        transparent = {true}
                        onRequestClose={()=> {this.setState({isModal:false})}}
                    >
                        <View style={styles.loading}>
                            <View style={styles.box}>
                                <Text style={{fontSize:18}}>性别</Text>
                                <RadioForm
                                    radio_props={this.state.radio_props}
                                    initial={2}
                                    onPress={this.chose.bind(this)}
                                    buttonSize={15}
                                />
                            </View>
                        </View>
                    </Modal>
                    :null
                }
                {
                    this.state.show == true?
                    <DrawMenu
                        hide={this._hide} 
                        action1={this._pickPictrue} 
                        itemCount={1}
                    /> : null
                }
                <View style={styles.itemContainer}>
                        <TouchableHighlight onPress={()=>{ this.setState({show:true})}}>
                                <View style={styles.itemAvatar}>
                                    <Text style={{textAlign:'center'}}>
                                        头像
                                    </Text>
                                    <Image 
                                        source={this.state.avatar}
                                        style={{height:60,width:60}} 
                                    />                                
                                </View>
                        </TouchableHighlight>
                        <TouchableNativeFeedback onPress={this._toUpdateNick.bind(this)}>
                            <View style={styles.item}>
                                <Text>昵称</Text>   
                                <Text>{this.state.nick}</Text> 
                            </View> 
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback disabled={true}>
                            <View style={styles.item}>
                                <Text>微信号</Text>    
                                <Image 
                                    source={require('../../assets/images/icon/p_qr_code.png')}
                                    style={{height:30,width:30}}
                                />
                            </View>                         
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>this.setState({isModal:true})}>
                            <View style={styles.item}>
                                <Text>性别</Text>  
                                <Text>{this.state.gender}</Text>  
                                
                            </View> 
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this._toUpdateSign.bind(this)}>
                            <View style={styles.item}>
                                <Text>个性签名</Text>  
                                <Text style={styles.text}>{this.state.sign}</Text>  
                            </View>  
                        </TouchableNativeFeedback>
                        </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    itemContainer:{
        marginTop: 15,
    },
    item:{
        height: 45,
        backgroundColor:'#fff',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    itemAvatar:{
        backgroundColor:'#fff',
        justifyContent:'space-between',
        alignItems:'center',
        padding: 10,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    box:{
        width:Dimensions.get('window').width*0.6,
        height:Dimensions.get('window').width*0.5,
        backgroundColor:'#fff',
        justifyContent:'space-around',
        alignItems:'center'
    },
    text:{
        maxWidth:Dimensions.get('window')*0.6
    }
})



