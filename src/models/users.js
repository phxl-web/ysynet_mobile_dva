import *  as usersService from '../services/users';
import  { Toast } from "antd-mobile";
console.log('222')
export default {
  namespace : 'users' ,
  state : {
    userInfo: {}
  },
  reducers: {
    userInfo(state,action){
      return {
        ...state,
        userInfo: action.payload
      }
    },
    userMenu(state,action){
      return {
        ...state,
        menuList: action.payload
      }
    },
  },
  effects: {
    *userLogin({ payload, callback },{ call }){
      const data = yield call(usersService.login,payload);
      if(data.status){
        if(callback) callback(data.result);
      }else{
        Toast.fail(data.msg || '登录获取用户信息失败!', 1);
      }
    },
    *getUserInfo({ payload, callback },{ call }){
      const data = yield call(usersService.getUserInfo,payload);
      if(data.status){
        if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || '获取用户信息失败')
      }
    },
    *getUserM({ payload, callback }, { call, put}){
      const data = yield call(usersService.getUserM,payload);
      if(data.status){
        yield put( { type : 'userMenu',payload: data.result});
        if(callback) callback(data.result);
      }else {
        Toast.fail(data.msg || '获取菜单失败')
      }
    }
  }
}