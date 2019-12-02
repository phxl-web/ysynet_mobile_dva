/*
 * @Author: xiangxue 
 * @Date: 2019-11-28 16:06:04 
 * @Last Modified by: xiangxue
 * @Last Modified time: 2019-12-02 11:43:41
 * @page - 手术跟台申请
 */


import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import { Card, Button, Flex, SearchBar, Picker, List, Toast, Modal } from 'antd-mobile';
import { connect } from 'dva';
import ListViewScroll from '../../components/listViewScroll';
import styles from './style.css';
import { _local } from '../../api/local';

const alert = Modal.alert;
//01待转发 02已转发 03已驳回
const statusData = [
  {
    label: '待转发 ',
    value: '01',
  },
  {
    label: '已转发',
    value: '02',
  },
  {
    label: '已驳回',
    value: '03',
  }
]
class SurgeryApplication extends PureComponent {
  constructor(props) {
    super(props);
    this.url = `${_local}/hisOrder/queryHisOrderList`;
    this.userId = this.props.match.params.userId;
    this.storageGuid = this.props.match.params.storageGuid;
    this.orgId = this.props.match.params.orgId;
    this.state = {
      query: {
        searchName: '',
        orgId: this.orgId,
      },
      detpData: []
    }
  }
  componentDidMount = () => {
    this.getDetpData()
  }
  getDetpData = () => {
    console.log(this.props)
    this.props.dispatch({
      type: 'SurgeryApplication/searchDeptInfoList',
      payload: { isPager: false, orgId: this.orgId },
      callback: (data) => {
        if (data.status) {
          this.setState({
            detpData: data.result.rows.map(item => ({ label: item.deptName, value: item.deptGuid }))
          })
        } else {
          Toast.fail(data.msg || "获取信息失败")
        }
      }
    })
  }

  // 确认or拒收
  handleClick = (item, state) => {
    const actionText = state === '02' ? '确认' : '驳回'
    alert(`提示`, `是否${actionText}?`, [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => this.sureDispatch(item, state) },
    ])
  }
  sureDispatch = (item, state) => {
    this.props.dispatch({
      type: 'SurgeryApplication/updateHisOrder',
      payload: {
        planNo: [item.planNo], fstate: state
      },
      callback: (status) => {
        if (status) {
          // this.setState({ query: { ...this.state.query } });
          this.lv.onRefresh();
        }
      }
    })
  }
  handleUrl = (item) => {
    this.props.history.push({ pathname: `/surgeryApplicationDetails/${item.planNo}/${this.userId}/${this.storageGuid}/${this.orgId}` })
  }

  //状态颜色及名称 01待转发 02已转发 03已驳回
  fState = (state) => {
    switch (state) {
      case "01":
        return <span style={{ color: '#03c28f' }} className={styles.listHeaderExtra}>待转发</span>;
      case "02":
        return <span style={{ color: '#1688e8' }} className={styles.listHeaderExtra}>已转发</span>;
      case "03":
        return <span style={{ color: '#1688e8' }} className={styles.listHeaderExtra}>已驳回</span>;
      default:
        return <span />;
    }
  }
  render() {
    const { query, detpData } = this.state;
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.surgeryApplication}>
        <Flex>
          <Flex.Item style={{ flex: 7 }}>
            <SearchBar
              placeholder="搜索"
              ref={node => this.autoFocusInst = node}
              onSubmit={value => {
                this.setState({ query: { ...query, searchName: value } })
              }}
            />
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>
            <Picker
              data={statusData}
              cols={1}
              {...getFieldProps('fstate')}
              className="forss"
              title="选择状态"
              extra="状态"
              onOk={v => this.setState({ query: { ...query, fstate: v } })}
            >
              <List.Item></List.Item>
            </Picker>
          </Flex.Item>
          <Flex.Item>
            <Picker
              data={detpData}
              cols={1}
              {...getFieldProps('dateName')}
              className="forss"
              title="选择申请科室"
              extra="申请科室"
              onOk={v => this.setState({ query: { ...query, dateName: v } })}
            >
              <List.Item></List.Item>
            </Picker>
          </Flex.Item>
        </Flex>
        <ListViewScroll
          ref={node => this.lv = node}
          url={this.url}
          queryParams={{ ...query }}
          item={item => {
            return (<Card full style={{ marginBottom: "10px" }}>
              <Card.Header
                onClick={this.handleUrl.bind(null, item)}
                title={<div><p className={styles.listCardTitle}>科室申请单号：{item.planNo}</p></div>}
                extra={this.fState(item.fstate)}
              />
              <Card.Body>
                <div>
                  <p className={styles.listProduct}>申请科室名称：{item.storageName}</p>
                  <p className={styles.listProduct}>制单日期：{item.orderDate}</p>
                </div>
              </Card.Body>
              <Card.Footer content={
                <a className={styles.listNum} onClick={this.handleUrl.bind(null, item)}>查看详情</a>}
                extra={item.fstate === '01' && <div>
                  <Button
                    type="default"
                    inline
                    className={styles.checkDeliveryBtn}
                    onClick={this.handleClick.bind(null, item, '02')}
                  >
                    确认转发
                  </Button>
                  <Button
                    type='default'
                    className={styles.checkNoDeliveryBtn}
                    inline
                    onClick={this.handleClick.bind(null, item, '03')}
                  >
                    拒收
                  </Button>
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
const WrapperSurgeryApplication = createForm()(SurgeryApplication);
export default connect(state => state)(WrapperSurgeryApplication);