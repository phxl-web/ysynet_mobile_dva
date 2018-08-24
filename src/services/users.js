import request from '../utils/request';
import { _local } from '../api/local'

//登录
export function login(options) {
  return request(`${_local}/login/userLogin`,{
    methods: "POST",
    type: 'formData',
    body: options
  });
}

//获取用户信息
export function getUserInfo(options){
  return request(`${_local}/login/getUserInfo`,{
    methods : 'POST',
    type: 'formData',
    body: options
  })
}

//获取菜单
export function getUserM(options){
  return request(`${_local}/login/getUserM`,{
    methods: "POST",
    type: 'formData',
    body: options
  })
}

//获取库房
export function getStorages(options){
  return request(`${_local}/storage/findTopStorageByUser`,{
    methods: "POST",
    type: 'formData',
    body: options
  })
}