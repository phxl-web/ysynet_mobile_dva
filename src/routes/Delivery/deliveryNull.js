/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 10:11:16 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2019-04-01 17:26:53
 * 错误页面
 */
import React , { PureComponent } from 'react';
import { Icon, Result,Button } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
class ErrorInfo extends PureComponent{
  state = {
    userId: this.props.match.params.userId,
    storageGuid: this.props.match.params.storageGuid,
    error : this.props.match.params.error ,
    orderType : this.props.match.params.orderType ,
    userName: this.props.users.userInfo.userNo,
    pwd: this.props.users.userInfo.pwd,
  }

  handleError = (value) => {
    switch (value){
      case "01" : return "错误送货单";
      case "02" : return "用户不存在";
      default : return "无效操作，请返回"
    }
  } 

  render (){
    const { error,userId,storageGuid,userName,pwd, orderType } = this.state;
    return (
      <div className={styles.container}>
            <Result
            img={ <Icon type="check-circle" className={styles.nullIcon} style={{ fill: '#fc6621' }} />}
            title={this.handleError(error)}
            />
            <div className={styles.checkBtns}>
            <Button type="default" inline className={styles.supBtn} onClick={() => this.props.history.push({pathname:'/result'})}  style={{border:'1px solid #666'}}>联系供应商</Button>
            <Button type="default" inline className={styles.messageBtn} onClick={() => this.props.history.push({pathname:`/home/${userId}/${userName}/${pwd}/false`})} style={{border:'1px solid #26a2fa'}}>返回首页</Button>
            {
              orderType === "OPER_DELIVERY" ? <Button type="default" inline className={styles.goBtn} onClick={() => this.props.history.push({pathname: `/home/${userId}/${userName}/${pwd}/false`})} style={{border:'1px solid green'}}>继续验收</Button> :<Button type="default" inline className={styles.goBtn} onClick={() => this.props.history.push({pathname:`/delivery/${userId}/${storageGuid}`})} style={{border:'1px solid green'}}>继续验收</Button>
            }

          </div>
      </div>
    )
  }
}

export default connect(state =>  state)(ErrorInfo);