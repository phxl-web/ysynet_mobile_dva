/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 09:18:06 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-20 11:23:50
 * 我的送货单页面
 */

import React , { PureComponent } from 'react';
import { NavBar,Icon,SearchBar,Card, Button} from 'antd-mobile';
//  import { connect } from 'dva';
import styles from './style.css';
class Delivery extends PureComponent{
    render(){
      return (
        <div className={styles.container}>
          <NavBar
            mode="dark"
            leftContent={<Icon type="left"/>}
            rightContent={
              <span onClick={() => this.props.history.push({pathname:'/DeliveryInfo'})}>扫码</span>
            }
            onLeftClick={() => this.props.history.push({pathname:'/home'}) }
          >我的送货单</NavBar>
          <SearchBar placeholder="搜索" ref={ref => this.autoFocusInst = ref} />
          <Card full style={{marginBottom:"10px"}}>
            <Card.Header
              title="供应商名称"
              extra={<a>待验收</a>}
            />
            <Card.Body>
              <div>Txxxxxx等32件产品 <span className={styles.listPrice}>¥:7600</span></div>
            </Card.Body>
            <Card.Footer  extra={ <Button type="default" inline className={styles.checkDeliveryBtn} style={{border:'1px solid #26a2fa'}} onClick={() => this.props.history.push({pathname:'/CheckComplete'})}>验收通过</Button>} />
          </Card>
          <Card full>
            <Card.Header
              title="供应商名称"
              extra={<span>交易完成</span>}
            />
            <Card.Body>
              <div>xxxxxx等32件产品<span className={styles.listPrice}>¥:7600</span></div>
            </Card.Body>
            <Card.Footer content={<span>收货数量：30</span>}  extra={<Button type="default" inline className={styles.messageDeliveryBtn} onClick={() => this.props.history.push({pathname:'/Message'})} style={{border:'1px solid green'}}>评价</Button>} />
          </Card>

        </div>
      )
    }
 }

 export default Delivery