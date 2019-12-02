/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:22:50 
 * @Last Modified by: xiangxue
 * @Last Modified time: 2019-11-29 17:29:39
 * 送货单详情
 */
import React, { PureComponent } from 'react';
import { List, Flex, Icon, Toast, Modal } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
const alert = Modal.alert;
const Item = List.Item;
class DeliveryDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.userId = this.props.match.params.userId;
    this.storageGuid = this.props.match.params.storageGuid;
    this.orgId = this.props.match.params.orgId;
    this.planNo = this.props.match.params.planNo;
    this.state = {
      baseInfo: {}
    }
  }

  componentDidMount = () => {
    this.getSurgeryInfo();
  }
  componentDidUpdate() {
    document.body.style.overflow = 'auto';
  }
  getSurgeryInfo = () => {
    this.props.dispatch({
      type: 'SurgeryApplication/queryHisOrderList',
      payload: { searchName: this.planNo, orgId: this.orgId },
      callback: (data) => {
        console.log(data)
        if (data.status) {
          this.setState({
            baseInfo: data.result[0]
          })
        } else {
          Toast.fail(data.msg || "获取信息失败")
        }
      }
    })
  }
  // 确认or拒收
  handleClick = (state) => {
    const actionText = state === '02' ? '确认' : '驳回'
    alert(`提示`, `是否${actionText}?`, [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => this.sureDispatch(state) },
    ])
  }
  sureDispatch = (state) => {
    this.props.dispatch({
      type: 'SurgeryApplication/updateHisOrder',
      payload: {
        planNo: [this.planNo], fstate: state
      },
      callback: (status) => {
        if (status) {
          this.getSurgeryInfo();
        }
      }
    })
  }
  render() {
    const { baseInfo } = this.state;
    console.log(baseInfo)
    return (
      <div className={styles.container}>{
        this.state.loading ?
          <div style={{ textAlign: 'center', paddingTop: '50vh', width: '100vw', height: '100vh' }}>
            <Icon type="loading" size="lg" />
          </div>
          :
          <div>
            <List>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.rOrgName}</span>}>
                <span className={styles.detailfiled14}> 院区名称：</span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.planNo}</span>}>
                <span className={styles.detailfiled14}> 科室申请单号： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.orderTypeName}</span>}>
                <span className={styles.detailfiled14}> 单据类型： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.deptName}</span>}>
                <span className={styles.detailfiled14}> 申请科室名称： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.storageName}</span>}>
                <span className={styles.detailfiled14}> 备货库房名称： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.fOrgName}</span>}>
                <span className={styles.detailfiled14}> 供应商名称： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.expectDate}</span>}>
                <span className={styles.detailfiled14}> 到货日期： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.userName}</span>}>
                <span className={styles.detailfiled14}> 制单人： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.orderDate}</span>}>
                <span className={styles.detailfiled14}> 制单日期： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.remark}</span>}>
                <span className={styles.detailfiled14}> 备注： </span>
              </Item>

            </List>

            <List style={{ marginTop: '10px' }}>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.zyh}</span>}>
                <span className={styles.detailfiled14}> 住院号（患者ID）：</span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.name}</span>}>
                <span className={styles.detailfiled14}> 患者姓名： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.gender}</span>}>
                <span className={styles.detailfiled14}> 患者性别： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.age}</span>}>
                <span className={styles.detailfiled14}> 患者年龄： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.operDoctor}</span>}>
                <span className={styles.detailfiled14}> 手术医生： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.operDate}</span>}>
                <span className={styles.detailfiled14}> 手术日期： </span>
              </Item>
              <Item extra={<span className={styles.detailfiled14}>{baseInfo.brandName}</span>}>
                <span className={styles.detailfiled14}> 品牌（材料）： </span>
              </Item>
            </List>
            {
              baseInfo.fstate === '01' &&
              <div className={styles.infoFooter}>
                <Flex>
                  <Flex.Item><span className={styles.detailsLeftBtn} onClick={this.handleClick.bind(this, '03')}>驳回</span></Flex.Item>
                  <Flex.Item><span className={styles.detailsRightBtn} onClick={this.handleClick.bind(this, '02')}>确认转发</span></Flex.Item>
                </Flex>
              </div>
            }
          </div>
      }
      </div>
    )
  }
}

export default connect(state => state)(DeliveryDetails);