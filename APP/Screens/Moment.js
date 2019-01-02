/*
    发现页面
*/
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import TitleBar from "../Components/titleBar";
import Options from '../Components/options';
import Scan from './scan';
import Shopping from './shopping'

export default class Moment extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this._toScan = this._toScan.bind(this);
        this._toShopping = this._toShopping.bind(this)
    }
    //
    _toScan(){
        this.props.navigation.navigate('Scan')
    }
    _toShopping(){
        this.props.navigation.navigate('Shopping')
    }
    //
    render(){
        return(
            
            <View style={styles.container}>
                {/* <TitleBar />                */}
                    <View style={styles.optionContainer}>
                        <TouchableOpacity>
                            <Options 
                                tagName='朋友圈'
                                imgName={require('../../assets/images/icon/m_friends_circle.png')}
                            />
                        </TouchableOpacity>
                    </View>             
                
                    <View style={styles.optionContainer}>
                        <TouchableOpacity>
                            <Options
                                tagName='扫一扫'
                                imgName={require('../../assets/images/icon/m_scan.png')}
                                handleClick={this._toScan}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Options
                                tagName='摇一摇'
                                imgName={require('../../assets/images/icon/m_shake.png')}
                            />
                        </TouchableOpacity>
                    </View>              
                
                    <View style={styles.optionContainer}>
                        <TouchableOpacity>
                            <Options
                                tagName='附近的人'
                                imgName={require('../../assets/images/icon/m_nearby.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Options
                                tagName='漂流瓶'
                                imgName={require('../../assets/images/icon/m_bottle.png')}
                            />
                        </TouchableOpacity>
                    </View>              
                
                    <View style={styles.optionContainer}>
                        <TouchableOpacity>
                            <Options
                                tagName='购物'
                                imgName={require('../../assets/images/icon/m_shopping.png')}
                                handleClick={this._toShopping}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Options
                                tagName='游戏'
                                imgName={require('../../assets/images/icon/m_game.png')}
                            />
                        </TouchableOpacity>
                    </View>
                               
                    <View style={styles.optionContainer}>
                        <TouchableOpacity>
                            <Options
                                tagName='小程序'
                                imgName={require('../../assets/images/icon/m_program.png')}
                            />
                        </TouchableOpacity>
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