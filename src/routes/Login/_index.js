/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-15 16:29:35 
 * @Last Modified by: xiangxue
 * @Page 登录去掉微信绑定 
 * @Last Modified time: 2019-12-24 11:58:47
 */

  
import React, { PureComponent } from 'react';
import { InputItem, Button, List, Toast } from 'antd-mobile';
import styles from './style.css';
import { connect } from 'dva';
import sha1 from 'sha1';
import md5 from 'md5';
import message from '../Delivery/message';

class Login extends PureComponent {
  state = {
    userError: false,
    pwdError: false,
    userName: "",
    password: "",
    loading: false,
    value:'',
    openid: null
  }
  componentDidMount = () =>{
    const openid = this.props.match.params.id;
    this.setState({ openid });
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
  userLogin = (info,id) =>{
    const{  userName, password } = this.state ;
    let userInfo = {
      userNo: userName,
      pwd: password, 
      token: 'vania'
    }
    let arr = [md5(userInfo.pwd.toString()).substring(2, md5(userInfo.pwd.toString()).length).toUpperCase(), 'vania']
    let pwd = '';
    arr.sort().map((item, index) => {
      return pwd += item;
    })
    userInfo.pwd = sha1(pwd);
    console.log(userInfo)
    this.props.dispatch({
      type: 'users/userLogin',
      payload: userInfo,
      callback: (data) =>{
      if(data.status)
        if (!data.result.userInfo) {
          message.error(data.result.loginResult)
        }else{
          this.props.history.push({pathname: `/home/${id}/${userInfo.userNo}/${userInfo.pwd}/false`})
        }
      }
    })
  }

  //登录
  onLogin = () => {
    this.setState( { loading:true })
    const{  userName, password, openid } = this.state ;
    if(userName!=="" && password!==""){
      let arr = [md5(password.toString()).substring(2, md5(password.toString()).length).toUpperCase(), 'vania']
      let pwd = '';
      arr.sort().map( (item, index) => {
        return pwd += item;
      })
      const userInfo = {
        name: userName,
        pwd: password,
        openid
      }
      this.props.dispatch({
        type: 'users/userBind',
        payload: userInfo,
        callback: (data) => {
          this.setState({ loading: false});
          if(!data.status){
            Toast.fail(data.msg,1)
          }else{
             this.userLogin(userInfo,data.result.userId)
          }
       }
      })
    }else{
      const userError = userName!==""?false : true;
      const pwdError = password!=="" ?false : true;
      this.setState({ loading: false,userError,pwdError});
    }
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
            <Button 
            type="primary" 
            // loading={this.state.loading} 
            onClick={this.userLogin.bind(this,{},'B449C3E60C174FF1B395F17783E47B51')} 
            style={{backgroundColor:"#485dfb"}}>登录</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state)(Login);