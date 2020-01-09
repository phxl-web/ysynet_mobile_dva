/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-15 16:31:00 
 * @Last Modified by: xiangxue
 * @Last Modified time: 2019-12-31 10:19:52
 * 主页
 */

import React, { PureComponent } from 'react';
import { Grid, Picker, List, } from 'antd-mobile';
import { connect } from 'dva';
import styles from './home.css';
import Profile from 'components/profile';
import { MEQM } from '../../api/local';

class Home extends PureComponent {
  state = {
    storageData: [],
    tabs: [],
    userInfo: {},
    storageGuid: '',
    userId: this.props.match.params.userId,
    currentTab: [],
  }
  componentDidMount = () => {
    const { userId } = this.state;
    this.genUserInfo(userId);
    this.genStorage(userId, () => {
      this.getMenuByUserId(userId);
    });
  }
  getMenuByUserId = (userId) => { // 获取菜单
    // const { userInfo, storageGuid } = this.state;
    this.props.dispatch({
      type: 'users/getMobilMenuByUserId',
      payload: { userId: userId, token: 'vania' },
      callback: (data) => {
        const gridStorageData = data && data.map(item => {
          const icon = item.MENU_REMARK;
          let pathname = '';
          // 质检和科室管理直接调用扫码功能
          if (item.MENU_URL === '/qualityTest') {
            pathname = `${MEQM}/test/mobileScanPackQrcode`
          } else if (item.MENU_URL === '/deptCheck') {
            pathname = `${MEQM}/test/mobileScanSignSendQrcode`
          } else {
            pathname = `${item.MENU_URL}`;
          }
          return {
            text: item.MENU_NAME,
            icon: require(`../../assets/image/${icon}.svg`),
            pathname
          }
        });
        this.setState({ gridStorageData, userId })
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

  genStorage = (userId, fn) => {
    this.props.dispatch({
      type: 'users/getStorages',
      payload: { userId: userId, token: 'vania' },
      callback: (data) => {
        const tabs = [];
        data && data.length && data.map((item, index) => {
          return tabs.push({ label: item.STORAGE_NAME, value: item.value });
        })
        this.setState({
          storageData: data,
          tabs,
          storageGuid: data && data[0] ? data[0].value : '',
          currentTab: [data && data[0] ? data[0].value : '']
        }, () => {
          fn && fn()
        })
      }
    })
  }
  handleOnTabClick = (tab, index) => {
    this.setState({ storageGuid: tab[0], currentTab: tab })
  }

  handleGridClick = (el, index) => {
    //质检的pathname要为二维码扫一扫的链接
    const { userInfo, storageGuid, userId } = this.state;
    const pathName = el.pathname.indexOf('mobileScanPackQrcode') > -1 || el.pathname.indexOf('mobileScanSignSendQrcode') > -1;
    if (pathName) {
      window.location.href = `${el.pathname}?userId=${userId}&storageGuid=${storageGuid}`
    } else if (el.pathname.indexOf('surgeryApplication') > -1) {
      this.props.history.push({ pathname: `${el.pathname}/${userId}/${storageGuid}/${userInfo.orgId}` })
    } else {
      this.props.history.push({ pathname: `${el.pathname}/${userId}/${storageGuid}` })
    }
  }

  render() {
    const { tabs, userInfo, gridStorageData, currentTab } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Profile title={userInfo.orgName} extra={userInfo.userName} tag={userInfo.jobNum} avatar={userInfo.headImgUrl} />
        </div>
        <div className={styles.footer}>
          <List>
            <Picker
              data={tabs}
              value={currentTab}
              cols={1}
              onChange={this.handleOnTabClick}
            >
              <List.Item arrow="horizontal">当前库房：</List.Item>
            </Picker>
          </List>
          <Grid data={gridStorageData} hasLine={false} columnNum={4} activeClassName={styles.activeGridClass} onClick={this.handleGridClick} />
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Home);