/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:23:46 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-24 09:23:18
 * 产品列表
 */
import React , { PureComponent } from 'react';
import { List, Modal,Card } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
class ProductList extends PureComponent { 
  state = {
    showModal: false,
    sendId: this.props.match.params.sendId,
    productData : [],//产品列表
    dataSource: {} ,//送的货单明细
    index: 0
  }
  componentDidMount = () => {
    this.getMobileCheckDelivery();
  }
  
  getMobileCheckDelivery = () => {
    const sendId = this.state.sendId;
    const storageGuid = this.props.users.userInfo.rStorageGuid;
    this.props.dispatch({
      type: 'delivery/mobileCheckDelivery',
      payload: { storageGuid: storageGuid,sendId: sendId},
      callback: (data) => {
        this.setState( { dataSource : data, productData: data.detials} )
        this.setState({ loading: false});
      }
    })
  }
  // 点击查看详情
  handleClick = (value) => {
    this.setState( { showModal : true,index:value});
  }
  render(){
    const { productData ,dataSource ,index} = this.state;
    return(
      <div className={styles.container}>
        <List>
          <Item>
          {dataSource.sendNo}  
          <Brief>{dataSource.fOrgName}</Brief>
          </Item>
        </List>
          {
            productData.map((item,index) =>{
              return <Card full style={{marginBottom:"5px"}} key={index}>
              <Card.Header
                onClick={this.handleClick.bind(null,index)}
                title={<div><p className={styles.listCardTitle}>{item.geName}</p></div>}
                extra={<span className={styles.listHeaderExtra} >{`${item.amount}${item.tenderUnit}`}</span>}
              />
              <Card.Body>
                <div><span className={styles.listProduct}>{item.spec}/{item.fmodel}</span> <span className={styles.listPrice}>收货数量:{item.amount}</span></div>
              </Card.Body>
            </Card>
                
            })
          }
        <Modal
          visible={this.state.showModal}
          transparent
          maskClosable={false}
          onClose={()=>this.setState({showModal:false})}
          title={productData[index].geName}
          footer={[{ text: '关闭', onPress: () => {this.setState({showModal:false}) } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
        {
          productData.length > 0 ?
            <div style={{textAlign:'left',marginLeft:"15px"}}>
            型号: {productData[index].spec}<br />
            规格:{productData[index].fmodel}<br />
            包装单位: {productData[index].spec}<br/>
            采购单位:{productData[index].purchaseUnit}<br />
            生产批号:{productData[index].flot}<br />
            生产日期:{productData[index].prodDate}<br />
            有效期:{productData[index].registerFirstLast}<br />
            发货数量:{productData[index].amount}<br />
            验收数量:{productData[index].spec}<br />
            单价(¥）:{productData[index].purchasePrice}<br />
            总价(¥）:{productData[index].amountMoney}<br />
         </div>
         :
         null
        }
        </Modal>
      </div>
    )
  }
}

export default connect(state =>  state)(ProductList);