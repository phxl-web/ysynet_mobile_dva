/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:21:21 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-20 11:25:45
 * 感谢评价
 */

import React , { PureComponent } from 'react';
import { NavBar, Icon, Result, Button } from 'antd-mobile';
import styles from './style.css';

class ThankMessage extends PureComponent{
  render (){
    return(
      <div>
        <NavBar
          mode="dark"
          leftContent={<Icon type="left"/>}
          rightContent={
            <span onClick={() => this.props.history.push({pathname:'/Delivery'})}>完成</span>
          }
          onLeftClick={() => this.props.history.push({pathname:'/Delivery'}) }
        >感谢评价</NavBar>
        <Result
        img={<img src={require("../../assets/image/smile.svg")} className={styles.nullIcon}  alt="" />}
        title="感谢评价"
        />
        <div className={styles.checkBtns}>
          <Button type="primary" inline onClick={() => this.props.history.push({pathname:'/Delivery'})}>继续验收</Button>
        </div>
      </div>
    )
  }
}

export default ThankMessage;
