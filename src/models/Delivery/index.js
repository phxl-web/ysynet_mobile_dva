import * as deliveryService from '../../services/Delivery';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'delivery',
  state: {
    deliveryList: []
  },
  reducers: {
    mobileCheckDeliveryInfo(state,action){
      return {
        ...state,
        mobileCheckDeliveryInfo: action.payload
      }
    }
  },
  effects: {
    *mobileDeliveryList({ payload, callback},{ call }){
      const data = yield call(deliveryService.mobileDeliveryList,payload);
      if(data.status){
        if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || '获取送货单列表失败',1)
      }
    },
    *mobileCheckDelivery({ payload, callback},{ call,put }){
      const data = yield call(deliveryService.mobileCheckDelivery,payload);
      if(data.status){
        yield put( { type : 'mobileCheckDeliveryInfo',payload: data.result});
       if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || "获取信息失败",1)
      }
    },
    *deliveryDetialCheck({ payload, callback},{ call }){
      const data = yield call(deliveryService.deliveryDetialCheck,payload);
      if(data.status){
        Toast.success("操作成功",1)
        if(callback) callback()
      }else{
        Toast.fail(data.msg||"操作失败",1)
      }
    },
    *deliveryThrough({ payload, callback} , { call }){
      const data = yield call(deliveryService.deliveryThrough,payload);
      if(data.status){
        Toast.success("操作成功",1)
        if(callback) callback()
      }else{
        Toast.fail(data.msg || "操作失败 ",1)
      }
    },
    *deliveryNotThrough({ payload, callback} , { call }){
      const data = yield call(deliveryService.deliveryNotThrough,payload);
      if(data.status){
        Toast.success("操作成功",1)
        if(callback) callback()
      }else{
        Toast.fail(data.msg || "操作失败 ",1)
      }
    },
    *uploadDeliveryImages({ payload, callback} , { call }){
      const data = yield call(deliveryService.uploadDeliveryImages,payload);
      if(data.status){
        Toast.success("保存图片成功",1)
        if(callback) callback()
      }else{
        Toast.fail(data.msg || "操作失败 ",1)
      }
    },
    *deliveryEvaluate({ payload, callback} , { call }){
      const data = yield call(deliveryService.deliveryEvaluate,payload);
      if(data.status){
        Toast.success("评价成功",1)
        if(callback) callback()
      }else{
        Toast.fail(data.msg || "评价失败 ",1)
      }
    }
  }
}