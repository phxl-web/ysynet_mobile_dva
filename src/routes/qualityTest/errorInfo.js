/*
 * @Author: gaofengjiao 
 * @Date: 2018-11-22 15:29:18 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2019-04-01 11:30:20
 * 包装码扫一扫错误页面
 */
import React , { PureComponent } from 'react';
import { Icon, Result,Button } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
class ErrorInfo extends PureComponent{
  state = {
    userId: this.props.match.params.userId,
    error : this.props.match.params.error ,
    userName: this.props.users.userInfo.userNo,
    pwd: this.props.users.userInfo.pwd,
  }

  handleError = (value) => {
    switch (value){
      case "01" : return "错误包装码";
      case "02" : return "用户不存在";
      default : return "无效操作，请返回"
    }
  } 

  render (){
    const { error,userId, userName, pwd } = this.state;
    return (
      <div className={styles.container}>
            <Result
            img={ <Icon type="check-circle" className={styles.nullIcon} style={{ fill: '#fc6621' }} />}
            title={this.handleError(error)}
            />
            <div className={styles.checkBtns}>
              <Button type="default" inline className={styles.messageBtn} onClick={() => this.props.history.push({pathname:`/home/${userId}/${userName}/${pwd}/false`})} style={{border:'1px solid #26a2fa'}}>返回首页</Button>
          </div>
      </div>
    )
  }
}

export default connect(state =>  state)(ErrorInfo);
