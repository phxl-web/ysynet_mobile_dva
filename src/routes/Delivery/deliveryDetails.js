/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:22:50 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-24 09:24:45
 * 送货单详情
 */
import React , { PureComponent } from 'react';
import {  List,Flex } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
class DeliveryDetails extends PureComponent{
  state = {
    sendId: this.props.match.params.sendId,
    productData : [],//产品列表
    dataSource: {} ,//送的货单明细
  }
  
  componentDidMount = () => {
    this.getMobileCheckDelivery();
  }
  
  getMobileCheckDelivery = () => {
    const sendId = this.state.sendId;
    const storageGuid = this.props.users.userInfo.rStorageGuid;
    this.props.dispatch({
      type: 'delivery/mobileCheckDelivery',
      payload: { storageGuid: storageGuid,sendId: sendId},
      //payload: { storageGuid:"926ACEBC275F4806942DB9C7932D6C54",sendId:"E250CD25C0B3473083E635D0816F821B" },
      callback: (data) => {
        this.setState( { dataSource : data, productData: data.detials} )
        this.setState({ loading: false});
      }
    })
  }

  handleMore = () =>{
    this.props.history.push({pathname:`/productList/${this.state.sendId}`});
  }

  render(){
    const { productData ,dataSource } = this.state;
    return(
      <div className={styles.container}>
        <List>
          <Item>
            {dataSource.sendFstate} 
            <Brief>{dataSource.sendDate}</Brief>
          </Item>
          <Item extra={dataSource.lxdh}>
            收货人：{dataSource.lxr} 
          </Item>
          <Item>
          收货地址：{dataSource.tfAddress}
          </Item>
          <Item>
            {dataSource.sendNo} 
            <Brief>{dataSource.fOrgName}</Brief>
          </Item>
        </List>
          <List style={{marginTop:'5px'}}>
            {
              productData.map((item,index) =>{
  
                 return <Item extra={`${item.amount}${item.tenderUnit}`} key={index}>
                    {item.geName}
                  <Brief>{item.spec}/{item.fmodel}</Brief>     
                </Item>
              })
            }
             <Item extra={ <span onClick={this.handleMore}>更多</span>}> 
            {/* <Item extra={productData.length > 3 ? <span onClick={this.handleMore}>更多</span> :null}> */}
              <Brief>{productData.length}件产品</Brief> 
            </Item>
          </List>
        <List style={{marginTop:'5px'}}>
          <Item>
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
            订单号:{dataSource.orderNo}
          </Item>
          <Item >
            创建时间：{dataSource.dysTime}
          </Item>
          <Item >
            创建人：{dataSource.dysUserName}
          </Item>
          <Item extra={dataSource.totalPrice}>
            验收/送货总金额
          </Item>
        </List>
        <div className={styles.infoFooter}>
          <Flex>
            <Flex.Item><span className={styles.infoLeftBtn} onClick={() => this.props.history.push({pathname:'/result'})}>联系供应商</span></Flex.Item>
            <Flex.Item><span className={styles.infoRightBtn} onClick={() => this.props.history.push({pathname:`/message/${this.state.sendId}`})}>评价</span></Flex.Item>
          </Flex>
          </div>
      </div>
    )
  }
}

export default connect(state =>  state)(DeliveryDetails);