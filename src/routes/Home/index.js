/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-15 16:31:00 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-24 09:40:15
 * 主页
 */

import React, { PureComponent } from 'react';
import { Tabs, Grid } from 'antd-mobile';
import { connect } from 'dva';
import styles from './home.css';
import Profile from 'components/profile';
import Toolbar from 'components/toolbar';


const gridDaibanData = [
  { text: '验收', icon: require('../../assets/image/check.svg') , pathname : '/result'},
  { text: '审批', icon: require('../../assets/image/approval.svg') , pathname : '/result'},
];
const gridStorageData = [
  { text: '我的订单', icon: require('../../assets/image/order.svg') , pathname : '/result' },
  { text: '我的送货单', icon: require('../../assets/image/delivery.svg') , pathname : '/delivery'},
  { text: '我的供应商', icon: require('../../assets/image/supplier.svg'), pathname : '/result' },
  { text: '我的产品', icon: require('../../assets/image/product.svg'), pathname : '/result' },
  { text: '我的发票', icon: require('../../assets/image/invoice.svg') , pathname : '/result'},
  { text: '审批管理', icon: require('../../assets/image/checkmgm.svg') , pathname : '/result'},
  { text: '意见反馈', icon: require('../../assets/image/feedback.svg'), pathname : '/result' },
];

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
    tabs : [],
  }
  componentDidMount =()=>{
    this.props.dispatch({
      type: 'users/getStorages',
      callback: (data) => {
        const tabs = [];
        data.map((item,index) => {
         return tabs.push({title: item.STORAGE_NAME,value: item.value});
        })
        this.props.users.userInfo.rStorageGuid = data[0].value;
       this.setState({ storageData: data,tabs})
      }
    })
  }
  handleOnTabClick = (tab, index) =>{
    this.props.users.userInfo.rStorageGuid = tab.value;
  }

  handleGridClick = (el,index) => {
    this.props.history.push({pathname: el.pathname})
  }

  render() {
    const { tabs } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Profile title='美丽的Vania' extra='萌萌的拖鞋酱' tag='达纳苏斯' onRightClick={() => alert('go right')}/>
        </div>
        <div className={styles.titleBox}>
            <span className={styles.title}>我的待办</span>
            <Grid data={gridDaibanData} hasLine={false} columnNum={4} activeClassName={styles.activeGridClass}/>
        </div>
        <div className={styles.footer}>
          <Tabs tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={this.handleOnTabClick}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          >
            <div className={styles.tabsItem}>
              <Grid data={gridStorageData} hasLine={false} columnNum={4} activeClassName={styles.activeGridClass} onClick={this.handleGridClick}/>
            </div>
            <div className={styles.tabsItem}>
              <Grid data={gridStorageData} hasLine={false} columnNum={4} activeClassName={styles.activeGridClass} onClick={this.handleGridClick}/>
            </div>
          </Tabs>
        </div>
        <Toolbar className={styles.toolbar_container}/>
      </div>
    )
  }
}

export default connect(state =>  state)(Home);