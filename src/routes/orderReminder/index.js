/*
 * @Author: gaofengjiao 
 * @Date: 2019-01-07 09:57:22 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2019-01-08 10:26:49
 * 订单提醒详情
 */
import React , { PureComponent } from 'react';
import { List } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
const Item = List.Item;

class PhOrderReiminder extends  PureComponent {
  state = {
    orderId: this.props.match.params.orderId,
     openId: this.props.match.params.openId,
     baseInfo:null,
     orderDetail:[],
  }
  componentDidMount = () => {
    this.getOrderOperInfo();
  }
  getOrderOperInfo = () => {
    const { orderId, openId } = this.state;
    this.props.dispatch({
      type: 'orderReminder/queryOrderDetailList',
      payload: { orderId: orderId,openId: openId},
      callback: (data) => {
        setTimeout(() => {
          this.setState({ baseInfo:data.orderInfo , orderDetail: data.orderDetail})
        }, 100);
      }
    })
  }
  render() {
    const { baseInfo,orderDetail } = this.state;
    return (
    <div>
        <List >
        <Item  extra={<span className={styles.listItem}>{ baseInfo && baseInfo.lxdh ? baseInfo.lxdh : null }</span>}><span className={styles.listItem}>{ baseInfo && baseInfo.lxr ? baseInfo.lxr : null }</span> </Item>
        <Item><span className={styles.listItem}>{ baseInfo && baseInfo.tfAddress ? baseInfo.tfAddress : null }</span></Item>
        <Item>订单号:{ baseInfo && baseInfo.orderNo ? baseInfo.orderNo : null }</Item>
        <Item><p style={{textAlign:'right'}}>订单总金额：<span className={styles.orederTotal}>{baseInfo && baseInfo.totalPrice ? `¥${baseInfo.totalPrice}`:null}</span></p></Item>
      </List>
      {
        orderDetail && orderDetail.length!== 0 ?
       orderDetail.map((item)=>{
         return  <List >
                  <Item>{ item && item.materialName }</Item>
                  <Item>{ item && item.totalPrice }</Item>
                  <Item>{ item && item.fmodel} </Item>
                  <Item><p style={{textAlign:'right'}}>{ item && item.amoutPurchaseUnit }</p></Item>
                </List>
       })
        :
        null
      }
      
    </div>
    )
  }
}
export default connect(state =>  state)(PhOrderReiminder);
