import request from '../../utils/request';
import { _local } from '../../api/local';

//申请科室下拉列表
export function searchDeptInfoList(options) {
  return request(`${_local}/departmentController/searchDeptInfoList`, {
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

// 拒绝确认
export function updateHisOrder(options) {
  return request(`${_local}/hisOrder/updateHisOrder`, {
    methods: 'POST',
    type: 'formData',
    body: options
  })
}

//主列表
export function queryHisOrderList(options) {
  return request(`${_local}/hisOrder/queryHisOrderList`, {
    methods: 'POST',
    type: 'formData',
    body: options
  })
}