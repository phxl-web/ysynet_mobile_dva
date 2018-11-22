/*
 * @Author: gaofengjiao 
 * @Date: 2018-11-22 10:27:17 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-11-22 10:56:34
 * 质检
 */
import * as qualityTestService from '../../services/QualityTest';
import { Toast } from 'antd-mobile';
export default {
  namespace: 'qualityTest',
  state: {
  },
  reducers: {
  },
  effects: {

    *mobilequalityTestDetails({ payload, callback},{ call,put }){
      const data = yield call(qualityTestService.mobileFindSendDatailsByPacking,payload);
      if(data.status){
        if(callback) callback(data.result)
      }else{
        Toast.fail(data.msg || "获取信息失败")
      }

    },
  }
}