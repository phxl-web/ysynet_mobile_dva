import *  as usersService from '../services/users';
import  { Toast } from "antd-mobile";

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
  },
  effects: {
    *userLogin({ payload, callback },{ call, put }){
      const data = yield call(usersService.login,payload);
      if(data.status){
        if(callback) callback(data);
        yield put({ type: 'userInfo',payload: {...data.result.userInfo}})
      }else{
        Toast.fail(data.result.loginResult || '登录获取用户信息失败!', 1);
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
    *getStorages({ payload, callback }, { call, put}){
      const data = yield call(usersService.getStorages,payload);
      if(data.status){
        //yield put({ type: 'userStorage',payload: {...data.result}})
        if(callback) callback(data.result);
      }else {
        Toast.fail(data.msg || '获取库房失败')
      }
    }
  }
}