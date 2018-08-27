/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:16:33 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-24 15:09:10
 * 验收完成
 */

 import React , { PureComponent } from 'react';
 import {  Icon, Result, Button } from 'antd-mobile';
 import { connect } from 'dva';
 import styles from './style.css';

 class CheckComplete extends PureComponent {
  state = {
    sendId: this.props.match.params.sendId,
    dataSource:{}
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
      callback: (data) => {
        this.setState( { dataSource : data} )
        this.setState({ loading: false});
      }
    })
  }
  //  验收通过   图标颜色26a2fa
  //拒收 图标颜色  fc6621
   render () {
     const { dataSource } = this.state;
     return (
      <div className={styles.container}>
        <Result
        img={dataSource.fstate === "90" ? <Icon type="check-circle" className={styles.nullIcon} style={{ fill: '#fc6621' }} /> : <Icon type="check-circle" className={styles.nullIcon} style={{ fill: '#26a2fa' }} />}
        title={dataSource.fstate === "90" ? "验收完成，整单拒收" : "验收完成"}
        message={
          <div className={styles.checkMessage}>
            <p>送货单号：{ dataSource.sendNo  }</p>
            <p>供应商：{ dataSource.fOrgName }</p>
            <p>验收员：{ dataSource.checkUserName }</p>
            <p>验收时间：{ dataSource.checkTime }</p>
          </div>
        }
        />
        <div className={styles.checkBtns}>
          <Button type="default" inline className={styles.supBtn} onClick={() => this.props.history.push({pathname:'/result'})}  style={{border:'1px solid #666'}}>联系供应商</Button>
          <Button type="default" inline className={styles.messageBtn} onClick={() => this.props.history.push({pathname:`/message/${this.state.sendId}`})} style={{border:'1px solid #26a2fa'}}>评价</Button>
          <Button type="default" inline className={styles.goBtn} onClick={() => this.props.history.push({pathname:'/delivery'})} style={{border:'1px solid green'}}>继续验收</Button>
        </div>
      </div>
     )
   }
 }

 export default connect(state =>  state)(CheckComplete);