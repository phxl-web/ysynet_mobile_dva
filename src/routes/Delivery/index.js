/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 09:18:06 
 * @Last Modified by: xiangxue
 * @Last Modified time: 2019-12-02 10:08:19
 * 我的送货单页面
 */

import React, { PureComponent } from 'react';
// import { Card, Button,Flex,SearchBar} from 'antd-mobile';
import { Card, Button, Flex } from 'antd-mobile';
import { connect } from 'dva';
import ListViewScroll from '../../components/listViewScroll';
import styles from './style.css';
import { _local, MEQM } from '../../api/local';
class Delivery extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props, 'props');
    
    this.state = {
      url: `${_local}/delivery/rMobileSearchDeliveryList`,
      searchName: '',
      userId: this.props.match.params.userId,
      storageGuid: this.props.match.params.storageGuid,
    }
    
  }
  //根据不同的状态只显示不同的字体颜色
  handleFstateClass = (value) => {
    switch (value) {
      case "80":
        return { color: '#03c28f' };
      case "50":
        return { color: '#1688e8' };
      default:
        return { color: '#666' };
    }
  }



  handleFstateButtonClass = (value) => {
    switch (value) {
      case "80":
        return { color: '#03c28f', border: '1px solid #03c28f' };
      case "50":
        return { color: '#1688e8', border: '1px solid #1688e8' };
      default:
        return { color: '#666', border: '1px solid #666', display: 'none' };
    }
  }

  handleFstateButtonValue = (value) => {
    switch (value) {
      case "80":
        return "评价";
      case "50":
        return "验收通过";
      default:
        return "不显示";
    }
  }

  handlePassClick = (item) => {
    const { storageGuid, userId } = this.state;
    if (item.fstate === "50") {
      const sendId = [];
      sendId.push(item.sendId);
      this.props.dispatch({
        type: 'delivery/mobileDeliveryThrough',
        payload: { storageGuid: storageGuid, sendId: sendId },
        callback: (status) => {
          if (status) {
            this.props.history.push({ pathname: `/checkComplete/${item.sendId}/${userId}/${storageGuid}` })
          }
        }
      })
    } else if (item.fstate === "80") {
      this.props.history.push({ pathname: `/message/${item.sendId}/${userId}/${storageGuid}` })
    }
  }
  //拒收
  handleNoPassClick = (item) => {
    const { storageGuid, userId } = this.state;
    this.props.dispatch({
      type: 'delivery/mobileDeliveryNotThrough',
      payload: { storageGuid: storageGuid, sendId: item.sendId },
      callback: (status) => {
        if (status) {
          this.props.history.push({ pathname: `/checkComplete/${item.sendId}/${userId}/${storageGuid}` })
        }
      }
    })
  }


  handleUrl = (item) => {
    const { userId, storageGuid } = this.state;
    if (item.fstate === "50") {
      this.props.history.push({ pathname: `/deliveryInfo/${item.sendId}/${userId}/${storageGuid}/00` })
    } else {
      this.props.history.push({ pathname: `/deliveryDetails/${item.sendId}/${userId}/${storageGuid}` })
    }
  }
  render() {
    const { searchName, userId, storageGuid } = this.state;
    
    return (
      <div className={styles.container}>
        <Flex>
          <Flex.Item style={{ flex: 7 }}>
            {/* <SearchBar
              placeholder="搜索" 
              ref={ref => this.autoFocusInst = ref}
              onSubmit={ value => {
                this.setState({ searchName: value })
                //document.querySelector('.am-list-view-scrollview').scrollTo(0, 0);
              }}
            />  */}
          </Flex.Item>
          <Flex.Item>
            {/* {<span onClick={() =>  this.props.history.push({pathname:`/deliveryInfo/528C311E57C04927AC1636E86E0B4E94/1C258E0B42C944258CEAF90CB464698C/30B3920747E549BEA2F8CD91291C4D29`})}>扫码</span>} */}
            {/* {<span onClick={() => window.location.href= `${MEQM}/test/mobileScanQrcode?userId=${userId}&storageGuid=${storageGuid}`}><img src={require("../../assets/image/scan.svg")} alt="扫一扫" /></span>}    */}
            {<span onClick={() => window.location.href = `${MEQM}/test/mobileScanQrcode?userId=${userId}&storageGuid=${storageGuid}`}><img src={require("../../assets/image/scan.svg")} alt="扫一扫" /></span>}
          </Flex.Item>
        </Flex>
        <ListViewScroll
          url={this.state.url}
          queryParams={{
            rStorageGuid: storageGuid,
            searchParam: searchName,
            userId,

          }}
          item={item => {
            return (<Card full style={{ marginBottom: "10px" }}>
              <Card.Header
                onClick={this.handleUrl.bind(null, item)}
                title={<div><p className={styles.listCardTitle}>{item.fOrgName}</p><p className={styles.listDeliverNo}>{item.sendNo}</p></div>}
                extra={<span className={styles.listHeaderExtra} style={this.handleFstateClass(item.fstate)}>{item.sendFstate}</span>}
              />
              <Card.Body>
                <div><span className={styles.listProduct}>{item.detailNum}件产品</span> <span className={styles.listPrice}>¥:{item.totalPrice}</span></div>
              </Card.Body>
              <Card.Footer content={item.fstate === "80" ?
                <span className={styles.listNum}>收货数量: {item.detailCheckNum}</span> : null}
                extra={<div>
                  <Button type="default" inline className={styles.checkDeliveryBtn} style={this.handleFstateButtonClass(item.fstate)} onClick={this.handlePassClick.bind(null, item)}>{this.handleFstateButtonValue(item.fstate)}</Button>
                  {item.fstate === "50" ? <Button type='default' className={styles.checkNoDeliveryBtn} inline onClick={this.handleNoPassClick.bind(null, item)}>拒收</Button> : null}
                </div>
                }
              />
            </Card>
            )
          }} />
      </div>
    )
  }
}

export default connect(state => state)(Delivery);