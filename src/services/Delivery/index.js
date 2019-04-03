import request from '../../utils/request';
import { _local } from '../../api/local';

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
  return request(`${_local}/delivery/mobileCheckDelivery`,{
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
export function mobileDeliveryThrough(options){
  return request(`${_local}/check/mobileDeliveryThrough`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//送货单验收不通过
export function mobileDeliveryNotThrough(options){
  return request(`${_local}/check/mobileDeliveryNotThrough`,{
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

//删除送货单附件图片
export function deleteDeliveryImage(options){
  return request(`${_local}/check/deleteDeliveryImage`,{
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

//手术送货单详情
export function findOperPackageDetail(options){
  return request(`${_local}/order/findOperPackageDetail`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//手机端验收通过不通过
export function checkOperDeliveryAudit(options){
  return request(`${_local}/order/checkOperDeliveryAudit`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}
