import FirstPage from '../Screens/firstPage';
import Register from '../Screens/register';
import TokenLogin from '../Screens/tokenLogin';
import Login from '../Screens/login';
import { createStackNavigator,createSwitchNavigator } from 'react-navigation';


export default  AuthNavigator = createStackNavigator({
    FirstPage:{
        screen : FirstPage,
        navigationOptions:()=>({
            header:null
        })
    }, 
    Register:{
        screen : Register,
        navigationOptions:()=>({
            header:null
        })
    },
    TokenLogin:{
        screen : TokenLogin,
        navigationOptions:()=>({
            header:null
        })
    },
    Login:{
        screen : Login,
        navigationOptions:()=>({
            header:null
        })
    }
});