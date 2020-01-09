import { Tabs, List } from 'antd-mobile';
import React, { PureComponent } from 'react'
import { connect } from 'dva';
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;

class Details extends PureComponent {

  state = {
    sendId: this.props.match.params.sendId,
    userId: this.props.match.params.userId,
    isSign: this.props.match.params.isSign,
    storageGuid: this.props.match.params.storageGuid,
    packageId: this.props.match.params.packageId,
    productDataSource: [],
    toolsListDataSource: []
  }

  componentDidMount() {
    const { sendId, packageId, userId } = this.state;
    this.props.dispatch({
      type: 'delivery/findOperPackageDetail',
      payload: { sendId, userId },
      callback: (data) => {
        const results = data[packageId];
        const { productDataSource, toolsListDataSource } = results;
        this.setState({ productDataSource, toolsListDataSource })
      }
    })
  }
  render() {
    const tabs = [
      { title: '产品' },
      { title: '外来器械' },
    ];
    const { productDataSource, toolsListDataSource } = this.state;
    return (
      <Tabs tabs={tabs} initialPage={0}>
        <div>
          {
            productDataSource && productDataSource.length ?
              productDataSource.map((item, index) => {
                return <List key={index} style={{ marginBottom: 16 }}>
                  <Item className={styles.productWrap}>
                    {item.materialName}
                    <Brief> 型号:<span>{item.fmodel}</span></Brief>
                    <Brief> 规格:<span>{item.spec}</span></Brief>
                    <Brief> 采购单位:<span>{item.purchaseUnit}</span></Brief>
                    <Brief> 生产批号:<span>{item.flot}</span></Brief>
                    <Brief> 生产日期:<span>{item.prodDate}</span></Brief>
                    <Brief> 产品效期:<span>{item.usefulDate}</span></Brief>
                    <Brief> 主条码:<span>{item.fbarcode}</span></Brief>
                    <Brief> 批次码:<span>{item.fbarcodeSec}</span></Brief>
                    <Brief> 灭菌批号:<span>{item.sterilizeFlot}</span></Brief>
                    <Brief> 灭菌日期:<span>{item.sterilizeDate}</span></Brief>
                    <Brief> 灭菌效期:<span>{item.sterilizeUsefulDate}</span></Brief>
                    <Brief><div className={styles.unitPrice}>单价:<span>{item.purchasePrice && Number(item.purchasePrice).toFixed(4)}</span></div> </Brief>
                    <Brief>
                      <div className={styles.footer}>
                        <div className={styles.amount}> 数量:<span>{item.tfAmount}</span></div>
                        <div className={styles.totalPrice}>总价: <span>{item.purchasePrice && item.tfAmount && Number(item.purchasePrice * item.tfAmount).toFixed(2)}</span></div>
                      </div>
                    </Brief>
                  </Item>

                </List>
              })
              :
              null
          }
        </div>
        <div>
          {
            toolsListDataSource && toolsListDataSource.length ?
              toolsListDataSource.map((item, index) => {
                return <List key={index} style={{ marginBottom: 16 }}>
                  <Item className={styles.productWrap}>
                    {item.materialName}
                    <Brief> 型号:<span>{item.fmodel}</span></Brief>
                    <Brief> 规格:<span>{item.spec}</span></Brief>
                    <Brief> 单位:<span></span>{item.leastUnit}</Brief>
                    <Brief> <div className={styles.amount}>数量:<span>{item.tfAmount}</span></div></Brief>
                  </Item>
                </List>
              })
              :
              null
          }
        </div>
      </Tabs>
    )
  }
}

export default connect(state => state)(Details);
