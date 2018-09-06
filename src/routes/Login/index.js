/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-15 16:29:35 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-09-05 17:39:49
 */

  
import React, { PureComponent } from 'react';
import { InputItem, Button, List, Toast } from 'antd-mobile';
import styles from './style.css';
import { connect } from 'dva';
import sha1 from 'sha1';
import md5 from 'md5';

class Login extends PureComponent {
  state = {
    userError: false,
    pwdError: false,
    userName: "",
    password: "",
    loading: false,
    value:''
  }
  //检测用户名
  handleUserNameChange = (value) => {
    //字母，数字，下划线，减号 点
    const uPattern = /^[a-zA-Z0-9_-_.]{0,16}$/;
    if(!uPattern.test(value)){
      this.setState( { userError: true})
    }else{

      this.setState( { userError: false,userName: value});
      this.setState({
        value,
      });
    }
  }
  //检测密码
  handlePwdChange = (value) => {
    const uPattern = /^.*(?=.{6,})/;
    if(!uPattern.test(value)){
      this.setState( { pwdError: true})
    }else{
      this.setState( { pwdError: false,password: value})
    }
  }
  //登录
  onLogin = () => {
    this.setState( { loading:true })
    const{  userName,password} = this.state ;
    let arr = [md5(password.toString()).substring(2, md5(password.toString()).length).toUpperCase(), 'vania']
    let pwd = '';
    arr.sort().map( (item, index) => {
      return pwd += item;
    })
    const userInfo = {
      userNo: userName, 
      pwd: sha1(pwd),
      token: 'vania',
    }
    this.props.dispatch({
      type: 'users/userLogin',
      payload: userInfo,
      callback: (data) => {
        this.setState({ loading: false});
        if(!data.result.userInfo){
          Toast.fail(data.result.loginResult,1)
        }else{
          const userId = data.result.userInfo.userId;
          this.props.history.push({pathname: `/home/${userId}`})
        
        }
      }
    })

    //this.props.history.push({pathname: '/checkComplete/4FFEF1A80AB14943A85FA92F0C1B06D9'})
  
   
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.fromBox}>
          <div className={styles.input}>
            <List>
              <InputItem
                type="text"
                placeholder="请输入用户名"
                onChange={this.handleUserNameChange}
                maxLength="20"
                error={this.state.userError}
                value={this.state.value}
              >用户名</InputItem>
              <InputItem
                type="password"
                placeholder="请输入密码"
                error={this.state.pwdError}
                maxLength="20"
                onChange={this.handlePwdChange}
              >密码</InputItem>
            </List>
          </div>
          <div className={styles.btnLogin}>
            <Button type="primary" loading={this.state.loading} onClick={this.onLogin} style={{backgroundColor:"#485dfb"}}>登录</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state)(Login);