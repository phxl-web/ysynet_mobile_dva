/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-20 10:44:41 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-20 10:53:51
 * 建设中页面
 */
import React, { PureComponent} from 'react';
import {  NavBar ,Icon } from 'antd-mobile';
import styles from './result.css';

class ResultInfo extends PureComponent{
  render(){
    return(
      <div>
        <NavBar
        mode="dark"
        leftContent={<Icon type="left"/>}
        onLeftClick={() => this.props.history.push({pathname:'/home'}) }
        >正在建设中</NavBar>
        <img src={require("../../assets/image/construction.svg")}  alt="正在建设中" className={styles.imgInfo}/>
        <h3 className={styles.title}>页面正在建设中...</h3>
      </div>
    )
  }
}

export default ResultInfo;
