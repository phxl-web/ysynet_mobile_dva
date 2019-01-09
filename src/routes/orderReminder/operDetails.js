/*
 * @Author: gaofengjiao 
 * @Date: 2019-01-07 13:41:00 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2019-01-08 13:36:43
 * 手术订单
 */

import React , { PureComponent } from 'react';
import { List } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';

const Item = List.Item;

class OpOrderReiminder extends  PureComponent {
  state = {
    orderId: this.props.match.params.orderId,
     openId: this.props.match.params.openId,
     baseInfo: null,
  }
  componentDidMount = () => {
    this.getOrderOperInfo();
  }
  getOrderOperInfo = () => {
    const { orderId, openId } = this.state;
    this.props.dispatch({
      type: 'orderReminder/queryOperationOrder',
      payload: { orderId: orderId,openId: openId},
      callback: (data) => {
   
        setTimeout(() => {
          this.setState({ baseInfo:data})
        }, 100);
      }
    })
  }
  render() {
    const { baseInfo } = this.state;
    return (
    <div>
        <List >
        <Item  extra={<span className={styles.listItem}>{ baseInfo && baseInfo.lxdh ? baseInfo.lxdh : null }</span>}><span className={styles.listItem}>{ baseInfo && baseInfo.lxr ? baseInfo.lxr : null }</span> </Item>
        <Item><span className={styles.listItem}>{ baseInfo && baseInfo.tfAddress ? baseInfo.tfAddress : null }</span></Item>
        <Item>订单号:{ baseInfo && baseInfo.orderNo ? baseInfo.orderNo : null }</Item>
      </List>
      <List className={styles.operInfo}>
        <Item extra={ baseInfo && baseInfo.treatmentNo ? baseInfo.treatmentNo : null }>患者ID</Item>
        <Item extra={ baseInfo && baseInfo.patientName ? baseInfo.patientName : null }>患者姓名</Item>
        <Item extra={ baseInfo && baseInfo.gender ? baseInfo.gender : null }>性别 </Item>
        <Item extra={ baseInfo && baseInfo.age ? baseInfo.age : null }>年龄</Item>
        <Item extra={ baseInfo && baseInfo.operName ? baseInfo.operName : null }>手术名称</Item>
        <Item extra={ baseInfo && baseInfo.operDate ? baseInfo.operDate : null }>手术日期</Item>
        <Item extra={ baseInfo && baseInfo.tfBrand ? baseInfo.tfBrand : null }>品牌</Item>
      </List>
    </div>
    )
  }
}
export default connect(state =>  state)(OpOrderReiminder);
