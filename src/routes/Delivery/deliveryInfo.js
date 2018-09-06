/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 10:11:16 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-09-05 17:34:51
 * 送货单信息页面
 */
import React , { PureComponent } from 'react';
import { Icon,List, Flex } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
// import { _local } from '../../api/local';
// import querystring from 'querystring';
const Item = List.Item;

class DeliveryInfo extends PureComponent{
  state = {
    sendId: this.props.match.params.sendId,
    userId: this.props.match.params.userId,
    storageGuid: this.props.match.params.storageGuid,
    data: {}
  }
 
   componentDidMount() {
    const { sendId, storageGuid } = this.state;
    this.props.dispatch({
      type: 'delivery/mobileCheckDelivery',
      payload: { storageGuid: storageGuid,sendId: sendId},
      callback: (data) => {
        this.setState( { data : data} )
        this.setState({ loading: false});
      }
    })
  }

  //开始验收按钮
  handleClickCheck = () => {
    this.props.history.push({pathname:`/DeliveryCheck/${this.state.sendId}/${this.state.userId}/${this.state.storageGuid}`});
  }


  render (){
    const { data,userId,storageGuid } = this.state;
    return (
      <div className={styles.container}>
          <div className={styles.infoContent}>
            <Item>单号:{data.sendNo}</Item>
            <Item extra={<Icon type="right"/>} onClick={() => this.props.history.push({pathname:`/deliveryProgress/${data.fstate}`})}>状态:{data.sendFstate}</Item>
            <Item>创建人:{data.sendUsername}</Item>
            <Item>创建时间:{data.sendDate}</Item>
            <Item>订单号:{data.orderNo}</Item>
            <Item>送货单总金额:{data.totalPrice}</Item>
            <Item>产品数量:{data.detailNum}</Item>
            <Item>收货人:{data.lxr}</Item>
            <Item>收货人联系方式:{data.lxdh}</Item>
            <Item>收获地址:{data.tfAddress}</Item>
          </div>
         {
           data.fstate === "50" ?
           <div className={styles.infoFooter}>
           <Flex>
             <Flex.Item><span className={styles.infoLeftBtn} onClick={() => this.props.history.push({pathname:`/result/${userId}/${storageGuid}`})}>联系供应商</span></Flex.Item>
             <Flex.Item><span className={styles.infoRightBtn} onClick={this.handleClickCheck}>开始验收</span></Flex.Item>
           </Flex>
           </div>
           :null
         }
      </div>
    )
  }
}

export default connect(state =>  state)(DeliveryInfo);