/*
    四个主要页面顶部的标题栏
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class titleBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show:false
        };
    };
    _plus(){
        this.state.show==true?
        this.setState({
            show:false
        })
        :
        this.setState({
            show:true
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.weChat}>
                        微信
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Icon name='search' size={28} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._plus.bind(this)}>
                        <Icon name='add' size={28} color='white' />
                    </TouchableOpacity>
                    {
                        this.state.show==true?
                        <View style={styles.position}>
                        <TouchableNativeFeedback>
                            <View style={styles.item}>
                                <Text style={styles.txt}>发起群聊</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.item}>
                                <Text style={styles.txt}>添加好友</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.item}>
                                <Text style={styles.txt}>扫一扫</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.item}>
                                <Text style={styles.txt}>帮助与反馈</Text>
                            </View>
                        </TouchableNativeFeedback>
                        </View>
                        :null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'stretch',
        justifyContent:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    textContainer:{
        flex: 2,
        justifyContent:'center',
        paddingLeft: 20,
    },
    buttonContainer:{

        flex: 1,    
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center'
    },
    weChat:{
        color: 'white',
        fontSize: 18,
        fontWeight: '200',
    },
    position:{
        position: 'absolute',
        backgroundColor:'#171717',
        bottom:-160,
        right:10,
        zIndex:99
    },
    item:{
        width:140,
        height:40,
        lineHeight:40,
        borderBottomWidth:1/PixelRatio.get(),
        borderColor:'#000',
        justifyContent:'center',
        alignItems: 'center',
    },
    txt:{
        color:'#fff',
        fontSize:16,
        fontWeight:'400'
    }
});

module.exports = titleBar