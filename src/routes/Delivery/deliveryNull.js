/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 10:43:06 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-16 14:33:36
 * 无效的送货单信息
 */

import React , { PureComponent } from 'react';
import { NavBar, Icon,Result} from 'antd-mobile';
import styles from './style.css';

class DeliveryNull extends PureComponent{
  render (){
    return (
      <div className={styles.container}>
        <NavBar
        mode="dark"
        leftContent={<Icon type="left"/>}
        onLeftClick={() => this.props.history.push({pathname:'/Delivery'}) }
        ></NavBar>
        <Result
        img={<Icon type="cross-circle-o" className={styles.nullIcon} style={{ fill: '#666' }} />}
        title="无效的送货单"
        />
      </div>
    )
  }
}
export default DeliveryNull;
