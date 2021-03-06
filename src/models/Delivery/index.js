import * as deliveryService from '../../services/Delivery';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'delivery',
  state: {
    deliveryList: []
  },
  reducers: {
  },
  effects: {
    *mobileDeliveryList({ payload, callback},{ call }){
      const data = yield call(deliveryService.mobileDeliveryList,payload);
      if(data.status){
      }else{
        Toast.fail(data.msg || '获取送货单列表失败',1)
      }
      if(callback) callback(data.result)
    },
    *mobileCheckDelivery({ payload, callback},{ call,put }){
      const data = yield call(deliveryService.mobileCheckDelivery,payload);
      if(data.status){
        if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || "获取信息失败")
      }

    },
    *deliveryDetialCheck({ payload, callback},{ call }){
      const data = yield call(deliveryService.deliveryDetialCheck,payload);
      if(data.status){
        if(callback) callback()
        Toast.success("操作成功")
      }else{
        Toast.fail(data.msg||"操作失败")
      }
    
    },
    *mobileDeliveryThrough({ payload, callback} , { call }){
      const data = yield call(deliveryService.mobileDeliveryThrough,payload);
      if(data.status){
        if(callback) callback(data.status)
        Toast.success("操作成功")
      }else{
        if(callback) callback(data.status)
        Toast.fail(data.msg || "操作失败 ")
      }
     
    },
    *mobileDeliveryNotThrough({ payload, callback} , { call }){
      const data = yield call(deliveryService.mobileDeliveryNotThrough,payload);
      if(data.status){
        if(callback) callback(data.status)
        Toast.success("操作成功")
      }else{
        if(callback) callback(data.status)
        Toast.fail(data.msg || "操作失败 ")
      }
    
    },
    *uploadDeliveryImages({ payload, callback} , { call }){
      const data = yield call(deliveryService.uploadDeliveryImages,payload);
      if(data.status){
        if(callback) callback(data)
        Toast.success("保存图片成功")
      }else{
        Toast.fail(data.msg || "操作失败 ")
      }
     
    },
    *deleteDeliveryImage({ payload, callback} , { call }){
      const data = yield call(deliveryService.deleteDeliveryImage,payload);
      if(data.status){
        if(callback) callback()
        Toast.success("删除图片成功")
      }else{
        Toast.fail(data.msg || "操作失败 ")
      }
     
    },
    *deliveryEvaluate({ payload, callback} , { call }){
      const data = yield call(deliveryService.deliveryEvaluate,payload);
      if(data.status){
        if(callback) callback()
        Toast.success("评价成功",1)
      }else{
        Toast.fail(data.msg || "评价失败 ")
      }
     
    },
    *findOperPackageDetail({ payload, callback},{ call,put }){
      const data = yield call(deliveryService.findOperPackageDetail,payload);
      if(data.status){
        if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || "获取信息失败")
      }
    },
    *checkOperDeliveryAudit({ payload, callback},{ call,put }){
      const data = yield call(deliveryService.checkOperDeliveryAudit,payload);
      if(data.status){
        if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || "获取信息失败")
      }
    },
  }
}