/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 10:11:16 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-31 11:03:22
 * 送货单信息页面
 */
import React , { PureComponent } from 'react';
import { Icon,List, Flex } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
const Item = List.Item;

class ErrorInfo extends PureComponent{
  state = {
    sendId: this.props.match.params.sendId,
    userId: this.props.match.params.userId,
    storageGuid: this.props.match.params.storageGuid,
  }

   setCookie = (c_name,value,expiredays)  =>{  
    var exdate=new Date()  
    exdate.setDate(exdate.getDate()+expiredays)  
    document.cookie=c_name+ "=" +escape(value)+  
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())  
  }  
   componentDidMount() {
    const sendId = this.state.sendId;
    const storageGuid = this.state.storageGuid;
    this.setCookie('userId',this.state.userId,365); 
    this.setCookie('storageGuid',this.state.storageGuid,365); 
    this.props.dispatch({
      type: 'users/getUserInfo',
      payload: { userId :  this.state.userId },
      callback: (data) => {
      }
    })
  }




  render (){
    const { data } = this.state;
    return (
      <div className={styles.container}>
            <Result
            img={ <Icon type="check-circle" className={styles.nullIcon} style={{ fill: '#fc6621' }} />}
            title={"错误信息"}
            message={
              <div className={styles.checkMessage}>
                <p>无效送货单</p>
              </div>
            }
            />
      </div>
    )
  }
}

export default connect(state =>  state)(ErrorInfo);