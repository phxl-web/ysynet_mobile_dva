import request from '../utils/request';
import { _local } from '../api/local';

//我的送货单列表
export function mobileDeliveryList(options){
  return request(`${_local}/delivery/rMobileSearchDeliveryList`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//移动端扫码送货单查询
export function mobileCheckDelivery(options){
  return request(`${_local}/check/mobileCheckDelivery`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//送货单单条数据确认
export function deliveryDetialCheck(options){
  return request(`${_local}/check/deliveryDetialCheck`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//送货单验收通过
export function deliveryThrough(options){
  return request(`${_local}/check/deliveryThrough`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//送货单验收不通过
export function deliveryNotThrough(options){
  return request(`${_local}/check/deliveryNotThrough`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//保存送货单附件图片
export function uploadDeliveryImages(options){
  return request(`${_local}/check/uploadDeliveryImages`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//送货单验收评价
export function deliveryEvaluate(options){
  return request(`${_local}/check/deliveryEvaluate`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
