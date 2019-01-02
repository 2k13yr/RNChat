/*
    普通登录页面
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Image,
    Text,
    Dimensions,
    Button,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    DeviceEventEmitter,
    Modal,
    ProgressBarAndroid
} from 'react-native';
import ChatBackBar from '../Components/chatBackBar';
import Toast , { DURATION } from 'react-native-easy-toast';
import RootTabNavigator from '../Components/tabNavigator';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);  
import Loading from '../Components/loading';  
import storage from '../Storage/storage';
import global from '../Global/global';
import Action from '../Action/INIT';
import store from '../Store/store';
import LoadingView from '../Components/loadingView'

export default class Register extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            password: '',
            toRegister:false,
            isModal : false
        } 
        this._Back = this._Back.bind(this)
        this._login = this._login.bind(this)
        this._toRegister = this._toRegister.bind(this);
        this._showModal = this._showModal.bind(this);
        this._onRequestClose = this._onRequestClose.bind(this)
    }    
    _toRegister(){
        this.props.navigation.navigate('Register');
    }
    _Back(){
        this.props.navigation.goBack();
    }
    _showModal(){
        this.setState({
            isModal : true
        })
    }
    _onRequestClose(){
        this.setState({
            isModal : false
        })
    }
    _login(){
        let id = this.state.id;
        let password = this.state.password;
        this._showModal()   
        fetch('http://120.78.223.192/login',{  
            method : 'POST',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            },
            body : '{"id":"'+id+'","password":"'+password+'"}'
        }).then((res)=>{
            switch(res._bodyText){
                case '微信号不存在，是否现在注册？':
                this._onRequestClose()
                this.refs.toast.show('微信号不存在，是否现在注册？');
                this.setState({toRegister:true})  
                break; 
 
                case '微信号或密码错误！请重新输入':
                this._onRequestClose()
                this.refs.toast.show('微信号或密码错误！请重新输入');
                break;
  
                case '登录成功': 
                //将ID和密码存入store和global，
                //存入global是为了下次登录时不需要重新输入账密
                store.account = id;
                store.token = password;
                //
                global.id = id;
                global.password = password;  
                //  
                storage.save({
                    key : 'autoLogin',
                    data : {
                        _id : id,
                        _password : password
                    }
                })          
                Action.INIT(id,password,()=>{
                    this._onRequestClose()
                    this.props.navigation.navigate('RootTabNavigator'); 
                });                                                 
                break;
            }
        }).catch((err)=>{ 
            this._onRequestClose()
            this.refs.toast.show('登录失败',1*1000)            
        })
            
    } 

    render(){
        return(           
             <KeyboardAvoidingView> 
             <ScrollView>    
            <View style={styles.container}> 
            {
                this.state.isModal == true?
                <LoadingView loadingText='登录中...' cancel={this._onRequestClose} />
                :null
            }
            <ChatBackBar name='登录' goBack={this._Back} />
                <Image 
                    source={require('../../assets/images/launcher.png')}
                    style={styles.img}
                    resizeMode='contain'
                />
                <View style={styles.allInput}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>微信号：</Text>
                        <TextInput 
                            style={styles.input}
                            //当从注册页跳转过来的时候将用户名传过来
                            //defaultValue={!this.props.navigation.state.params.name?null:this.props.navigation.state.params.name} 
                            onChangeText={(text)=>this.setState({id:text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>密码：</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={(text)=>this.setState({password:text})}
                            secureTextEntry={true}
                        />
                    </View>
                </View>   
                <View style={styles.btnContainer}>
                        <Button 
                            title='登录'
                            color='#00d205'
                            style={styles.btn}
                            onPress={this._login}
                        />  
                </View>    
                <TouchableOpacity
                    style={{marginTop:80}}
                    onPress={this._toRegister} 
                >
                    <Text style={{color:'#00d205'}}>
                        {this.state.toRegister==true?'前往注册':''}  
                    </Text>    
                </TouchableOpacity>
                                            
            </View>       
            </ScrollView> 
            <Toast 
                    ref='toast' 
                    opacity={0.7}
                />    
            </KeyboardAvoidingView> 
            
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#ebebeb',
        alignItems: 'center',
    },
    img:{
        marginTop: 100,
        height: 100,
        width: 100,
        marginBottom: 30,
    },
    inputContainer:{
        height: 45,
        borderColor: '#00d205',
        borderBottomWidth: 1,
        flexDirection: 'row',     
        alignItems: 'center',      
        width:Dimensions.get('screen').width*0.8,        
    },
    allInput:{
        marginBottom:20
    },
    input:{
        flex:1
    },
    btnContainer:{
        marginTop:15,
        width:Dimensions.get('screen').width*0.8,
    },
});




        