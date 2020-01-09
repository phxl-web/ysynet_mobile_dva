/*
 * @Author: gaofengjiao 
 * @Date: 2019-03-26 18:19:23 
 * @Last Modified by: xiangxue
 * @Last Modified time: 2019-12-27 10:41:10
 * 扫码--手术送货单
 */
import React, { PureComponent } from 'react';
import { Flex, List } from 'antd-mobile';
import { connect } from 'dva';
import styles from './../Delivery/style.css';
const Item = List.Item;
const Brief = Item.Brief;
class OperDelivery extends PureComponent {
  state = {
    sendId: this.props.match.params.sendId,
    userId: this.props.match.params.userId,
    isSign: this.props.match.params.isSign,
    storageGuid: this.props.match.params.storageGuid,
    treeData: [],
    userName: this.props.users.userInfo.userNo,
    pwd: this.props.users.userInfo.pwd,
  }

  componentDidMount() {
    const { sendId, userId } = this.state;
    console.log(this.props.users.userInfo, " this.props")
    this.props.dispatch({
      type: 'delivery/findOperPackageDetail',
      payload: { sendId, userId },
      callback: (data) => {
        this.setState({ treeData: data })
      }
    })
  }
  handleAmount = (data) => {
    let sum = 0;
    data.map(item => {
      if (item.tfAmount) {
        sum += Number(item.tfAmount)
      }
      return null

    })
    return sum;
  }

  handleTotalPrice = (data) => {
    const { productDataSource } = data;
    let pSum = 0;
    productDataSource.map(item => {
      if (item.tfAmount && item.purchasePrice) {
        pSum += Number(item.tfAmount) * Number(item.purchasePrice)
      }
      return null
    });
    return pSum.toFixed(4);
  }

  handlePassClick = () => {
    const { storageGuid, userId, sendId } = this.state;
    this.props.dispatch({
      type: 'delivery/checkOperDeliveryAudit',
      payload: { sendId: sendId, fstae: "00", userId },
      callback: (data) => {
        this.props.history.push({ pathname: `/checkComplete/${sendId}/${userId}/${storageGuid}` })
      }
    })
  }
  //拒收
  handleNoPassClick = () => {
    const { storageGuid, userId, sendId } = this.state;
    this.props.dispatch({
      type: 'delivery/checkOperDeliveryAudit',
      payload: { sendId: sendId, fstae: "01", userId },
      callback: () => {
        this.props.history.push({ pathname: `/checkComplete/${sendId}/${userId}/${storageGuid}` })
      }
    })
  }
  handleMore = (index) => {
    const { sendId, userId, storageGuid, isSign } = this.state;
    this.props.history.push({ pathname: `/OperDelivery/details/${sendId}/${userId}/${storageGuid}/${isSign}/${index}` });
  }


  render() {
    const { treeData } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.infoContent}>
          {
            treeData && treeData.length ?
              treeData.map((item, index) => {
                if (item) {
                  return <List key={item.packageId}>
                    <Item arrow="horizontal" onClick={() => this.handleMore(index)}>手术包{`${index + 1}`}</Item>
                    <Item extra={<span>总价:{this.handleTotalPrice(item)}</span>} align="bottom" multipleLine>
                      <Brief>植入物总数:{this.handleAmount(item.productDataSource)}</Brief>
                      <Brief>外来器总数:{this.handleAmount(item.toolsListDataSource)}</Brief>
                    </Item>
                  </List>
                }
                return null

              })
              :
              null
          }
        </div>
        <div className={styles.infoFooter}>
          <Flex style={{ borderTop: "1px solid #eee" }}>
            <Flex.Item><span className={styles.infoRightBtn} onClick={this.handlePassClick}>签收通过</span></Flex.Item>
            <Flex.Item><span className={styles.infoLeftBtn} onClick={this.handleNoPassClick}>不通过</span></Flex.Item>
          </Flex>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(OperDelivery);