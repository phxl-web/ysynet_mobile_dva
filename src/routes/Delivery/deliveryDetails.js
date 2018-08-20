/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:22:50 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-17 11:19:56
 * 送货单详情
 */
import React , { PureComponent } from 'react';
import { NavBar, Icon, List,Flex } from 'antd-mobile';
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
class DeliveryDetails extends PureComponent{
  render(){
    return(
      <div className={styles.container}>
       <NavBar
        mode="dark"
        leftContent={<Icon type="left"/>}
        onLeftClick={() => this.props.history.push({pathname:'/Delivery'}) }
        >送货单详情</NavBar>
        <List>
          <Item arrow="horizontal" multipleLine onClick={() => {}}>
            交易完成 
            <Brief>2018-06-07</Brief>
          </Item>
          <Item extra="1345678901">
            收货人：xxxx 
          </Item>
          <Item>
          收货地址：湖北省武汉市江岸区江岸区湖北省武汉市江岸区江岸区
          </Item>
          <Item>
            GD00015180700016ZJ 
            <Brief>供应商名称</Brief>
          </Item>
        </List>
        <List style={{marginTop:'5px'}}>
          <Item extra="*100包">
            通用名称通用名称通用名称通通用名称通用名称通用名称通
            <Brief>型号/规格</Brief>     
          </Item>
          <Item extra="*100包">
            通用名称通用名称通用名称通通用名称通用名称通用名称通
            <Brief>型号/规格</Brief>     
          </Item>
          <Item extra="*100包">
            通用名称通用名称通用名称通通用名称通用名称通用名称通
            <Brief>型号/规格</Brief>     
          </Item>
          <Item extra="更多">
            <Brief>xxxxxx等32件产品</Brief> 
          </Item>
        </List>
        <List style={{marginTop:'5px'}}>
          <Item extra="97">
           评价
          </Item>
          <Item >
           评价内容
          </Item>
          <Item >
           图片显示
          </Item>
        </List>
        <List style={{marginTop:'5px'}}>
          <Item>
            订单号：GD00015180700016ZJ
          </Item>
          <Item >
            创建时间：2017-09-09
          </Item>
          <Item >
            创建人：小星星
          </Item>
          <Item extra="15800.00">
            验收/送货总金额：
          </Item>
        </List>
        <div className={styles.infoFooter}>
          <Flex>
            <Flex.Item><span className={styles.infoLeftBtn}>联系供应商</span></Flex.Item>
            <Flex.Item><span className={styles.infoRightBtn}>追评</span></Flex.Item>
          </Flex>
          </div>
      </div>
    )
  }
}
export default DeliveryDetails;