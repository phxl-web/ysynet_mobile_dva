/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 09:18:06 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-22 14:24:25
 * 我的送货单页面
 */

import React , { PureComponent } from 'react';
import { NavBar,Icon,SearchBar,Card, Button,Flex} from 'antd-mobile';
import { connect } from 'dva';
import ListViewScroll from '../../components/listViewScroll';
import styles from './style.css';
import { _local } from '../../api/local';
class Delivery extends PureComponent{

  //根据不同的状态只显示不同的字体颜色
  handleFstateClass = (value) => {
    switch (value){
      case "80" :
      return {color:'#03c28f'};
      case "50" :
      return {color:'#1688e8'};
      default : 
      return {color:'#666'};
    }
  }

  handleFstateButtonClass = (value) => {
    switch (value){
      case "80" :
      return {color:'#03c28f',border:'1px solid #03c28f'};
      case "50" :
      return {color:'#1688e8',border:'1px solid #1688e8'};
      default : 
      return {color:'#666',border:'1px solid #666',display:'none'};
    }
  }

  handleFstateButtonValue = (value) => {
    switch (value){
      case "80" :
      return "评价";
      case "50" :
      return "验收通过";
      default : 
      return "不显示";
    }
  }

  handleClick = (item) => {
      if(item.fstate === "50"){

      }else if(item.fstate === "80"){
        this.props.history.push({pathname: `/message/:${item.sendId}`})
      }
  }
  render(){
    const  rStorageGuid = this.props.users.userInfo.rStorageGuid;
    return (
      <div className={styles.container}>
        <Flex>
          <Flex.Item style={{flex:8}}><SearchBar placeholder="搜索" ref={ref => this.autoFocusInst = ref}/></Flex.Item>
          <Flex.Item><span onClick={() => this.props.history.push({pathname:'/DeliveryInfo/E250CD25C0B3473083E635D0816F821B'})}>扫码</span></Flex.Item>
        </Flex>
        <ListViewScroll
          url={`${_local}/delivery/rMobileSearchDeliveryList`}
          queryParams={{
              rStorageGuid: rStorageGuid,
          }}
          item={item => {
          return (<Card full style={{marginBottom:"10px"}}>
                    <Card.Header
                      title={<div><p className={styles.listCardTitle}>{item.rOrgName}</p><p className={styles.listDeliverNo}>{item.sendNo}</p></div>}
                      extra={<span className={styles.listHeaderExtra} style={this.handleFstateClass(item.fstate)}>{item.sendFstate}</span>}
                    />
                    <Card.Body>
                      <div><span className={styles.listProduct}>{item.detailNum}件产品</span> <span className={styles.listPrice}>¥:{item.totalPrice}</span></div>
                    </Card.Body>
                    <Card.Footer content={item.fstate === "80" ? <span  className={styles.listNum}>收货数量: {item.detailCheckNum}</span> : null}  extra={ <Button type="default" inline className={styles.checkDeliveryBtn} style={this.handleFstateButtonClass(item.fstate)} onClick={this.handleClick.bind(null,item)}>{this.handleFstateButtonValue(item.fstate)}</Button>} />
                  </Card>
          ) 
          }}/>
 
      </div>
    )
  }
 }

 export default connect(state =>  state)(Delivery);