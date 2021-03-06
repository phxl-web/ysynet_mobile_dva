/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-15 16:31:00 
 * @Last Modified by: xiangxue
 * @Last Modified time: 2019-12-24 11:42:43
 * 主页
 */

import React, { PureComponent } from 'react';
import { Tabs, Grid } from 'antd-mobile';
import { connect } from 'dva';
import styles from './home.css';
import Profile from 'components/profile';
import { MEQM } from '../../api/local';

// import Toolbar from 'components/toolbar';
// const gridShebeiData = [
//   { text: '报修', icon: require('../../assets/image/repair.svg') , pathname : '/ResultInfo'},
//   { text: '转科', icon: require('../../assets/image/transfer.svg') , pathname : '/ResultInfo'},
//   { text: '报废', icon: require('../../assets/image/scrap.svg'), pathname : '/ResultInfo' },
//   { text: '申请', icon: require('../../assets/image/apply.svg') , pathname : '/ResultInfo'},
//   { text: '更多', icon: require('../../assets/image/more.svg'), pathname : '/ResultInfo' },
// ];


class Home extends PureComponent {
  state = {
    storageData: [],
    tabs: [],
    userInfo: {},
    storageGuid: '',
    userId: this.props.match.params.userId,
  }
  componentDidMount = () => {
    console.log(this.props.users)
    const { userId } = this.state;
    this.genUserInfo(userId);
    this.genStorage(userId);
    this.getMenuByUserId(userId);
  }
  getMenuByUserId=(userId)=>{
    this.props.dispatch({
      type: 'users/getUserInfo',
      payload: { userId: userId, token: 'vania' },
      callback: (data) => {
        this.setState({ userInfo: data })
      }
    })
  }
  genUserInfo = (userId) => {
    this.props.dispatch({
      type: 'users/getUserInfo',
      payload: { userId: userId, token: 'vania' },
      callback: (data) => {
        this.setState({ userInfo: data })
      }
    })
  }

  genStorage = (userId) => {
    this.props.dispatch({
      type: 'users/getStorages',
      payload: { userId: userId, token: 'vania' },
      callback: (data) => {
        const tabs = [];
        data.map((item, index) => {
          return tabs.push({ title: item.STORAGE_NAME, value: item.value });
        })
        this.setState({ storageData: data, tabs, storageGuid: data[0].value })
      }
    })
  }
  handleOnTabClick = (tab, index) => {
    this.setState({ storageGuid: tab.value })
  }

  handleGridClick = (el, index) => {
    //质检的pathname要为二维码扫一扫的链接
    const pathName = el.pathname.indexOf('mobileScanPackQrcode') > -1 || el.pathname.indexOf('mobileScanSignSendQrcode') > -1;
    if (pathName) {
      window.location.href = el.pathname
    } else {
      this.props.history.push({ pathname: el.pathname })
    }
  }

  render() {
    const { tabs, userInfo, storageGuid, userId } = this.state;
    const gridStorageData = [
      // { text: '我的订单', icon: require('../../assets/image/order.svg') , pathname : '/result' },
      { text: '手术跟台申请', icon: require('../../assets/image/product.svg'), pathname: `/surgeryApplication/${userId}/${storageGuid}/${userInfo.orgId}` },
      { text: '我的送货单', icon: require('../../assets/image/delivery.svg'), pathname: `/delivery/${userId}/${storageGuid}` },
      //{ text: '质检', icon: require('../../assets/image/delivery.svg') , pathname : `/qualityTest/BZ0018218112000001/${userId}/${storageGuid}`},
      { text: '质检', icon: require('../../assets/image/product.svg'), pathname: `${MEQM}/test/mobileScanPackQrcode?userId=${userId}&storageGuid=${storageGuid}` },
      { text: '科室验收', icon: require('../../assets/image/scan.svg'), pathname: `${MEQM}/test/mobileScanSignSendQrcode?userId=${userId}&storageGuid=${storageGuid}` },
      // { text: '我的产品', icon: require('../../assets/image/product.svg'), pathname : '/result' },
      // { text: '我的发票', icon: require('../../assets/image/invoice.svg') , pathname : '/result'},
      // { text: '审批管理', icon: require('../../assets/image/checkmgm.svg') , pathname : '/result'},
      // { text: '意见反馈', icon: require('../../assets/image/feedback.svg'), pathname : '/result' },
    ];

    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Profile title={userInfo.orgName} extra={userInfo.userName} tag={userInfo.jobNum} avatar={userInfo.headImgUrl} />
        </div>
        <div className={styles.footer}>
          <Tabs tabs={tabs}
            tabBarTextStyle={{ 'whiteSpace': 'nowrap' }}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={this.handleOnTabClick}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          >
            {
              tabs.map((item, index) => {
                return <div className={styles.tabsItem} key={index}>
                  <Grid data={gridStorageData} hasLine={false} columnNum={4} activeClassName={styles.activeGridClass} onClick={this.handleGridClick} />
                </div>
              })
            }
          </Tabs>
        </div>
        {/* <Toolbar className={styles.toolbar_container}/> */}
      </div>
    )
  }
}

export default connect(state => state)(Home);