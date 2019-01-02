/*
    点击键盘中的+所显示的组件
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,Text
} from 'react-native';

export default class More extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={};

    }

    

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.half}>
                    <TouchableOpacity onPress={this.props.pickPictrue}>
                        <View style={styles.itemContainer}>
                            <Image 
                                source={require('../../assets/images/icon/chat_gallery.png')}
                                style={styles.item}
                                resizeMode='contain'
                            />
                        </View>
                        <Text style={styles.text}>相册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.scan} >
                        <View style={styles.itemContainer}>
                            <Image 
                                source={require('../../assets/images/icon/chat_movie.png')}
                                style={styles.item}
                                resizeMode='contain'
                            />
                        </View>
                        <Text style={styles.text}>拍摄</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.itemContainer}>
                            <Image 
                                source={require('../../assets/images/icon/chat_phone.png')}
                                style={styles.item}
                                resizeMode='contain'
                            />
                        </View>
                        <Text style={styles.text}>语音通话</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.itemContainer}>
                            <Image 
                                source={require('../../assets/images/icon/chat_position.png')}
                                style={styles.item}
                                resizeMode='contain'
                            />
                        </View>
                        <Text style={styles.text}>位置</Text>
                    </TouchableOpacity>
                </View>


                {/* */}
                <View style={styles.half}>
                    <TouchableOpacity onPress={this.props.shop} >
                    <View style={styles.itemContainer}>
                        <Image 
                            source={require('../../assets/images/icon/chat_shop.png')}
                            style={styles.item}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={styles.text}>购物</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Image 
                            source={require('../../assets/images/icon/chat_recorder.png')}
                            style={styles.item}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={styles.text}>语音输入</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Image 
                            source={require('../../assets/images/icon/chat_mycollection.png')}
                            style={styles.item}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={styles.text}>我的收藏</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Image 
                            source={require('../../assets/images/icon/chat_mycard.png')}
                            style={styles.item}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={styles.text}>名片</Text>
                    </TouchableOpacity>
                </View>
                              
            </View> 
        ) 
    }   
}  
const styles = StyleSheet.create({
    container:{
        height:Dimensions.get('window').height*0.4,
        backgroundColor:'#F5F5F5'           
    },
    half:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex:1,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    itemContainer:{
        backgroundColor:'#FCFCFC',
        padding: 5,
        borderWidth: 1,
        borderColor: '#DADADA',
        borderRadius: 10, 
        height:60,
        width:60,
        justifyContent:'center',
        alignItems: 'center',
    }, 
    item:{
        width: 40,
    },
    text:{
        textAlign:'center',
        color:'#afafaf',
        fontSize: 12,
        fontWeight: '100',
    }
})