/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 09:18:06 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-27 17:14:31
 * 我的送货单页面
 */

import React , { PureComponent } from 'react';
import { SearchBar,Card, Button,Flex} from 'antd-mobile';
import { connect } from 'dva';
import ListViewScroll from '../../components/listViewScroll';
import styles from './style.css';
import { _local } from '../../api/local';
class Delivery extends PureComponent{
  state = {
    url: `${_local}/delivery/rMobileSearchDeliveryList`
  }
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

  handlePassClick = (item) => {
    if(item.fstate === "50"){
      const storageGuid = this.props.users.userInfo.rStorageGuid;
      const sendIds = [];
      sendIds.push(item.sendId);
      this.props.dispatch({
        type: 'delivery/mobileDeliveryThrough',
        payload: { storageGuid: storageGuid,sendIds: sendIds},
        callback: () => {
          this.props.history.push({pathname: `/checkComplete/${item.sendId}`})
        }
     })}else if(item.fstate === "80"){
        this.props.history.push({pathname: `/message/${item.sendId}`})
      }
  }
  //拒收
  handleNoPassClick = (item) => {
    const storageGuid = this.props.users.userInfo.rStorageGuid || this.props.match.params.rStorageGuid;
    const sendIds = [];
    sendIds.push(item.sendId);
    this.props.dispatch({
      type: 'delivery/mobileDeliveryNotThrough',
      payload: { storageGuid: storageGuid,sendIds: sendIds},
      callback: () => {
        this.props.history.push({pathname: `/checkComplete/${item.sendId}`})
      }
    })
  }
  

  handleUrl= (item) =>{
    this.props.history.push({pathname: `/deliveryDetails/${item.sendId}`})
  }
  render(){
    const  rStorageGuid = this.props.users.userInfo.rStorageGuid;
    const userId = this.props.users.userInfo.userId;
    const { searchName } = this.state;
    return (
      <div className={styles.container}>
        <Flex>
          <Flex.Item style={{flex:7}}>
            <SearchBar
              placeholder="搜索" 
              onChange={value =>this.setState({ searchName: value })}
              ref={ref => this.autoFocusInst = ref}
              onSubmit={value => {
                document.querySelector('.am-list-view-scrollview').scrollTo(0, 0);
                this.setState({ searchName: value })
              }}
            />
          </Flex.Item>
          <Flex.Item>
             {<span onClick={() => window.location.href= `http://zzy6gz.natappfree.cc/meqm/test/mobileScanQrcode?userId=${userId}`}><img src={require("../../assets/image/scan.svg")} alt="扫一扫" /></span>} 
            {/* {<span onClick={() =>  this.props.history.push({pathname:`/deliveryInfo/32E67F0B75944C8CB124BA2E898CACFF`})}>扫码</span>} */}
          </Flex.Item>
        </Flex>
        <ListViewScroll
          url={this.state.url}
          queryParams={{
            rStorageGuid: rStorageGuid,
            searchParam: searchName
          }}
          item={item => {
          return (<Card full style={{marginBottom:"10px"}}>
                    <Card.Header
                      onClick={this.handleUrl.bind(null,item)}
                      title={<div><p className={styles.listCardTitle}>{item.rOrgName}</p><p className={styles.listDeliverNo}>{item.sendNo}</p></div>}
                      extra={<span className={styles.listHeaderExtra} style={this.handleFstateClass(item.fstate)}>{item.sendFstate}</span>}
                    />
                    <Card.Body>
                      <div><span className={styles.listProduct}>{item.detailNum}件产品</span> <span className={styles.listPrice}>¥:{item.totalPrice}</span></div>
                    </Card.Body>
                    <Card.Footer content={item.fstate === "80" ? 
                    <span  className={styles.listNum}>收货数量: {item.detailCheckNum}</span> : null}  
                    extra={<div>
                            <Button type="default" inline className={styles.checkDeliveryBtn} style={this.handleFstateButtonClass(item.fstate)} onClick={this.handlePassClick.bind(null,item)}>{this.handleFstateButtonValue(item.fstate)}</Button> 
                            {item.fstate === "50" ? <Button  type='default' className={styles.checkNoDeliveryBtn}  inline onClick={this.handleNoPassClick.bind(null,item)}>拒收</Button>:null }
                            </div>
                          }
                    />
                  </Card>
          ) 
          }}/>
      </div>
    )
  }
 }

 export default connect(state =>  state)(Delivery);