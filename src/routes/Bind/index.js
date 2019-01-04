/*
 * @Author: wwb 
 * @Date: 2019-01-04 10:53:21 
 * Desc: '绑定页面'
 * @Last Modified by: wwb
 * @Last Modified time: 2019-01-04 11:39:20
 */
import React, { PureComponent } from 'react';
import { Button } from 'antd-mobile';
import styles from './style.css';
import { connect } from 'dva';

class BindUser extends PureComponent{
  
  onBindUser = () =>{
    const openId = this.props.match.params.id;
    this.props.history.push({pathname: `/login/${openId}`})
  }
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.bulbWrap}>
          <div className={styles.bulb}></div>
        </div>
        <div className={styles.tooltip}>温馨提示</div>
        <div className={styles.bulbText}>
          未绑定账号，请到PC端个人中心-账户密码处绑定账号
        </div>
        <Button type='primary' onClick={this.onBindUser}>去绑定</Button>
      </div>
    )
  }
}
export default connect( state => state)(BindUser);