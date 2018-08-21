/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 09:18:06 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-21 16:43:58
 * 我的送货单页面
 */

import React , { PureComponent } from 'react';
import { NavBar,Icon,SearchBar,Card, Button,Toast} from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
class Delivery extends PureComponent{
  state ={
    rStorageGuid: "08497F2122BA411DA4A47DE133D4C353",
    dataSource: []
  }
  
  UNSAFE_componentWillMount = () =>{
    this.getDeliveryList(this.state.rStorageGuid);
  }
  getDeliveryList = (value) =>{
    this.props.dispatch({
      type: 'delivery/mobileDeliveryList',
      payload: { rStorageGuid: value ? value: '' },
      callback: (data) => {
        this.setState({ loading: false});
        if(!data.rows){
          Toast.fail("无数据",1)
        }else{
          this.setState( { dataSource : data.rows})
        }
      }
    });
  }
  render(){
    console.log(this.state.dataSource)
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
            title={<span className={styles.listCardTitle}>供应商名称</span>}
            extra={<a>待验收</a>}
          />
          <Card.Body>
            <div>Txxxxxx等32件产品 <span className={styles.listPrice}>¥:7600</span></div>
          </Card.Body>
          <Card.Footer  extra={ <Button type="default" inline className={styles.checkDeliveryBtn} style={{border:'1px solid #26a2fa'}} onClick={() => this.props.history.push({pathname:'/CheckComplete'})}>验收通过</Button>} />
        </Card>
        <Card full>
          <Card.Header
            title={<span className={styles.listCardTitle}>供应商名称</span>}
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

 export default connect(state =>  state)(Delivery);