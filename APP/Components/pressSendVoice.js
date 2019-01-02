/*
    软键盘栏中的长按发送语音组件
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import Toast , { DURATION } from 'react-native-easy-toast';

export default class PressSendVoice extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(
            <TouchableOpacity
                onPress={()=>{alert('点击')}}
                onLongPress={()=>{alert('长按')}}
                style={styles.container} 
            >
                <View style={styles.textContainer}> 
                    <Text style={styles.text}>
                        长按发送语音
                    </Text>
                
                </View>
            <Toast 
                    ref='toast' 
                    opacity={0.7}
            />
            </TouchableOpacity>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderColor: '#ebebeb',
        marginLeft: 5,
        marginRight: 5,
        height:50,
        justifyContent:'center',
        alignItems: 'center',
    },
    textContainer:{
        height:32,  
        width:200,    
        alignItems:'center',
        justifyContent:'center',
        alignContent: 'stretch',
        borderWidth:1/PixelRatio.get(),
        borderColor : '#DFDFDF',
    },
    text:{
        textAlign:'center',
    }
})