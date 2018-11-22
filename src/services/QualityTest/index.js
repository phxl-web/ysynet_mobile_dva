import request from '../../utils/request';
import { _local } from '../../api/local';
//扫描包装码
export function mobileFindSendDatailsByPacking(options){
  return request(`${_local}/delivery/findSendDatailsByPacking`,{
    methods: 'POST',
    type: 'formData',
    body: options
  })
}