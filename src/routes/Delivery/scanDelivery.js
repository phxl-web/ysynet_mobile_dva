/*
 * @Author: gaofengjiao 
 * @Date: 2018-12-11 10:00:19 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2019-03-29 14:10:51
 * 扫箱码验收
 */
import React , { PureComponent } from 'react';
import {   Flex, Stepper,Button,Toast } from 'antd-mobile';
import { connect } from 'dva';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit  } from '@fortawesome/free-solid-svg-icons'
import styles from './style.css';
library.add(faEdit )

class ScanDelivery extends PureComponent{
  state = {
    val:null,
    packingCode: this.props.match.params.packingCode,
   // packingCode:'BZ0018218112200005',
    sendId: this.props.match.params.sendId,
    userId: this.props.match.params.userId,
    storageGuid: this.props.match.params.storageGuid ,
    baseInfo : {},//产品列表
    showInput:false,
    isSign:"00",//表示一次验收  01表示二次验收
  };
  componentDidMount = () => {
    this.getMobilePackingInfo();
  }
  getMobilePackingInfo = () => {
    const { packingCode, storageGuid } = this.state;
    this.props.dispatch({
      type: 'qualityTest/mobilequalityTestDetails',
      payload: { storageGuid: storageGuid,packingCode: packingCode},
      callback: (data) => {
        if(data){
          this.setState({ baseInfo:data})
        }
      }
    })
  }
  //改变数量
  onChange = (val) => {
    this.setState({ val: val})
  }
  handleEditNum = () => {
    const showInput  = true;
    this.setState( { showInput })
  }
  handleEditOff = () => {
    Toast.loading('加载中...', 2, () => {
      const { val,baseInfo } = this.state;
      const checkAmount = val=== null ? baseInfo.amount : val;
      const storageGuid = this.state.storageGuid;
      const sendDetailGuid = baseInfo.sendDetailGuid;
      baseInfo.amount = checkAmount;
      this.setState( { showInput:false,baseInfo})
     this.handleDeliverDetialCheck(storageGuid,sendDetailGuid,checkAmount)
    });
   
  }
  handleDeliverDetialCheck = (storageGuid,sendDetailGuid,checkAmount) => {
    const { sendId,userId,isSign } = this.state;
    this.props.dispatch({
      type: 'delivery/deliveryDetialCheck',
      payload: { storageGuid: storageGuid,sendDetailGuid: sendDetailGuid,checkAmount: checkAmount },
      callback: () => {
        this.props.history.push({pathname:`/deliveryCheck/${sendId}/${userId}/${storageGuid}/${isSign}`});
      }
    })
  }
  render (){
    const { baseInfo ,showInput} = this.state;
    return this.props.children || (
      <div className={styles.container}>
          <div className={styles.checkContent}>
            <div className={styles.listCheck}>
                  <h3 className={styles.titleInfo}>
                    通用名称: { baseInfo.materialName }    
                  </h3>
                  <div className={styles.checkInfo}>
                    <p>型号: { baseInfo.spec }</p>
                      <p>规格: { baseInfo.fmodel }</p>
                      <p>采购单位: { baseInfo.purchaseUnit }</p>
                      <p>包装规格:{ baseInfo.tfPacking } </p>
                      <p>生产批号: { baseInfo.flot }</p>
                      <p>证件效期: { baseInfo.registerFirstLast }</p>
                      <p>生产日期: { baseInfo.prodDate }</p>
                      <p>产品效期:{ baseInfo.usefulDate }</p>
                      <p>单价: {baseInfo.purchasePrice}</p>
                      <p>总价: {baseInfo.amountMoney}</p>
                  </div>
                  <hr/>
                  <div style={{height:'40px',marginBottom:'7px'}}>
                    {
                      !showInput ?
                      <p className={styles.checkNum}>数量: {baseInfo.amount} <span style={{color:"#666",position:'absolute',right:'10px'}} onClick={this.handleEditNum}><FontAwesomeIcon icon="edit" /></span></p>
                      :
                      null 
                    }
                    {
                        showInput  ? 
                        <Flex >
                        <Flex.Item>
                        <Stepper
                          style={{ width: '100%', minWidth: '100px' }}
                          showNumber
                          min={0}
                          defaultValue={baseInfo.amount}
                          value={this.state.val===null ?  baseInfo.amount : this.state.val}
                          onChange={this.onChange}
                        />
                        </Flex.Item>
                        <Flex.Item><Button type="primary" style={{height:'40px',lineHeight:'40px',borderRadius:'0'}}  onClick={this.handleEditOff}>完成</Button></Flex.Item>
                      </Flex>
                        :null
                    }
                  </div>
            </div>
          </div>
      </div>
    )
  }
}
export default connect(state =>  state)(ScanDelivery);
