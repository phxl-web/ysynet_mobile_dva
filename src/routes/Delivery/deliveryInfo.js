/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 10:11:16 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-20 11:16:26
 * 送货单信息页面
 */
import React , { PureComponent } from 'react';
import { NavBar, Icon, List, Flex } from 'antd-mobile';
import styles from './style.css';
const Item = List.Item;

class DeliveryInfo extends PureComponent{
  render (){
    return (
      <div className={styles.container}>
           <NavBar
            mode="dark"
            leftContent={<Icon type="left"/>}
            onLeftClick={() => this.props.history.push({pathname:'/Delivery'}) }
          >送货单信息</NavBar>
          <div className={styles.infoContent}>
            <Item>单号:</Item>
            <Item extra={<Icon type="right"/>} onClick={() => this.props.history.push({pathname:'/deliveryProgress'})}>状态:</Item>
            <Item>创建人:</Item>
            <Item>创建时间:</Item>
            <Item>订单号:</Item>
            <Item>验收/送货单总金额:</Item>
            <Item>产品数量:</Item>
            <Item>收货人:</Item>
            <Item>收货人联系方式:</Item>
            <Item>收获地址:</Item>
          </div>
          <div className={styles.infoFooter}>
          <Flex>
            <Flex.Item><span className={styles.infoLeftBtn}>联系供应商</span></Flex.Item>
            <Flex.Item><span className={styles.infoRightBtn} onClick={() => this.props.history.push({pathname:'/DeliveryCheck'})}>开始验收</span></Flex.Item>
          </Flex>
          </div>
      </div>
    )
  }
}
export default DeliveryInfo;