/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-15 16:31:00 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-09-04 11:06:31
 * 主页
 */

import React, { PureComponent } from 'react';
import { Tabs, Grid } from 'antd-mobile';
import { connect } from 'dva';
import styles from './home.css';
import Profile from 'components/profile';
import Toolbar from 'components/toolbar';

const gridStorageData = [
  // { text: '我的订单', icon: require('../../assets/image/order.svg') , pathname : '/result' },
  { text: '我的送货单', icon: require('../../assets/image/delivery.svg') , pathname : '/delivery'},
  // { text: '我的供应商', icon: require('../../assets/image/supplier.svg'), pathname : '/result' },
  // { text: '我的产品', icon: require('../../assets/image/product.svg'), pathname : '/result' },
  // { text: '我的发票', icon: require('../../assets/image/invoice.svg') , pathname : '/result'},
  // { text: '审批管理', icon: require('../../assets/image/checkmgm.svg') , pathname : '/result'},
  // { text: '意见反馈', icon: require('../../assets/image/feedback.svg'), pathname : '/result' },
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
    userInfo: {}
  }
  componentDidMount =()=>{
    const userId = this.props.users.userInfo.userId || this.getCookie('userId');
    this.props.dispatch({
      type: 'users/getUserInfo',
      payload: { userId : userId},
      callback: (data) => {
       this.setState({ userInfo: data})
      }
    })
    this.props.dispatch({
      type: 'users/getStorages',
      callback: (data) => {
        const tabs = [];
        data.map((item,index) => {
         return tabs.push({title: item.STORAGE_NAME,value: item.value});
        })
        this.props.users.userInfo.rStorageGuid = data[0].value;
        this.setCookie('userId',userId,365); 
        this.setCookie('storageGuid',data[0].value,365); 
       this.setState({ storageData: data,tabs})
      }
    })
  }

  setCookie = (c_name,value,expiredays)  =>{  
    var exdate=new Date()  
    exdate.setDate(exdate.getDate()+expiredays)  
    document.cookie=c_name+ "=" +escape(value)+  
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())  
  }  

  getCookie = (c_name) => {  
    if (document.cookie.length>0)  
    {  
    let  c_start=document.cookie.indexOf(c_name + "=")  
    if (c_start!==-1)  
    {   
      c_start=c_start + c_name.length+1   
      let c_end=document.cookie.indexOf(";",c_start)  
      if (c_end===-1) c_end=document.cookie.length  
      return unescape(document.cookie.substring(c_start,c_end))  
      }   
    }  
    return ""  
  }
  handleOnTabClick = (tab, index) =>{
    this.props.users.userInfo.rStorageGuid = tab.value;
    this.setCookie('storageGuid',tab.value,365); 
  }

  handleGridClick = (el,index) => {
    this.props.history.push({pathname: el.pathname})
  }

  render() {
    const userInfo = this.state.userInfo;
    const { tabs } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Profile title={userInfo.orgName} extra={userInfo.userName} tag={userInfo.jobNum} />
        </div>
        <div className={styles.footer}>
          <Tabs tabs={tabs}
            tabBarTextStyle ={{'whiteSpace':'nowrap'}}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={this.handleOnTabClick}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          >
            {
              tabs.map((item,index) => {
                return  <div className={styles.tabsItem} key={index}>
                          <Grid data={gridStorageData} hasLine={false} columnNum={4} activeClassName={styles.activeGridClass} onClick={this.handleGridClick}/>
                      </div>
              })
            }
          
          </Tabs>
        </div>
        <Toolbar className={styles.toolbar_container}/>
      </div>
    )
  }
}

export default connect(state =>  state)(Home);