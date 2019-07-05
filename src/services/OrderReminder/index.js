import request from '../../utils/request';
import { _local } from '../../api/local';
//查看手术订单订单详情
export function queryOrderAndOperation(options){
  return request(`${_local}/delivery/queryOrderAndOperation`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
//查看普通订单详情
export function queryOrderDetailList(options){
  return request(`${_local}/delivery/queryOrderDetailList`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//授权缺失详
export function queryCertList(options){
  return request(`${_local}/cert/queryCertList`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}