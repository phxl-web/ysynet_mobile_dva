/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:21:21 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-09-05 16:40:52
 * 感谢评价
 */

import React , { PureComponent } from 'react';
import { Result, Button } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';

class ThankMessage extends PureComponent{
  state ={
    userId: this.props.match.params.userId,
    storageGuid: this.props.match.params.storageGuid,
  }
  render (){
    const { userId,storageGuid} = this.state;
    return(
      <div>
        <Result
        img={<img src={require("../../assets/image/smile.svg")} className={styles.nullIcon}  alt="" />}
        title="感谢评价"
        />
        <div className={styles.checkBtns}>
          <Button type="primary" inline onClick={() => this.props.history.push({pathname:`/Delivery/${userId}/${storageGuid}`})}>继续验收</Button>
        </div>
      </div>
    )
  }
}

export default connect(state =>  state)(ThankMessage);
