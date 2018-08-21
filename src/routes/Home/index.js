/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-15 16:31:00 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-21 16:47:43
 * 主页
 */

import React, { PureComponent } from 'react';
import styles from './home.css';
import Profile from 'components/profile';
import Toolbar from 'components/toolbar';
import { Tabs, Grid } from 'antd-mobile';

const tabs = [
  { title: '采购中心库房' },
  { title:  '设备' }
];
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

const gridShebeiData = [
  { text: '报修', icon: require('../../assets/image/repair.svg') , pathname : '/ResultInfo'},
  { text: '转科', icon: require('../../assets/image/transfer.svg') , pathname : '/ResultInfo'},
  { text: '报废', icon: require('../../assets/image/scrap.svg'), pathname : '/ResultInfo' },
  { text: '申请', icon: require('../../assets/image/apply.svg') , pathname : '/ResultInfo'},
  { text: '更多', icon: require('../../assets/image/more.svg'), pathname : '/ResultInfo' },
];


class Home extends PureComponent {

  handleGridClick = (el,index) => {
   // console.log(this.props.history)
    this.props.history.push({pathname: el.pathname})
  }
  render() {
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
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div className={styles.tabsItem}>
              <Grid data={gridStorageData} hasLine={false} columnNum={4} activeClassName={styles.activeGridClass} onClick={this.handleGridClick}/>
            </div>
            <div className={styles.tabsItem}>
              <Grid data={gridShebeiData} hasLine={false} columnNum={4} activeClassName={styles.activeGridClass} onClick={this.handleGridClick}/>
            </div>
          </Tabs>
        </div>
        <Toolbar className={styles.toolbar_container}/>
      </div>
    )
  }
}

export default Home;