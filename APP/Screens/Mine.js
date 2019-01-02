/*
    个人中心页面
*/
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import TitleBar from "../Components/titleBar";
import Options from '../Components/options';
import MyInfoEntry from '../Components/myInfoEntry';
import Setting from '../Screens/setting';
import FirstPage from './firstPage';
import Register from './register';
import Login from './tokenLogin';
import storage from '../Storage/storage';
import SDK from '../SDK/NIM_Web_SDK_rn_v5.6.0';
import global from '../Global/global';
import store from '../Store/store';

export default class Mine extends React.Component{
    constructor(props){ 
        super(props);
        this.state = {
            name: '',
            id: '',
            avatar : null,
        };
        this._toSetting = this._toSetting.bind(this);  
    }
    componentWillMount() {
        this.setState({
            name : store.myInfo.nick,
            id : store.myInfo.account
        })
    }
    componentDidMount() {
        DeviceEventEmitter.addListener('updateMyInfo',param => {
            this.setState({
                avatar : store.myInfo.avatar,
                id : store.myInfo.account,
                name : store.myInfo.nick,
            })
        })
    }
    componentWillUnmount(){
        DeviceEventEmitter.removeListener('updateMyInfo')
    }
    _toSetting(){
        this.props.navigation.navigate('Setting')
    }
    _toMyInfo(){
        this.props.navigation.navigate('MyInfo')
    }
    //
    render(){ 
        return(
            
            <View style={styles.container}>    
                <View style={styles.optionContainer}>
                    <MyInfoEntry 
                        avatarName={require('../../assets/images/myAvatar.jpg')}
                        name={this.state.name}
                        id={this.state.id}
                        qrCodeName={require('../../assets/images/icon/p_qr_code.png')}
                        myInfo={this._toMyInfo.bind(this)}
                    />
                </View>     
                <View style={styles.optionContainer}>
                    <TouchableOpacity>
                        <Options 
                            tagName='钱包'
                            imgName={require('../../assets/images/icon/p_wallet.png')}
                        />
                    </TouchableOpacity>
                </View> 

                <View style={styles.optionContainer}>
                    <TouchableOpacity>
                        <Options 
                            tagName='收藏'
                            imgName={require('../../assets/images/icon/p_collect.png')}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Options 
                            tagName='相册'
                            imgName={require('../../assets/images/icon/p_gallery.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Options 
                            tagName='卡包'
                            imgName={require('../../assets/images/icon/p_kabao.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Options 
                            tagName='表情'
                            imgName={require('../../assets/images/icon/p_emoji.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.optionContainer}>
                        <TouchableOpacity>
                            <Options 
                                tagName='设置'
                                imgName={require('../../assets/images/icon/p_settings.png')}
                                handleClick={this._toSetting}
                            />
                        </TouchableOpacity>
                    </View>
                    
                </View>          
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
    optionContainer:{
        marginTop: 15,      
    }
})