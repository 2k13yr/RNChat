/*
    组件
    该组件表示：主页面与联系人的每一条聊天记录
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    TouchableOpacity,
    Dimensions
} from 'react-native';

class chatRecord extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
        const height = Dimensions.get('screen').height;
        const width = Dimensions.get('screen').width;
        // Nexus 5/6.0.0/1080x1920  的像素密度为640x360
    }
    render(){
        return(
            <TouchableOpacity onPress={this.props.handleClick} >
                <View style={styles.container} >
                    <Image 
                        source={this.props.avatar} 
                        style={styles.avatar}
                    />
                    <View style={styles.info}>
                        <View>
                            <Text style={styles.name}>
                                {this.props.name}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.newRecord}>
                                {this.props.newRecord}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.time}>
                        <Text style={{textAlign:'center'}} >
                            {this.props.time}
                        </Text>
                        {
                            this.props.unread>0?
                            <View style={styles.unRead}>
                                <Text style={{color:'#fff',fontWeight:'bold',fontSize:12}}>
                                    {this.props.unread}
                                </Text>
                            </View>
                            :
                            <View>
                                <Text style={{color:'#fff',fontWeight:'bold',fontSize:12}}>
                                    {/* 保持当没有unread时，时间那一栏不坍塌 */}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',   //沿水平轴排序
        padding: 5,     
        borderBottomWidth: 2/PixelRatio.get(),
        borderColor: 'lightgray',
        height: 70*(640/Dimensions.get('screen').height),
        backgroundColor:'#fff'
    },
    avatar:{
        height:55,
        flex: 0.75,

    },
    info:{
        flex: 3,

        paddingLeft: 4,
    },
    time:{
        flex: 0.75,
        color: 'lightgray',
        fontSize:13,
        justifyContent:'space-around',
        alignItems:'center'
        
    },
    name:{
        fontSize: 20,
        fontWeight: '400',
        overflow:'hidden',
        height: 25,
        marginBottom: 6,
        marginLeft:8
    },
    newRecord:{
        fontSize:15,
        color: '#696969',
        overflow:'hidden',
        height:20,
        marginLeft:8
    },
    unRead:{
        height:20,
        width:20,
        borderRadius: 50,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: 15,
    },
})


module.exports = chatRecord