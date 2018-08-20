/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:16:33 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-20 11:20:30
 * 验收完成
 */

 import React , { PureComponent } from 'react';
 import { NavBar, Icon, Result, Button } from 'antd-mobile';
 import styles from './style.css';

 class CheckComplete extends PureComponent {
  //  验收通过   图标颜色26a2fa
  //拒收 图标颜色 
   render () {
     return (
      <div className={styles.container}>
        <NavBar
        mode="dark"
        leftContent={<Icon type="left"/>}
        onLeftClick={() => this.props.history.push({pathname:'/DeliveryCheck'}) }
        >验收完成</NavBar>
        <Result
        img={<Icon type="check-circle" className={styles.nullIcon} style={{ fill: '#26a2fa' }} />}
        title="验收完成"
        message={
          <div className={styles.checkMessage}>
            <p>送货单号：GD00015180700016ZJ</p>
            <p>供应商：西安志达科技有限责任公司</p>
            <p>验收员：长小年</p>
            <p>验收时间：2018-07-19 09:41:42</p>
          </div>
        }
        />
        <div className={styles.checkBtns}>
          <Button type="default" inline className={styles.supBtn} onClick={() => this.props.history.push({pathname:'/ResultInfo'})}  style={{border:'1px solid #666'}}>联系供应商</Button>
          <Button type="default" inline className={styles.messageBtn} onClick={() => this.props.history.push({pathname:'/Message'})} style={{border:'1px solid #26a2fa'}}>评价</Button>
          <Button type="default" inline className={styles.goBtn} onClick={() => this.props.history.push({pathname:'/Delivery'})} style={{border:'1px solid green'}}>继续验收</Button>
        </div>
      </div>
     )
   }
 }

 export default CheckComplete;
