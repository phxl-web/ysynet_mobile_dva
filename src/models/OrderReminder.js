/*
 * @Author: gaofengjiao 
 * @Date: 2019-01-07 11:21:24 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2019-05-15 16:41:46
 */

import * as OrderReminderService from '../services/OrderReminder';
import { Toast } from 'antd-mobile';
export default {
  namespace: 'orderReminder',
  state: {
  },
  reducers: {
  },
  effects: {
    *queryOperationOrder({ payload, callback},{ call,put }){
      const data = yield call(OrderReminderService.queryOrderAndOperation,payload);
      if(data.status){
        if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || "获取信息失败")
      }
    },
    *queryOrderDetailList({ payload, callback},{ call,put }){
      const data = yield call(OrderReminderService.queryOrderDetailList,payload);
      if(data.status){
        if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || "获取信息失败")
      }
    },
    *queryCertList({ payload, callback},{ call,put }){
      const data = yield call(OrderReminderService.queryCertList,payload);
      if(data.status){
        if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || "获取信息失败")
      }
    },
  }
}