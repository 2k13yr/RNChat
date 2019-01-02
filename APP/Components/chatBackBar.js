/*
    聊天的时候顶部带返回按键的标题栏

*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class chatBackBar extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
    }

    
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.goBack} >
                    <View style={styles.icon} >
                        <Icon name='arrow-left' size={25} color='#fff' />
                    </View>                   
                </TouchableOpacity>
                <Text style={styles.text}>
                    {this.props.name}
                </Text>
                {
                    this.props.needMore==true?
                    <TouchableOpacity onPress={this.props.more} >
                        <View style={styles.icon} >
                            <Icon name='dots-vertical' size={25} color='#fff' />
                        </View>                   
                    </TouchableOpacity> :null
                }  
                {
                    this.props.needSave==true?
                    <TouchableNativeFeedback onPress={this.props.save}>
                        <Text style={{color:'#00d205',marginRight:15,fontSize:18}}>保存</Text>              
                    </TouchableNativeFeedback>
                    :null
                }       
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.9)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    icon:{
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    text:{
        paddingLeft: 5,
        flex: 2,
        color: '#fff',
        fontSize: 18,
        height: 23,
        overflow: 'hidden',
    },
    position:{
        position:'absolute',
        right:0,
        bottom:-100,
        width:120,
        zIndex:99,
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    options:{
        color:'#fff',
        height:50,
        textAlign:'center',
        lineHeight:50,
        fontSize:16,
        fontFamily: 'Georgia',
        fontWeight: '400',
        backgroundColor: 'rgba(0,0,0,0.9)',
    }
})

module.exports = chatBackBar