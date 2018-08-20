/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-15 16:29:35 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-16 16:53:48
 */

  
import React, { PureComponent } from 'react';
import { InputItem, Button, List } from 'antd-mobile';
import styles from './style.css';
import { connect } from 'dva';

class Login extends PureComponent {
  state = {
    errorUserNameMsg : "",
    errorPassWordMsg : "",
  }
  //检测用户名
  onUserNameBlur = () => {

  }
  //检测密码
  onUserPasswordBlur = () => {
    
  }
  //登录
  onLogin = () => {

  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.logoBox}>
          logo
        </div>
        <div className={styles.fromBox}>
          <div className={styles.input}>
            <List>
              <InputItem
                type="text"
                placeholder="请输入用户名"
                onBlur={this.onUserNameBlur}
                maxLength="20"
                extra={this.state.errorUserNameMsg}
              >用户名</InputItem>
              <InputItem
                type="password"
                placeholder="请输入密码"
                onBlur={this.onUserPasswordBlur}
                extra={this.state.errorPassWordMsg}
                maxLength="20"
                onChange={this.onChange}
                
              >密码</InputItem>
            </List>
          </div>
          <div className={styles.btnLogin}>
            <Button type="primary" onClick={this.onLogin}>登录</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state)(Login);