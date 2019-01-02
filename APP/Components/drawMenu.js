/*
    底部抽屉菜单，用于点击 “更多” 时 ，显示 “删除好友”
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    Button,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    PixelRatio
} from 'react-native';

export default class DrawMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
        };
    }

    render(){
        return(
            <Modal
                transparent={true}
                onRequestClose={this.props.hide}
            >
                <View style={styles.container}>
                    {
                        this.props.itemCount == 2?
                        <View style={styles.itemContainer}>
                        <TouchableHighlight 
                            onPress={this.props.action1}
                            underlayColor='#ebebeb'
                            activeOpacity={0.5}
                        >
                            <Text style={styles.item}>
                                设置备注
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={this.props.action2}
                            underlayColor='#ebebeb'
                            activeOpacity={0.5}
                        >
                            <Text style={styles.itemD}>
                                删除好友
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={this.props.hide}
                            underlayColor='#ebebeb'
                            activeOpacity={0.5}
                        >
                            <Text style={styles.item}>取消</Text>
                        </TouchableHighlight>
                        </View>
                        :
                        <View style={styles.itemContainer}>
                        <TouchableHighlight 
                            onPress={this.props.action1}
                            underlayColor='#ebebeb'
                            activeOpacity={0.5}
                        >
                            <Text style={styles.item}>
                                从相册选择照片
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={this.props.hide}
                            underlayColor='#ebebeb'
                            activeOpacity={0.5}
                        >
                            <Text style={styles.item}>取消</Text>
                        </TouchableHighlight>
                    </View>
                    }
                </View>    
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    itemContainer:{
        backgroundColor:'#fff',
        justifyContent:'center',
    },
    itemD:{
        textAlign:'center',
        height:50,
        lineHeight:50,
        fontSize: 18,
        color:'red',
        borderBottomWidth:1,
        borderColor: '#ebebeb',
    },
    item:{
        textAlign:'center',
        height:50,
        lineHeight:50,
        fontSize: 18,
        borderBottomWidth:1,
        borderColor: '#ebebeb',
    }
})