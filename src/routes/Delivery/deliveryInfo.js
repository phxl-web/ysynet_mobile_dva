/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 10:11:16 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-23 10:23:52
 * 送货单信息页面
 */
import React , { PureComponent } from 'react';
import { NavBar, Icon, List, Flex } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
const Item = List.Item;

class DeliveryInfo extends PureComponent{
  state = {
    sendId: this.props.match.params.sendId,
    data: {}
  }
  componentDidMount = () => {
    const sendId = this.state.sendId;
    const storageGuid = this.props.users.userInfo.rStorageGuid;
    this.props.dispatch({
      type: 'delivery/mobileCheckDelivery',
      //payload: { storageGuid: storageGuid,sendId: sendId},
      payload: { storageGuid:"926ACEBC275F4806942DB9C7932D6C54",sendId:"E250CD25C0B3473083E635D0816F821B" },
      callback: (data) => {
        this.setState( { data : data} )
        this.setState({ loading: false});
      }
    })
  }

  //开始验收按钮
  handleClickCheck = () => {
    
    this.props.history.push({pathname:`/DeliveryCheck/${this.state.sendId}`});
  }

  render (){
    const { data } = this.state;
    console.log(data,'data')
    return (
      <div className={styles.container}>
          <div className={styles.infoContent}>
            <Item>单号:{data.sendNo}</Item>
            <Item extra={<Icon type="right"/>} onClick={() => this.props.history.push({pathname:`/deliveryProgress`})}>状态:{data.sendFstate}</Item>
            <Item>创建人:{data.sendUsername}</Item>
            <Item>创建时间:{data.sendDate}</Item>
            <Item>订单号:{data.orderNo}</Item>
            <Item>验收/送货单总金额:{data.checkTotalPrice}/{data.totalPrice}</Item>
            <Item>产品数量:{data.detailNum}</Item>
            <Item>收货人:{data.lxr}</Item>
            <Item>收货人联系方式:{data.lxdh}</Item>
            <Item>收获地址:{data.tfAddress}</Item>
          </div>
          <div className={styles.infoFooter}>
          <Flex>
            <Flex.Item><span className={styles.infoLeftBtn} onClick={() => this.props.history.push({pathname:'/result'})}>联系供应商</span></Flex.Item>
            <Flex.Item><span className={styles.infoRightBtn} onClick={this.handleClickCheck}>开始验收</span></Flex.Item>
          </Flex>
          </div>
      </div>
    )
  }
}

export default connect(state =>  state)(DeliveryInfo);