import * as surgeryApplicationService from '../../services/SurgeryApplication';
// import { Toast } from 'antd-mobile';

export default {
  namespace: 'SurgeryApplication',
  state: {
    surgeryApplicationList: []
  },
  reducers: {
  },
  effects: {
    *searchDeptInfoList({ payload, callback},{ call }){
      const data = yield call(surgeryApplicationService.searchDeptInfoList,payload);
      if(callback) callback(data)
    },
    *updateHisOrder({ payload, callback},{ call }){
      const data = yield call(surgeryApplicationService.updateHisOrder,payload);
      if(callback) callback(data)
    },
    *queryHisOrderList({ payload, callback},{ call }){
      const data = yield call(surgeryApplicationService.queryHisOrderList,payload);
      console.log(data)
      if(callback) callback(data)
    },
   
  }
}