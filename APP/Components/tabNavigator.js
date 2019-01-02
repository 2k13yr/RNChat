/*
    在每一个navigatorItem下的组件中指定navigation
*/

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  DeviceEventEmitter
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';    //加载第三方导航插件
//加载4个主要页面
import HomeScreen from '../Screens/Home';
import ContactsScreen from '../Screens/Contacts';
import MomentScreen from '../Screens/Moment';
import MineScreen from '../Screens/Mine';
//加载矢量图标库
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tabnavigator from 'react-native-tab-navigator';
import TitleBar from '../Components/titleBar'


export default class TabNavigator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedTab : '微信',
      
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <Tabnavigator hidesTabTouch={true} >
          <Tabnavigator.Item 
            selected={this.state.selectedTab === '微信'}
            title='微信'
            renderIcon={()=><Icon name='wechat' size={25} style={styles.icon} />}
            renderSelectedIcon={()=><Icon name='wechat' size={25} style={styles.selectedIcon} />}
            onPress={()=>this.setState({ selectedTab: '微信' })}
          >
              <HomeScreen navigation={this.props.navigation} />
          </Tabnavigator.Item>
          <Tabnavigator.Item 
            selected={this.state.selectedTab === '联系人'}
            title='联系人'
            renderIcon={()=><Icon name='account-plus' size={25} style={styles.icon} />}
            renderSelectedIcon={()=><Icon name='account-plus' size={25} style={styles.selectedIcon} />}
            onPress={()=>this.setState({ selectedTab: '联系人' })}
          >
              <ContactsScreen navigation={this.props.navigation} />
          </Tabnavigator.Item>
          <Tabnavigator.Item 
            selected={this.state.selectedTab === '发现'}
            title='发现'
            renderIcon={()=><Icon name='compass-outline' size={25} style={styles.icon} />}
            renderSelectedIcon={()=><Icon name='compass-outline' size={25} style={styles.selectedIcon} />}
            onPress={()=>this.setState({ selectedTab: '发现' })}
          >
              <MomentScreen navigation={this.props.navigation} />
          </Tabnavigator.Item>
          <Tabnavigator.Item 
            selected={this.state.selectedTab === '我'}
            title='我'
            renderIcon={()=><Icon name='account' size={25} style={styles.icon} />}
            renderSelectedIcon={()=><Icon name='account' size={25} style={styles.selectedIcon} />}
            onPress={()=>this.setState({ selectedTab: '我' })}
            
          >
              <MineScreen  navigation={this.props.navigation}  />
          </Tabnavigator.Item>
        </Tabnavigator>

      </View>
    )  
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  icon:{
    color: 'gray'      
  },
  selectedIcon:{
    color: '#00D205'
  }
})







// import React, {Component} from 'react';
// import {
//     View
// } from 'react-native';
// import { createBottomTabNavigator } from 'react-navigation';    //加载第三方导航插件
// //加载4个主要页面
// import HomeScreen from '../Screens/Home';
// import ContactsScreen from '../Screens/Contacts';
// import MomentScreen from '../Screens/Moment';
// import MineScreen from '../Screens/Mine';
// //加载矢量图标库
// import Icon from 'react-native-vector-icons/FontAwesome';
// import TitleBar from './titleBar';

// const TabNavigator = createBottomTabNavigator(
//   {
//     微信 : HomeScreen,
//     联系人 : ContactsScreen,
//     发现 : MomentScreen,
//     我 : MineScreen,
//   },
//   {
//     navigationOptions:({navigation})=>({
//       //设置标签导航图标Icon
//       tabBarIcon:({ focused, horizontal, tintColor })=>{
//         const {routeName} = navigation.state;
//         let iconName;
//         if(routeName === '微信'){
//           iconName = 'comments';
//         }else if(routeName === '联系人'){
//           iconName = 'address-book';
//         }else if(routeName === '发现'){
//           iconName = 'compass';
//         }else if(routeName === '我'){
//           iconName = 'user';
//         }

//         return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
//       },    
//     }),
//     tabBarOptions:{
//       activeTintColor : '#00D205',
//       inactiveTintColor : 'gray',
//       // activeBackgroundColor : 'white',
//       // inactiveBackgroundColor : 'white'
//     },
//     //swipeEnabled: true,       //是否支持滑动
//     //initialRouteName: '微信',
//   }
// )

// export default class RootTabNavigator extends React.Component{
//     render(){
//         return (
//             <TabNavigator />
//         )
//     }
// }
