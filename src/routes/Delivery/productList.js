/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:23:46 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-09-04 15:07:44
 * 产品列表
 */
import React , { PureComponent } from 'react';
import { List, Modal,Card ,Icon} from 'antd-mobile';
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
    index: 0,
    loading:true
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
        console.log(data,'data')
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
    console.log(productData)
    return(
      <div className={styles.container}>
      {
         this.state.loading ?
         <div style={{ textAlign: 'center',paddingTop:'50vh' ,width:'100vw',height:'100vh'}}>
         <Icon type="loading"  size="lg"/>
         </div>
         :
        <div>
        <List>
          <Item>
          {dataSource.sendNo}  
          <Brief>{dataSource.fOrgName}</Brief>
          </Item>
        </List>
          {
            productData.map((item,index) =>{
              return <Card full style={{marginBottom:"4px",minHeight:'auto'}} key={index}>
              <Card.Header
                onClick={this.handleClick.bind(null,index)}
                title={<div><p className={styles.listCardTitle}>{item.materialName}</p></div>}
                extra={<span className={styles.listHeaderExtra} >{`${item.amount}${item.purchaseUnit}`}</span>}
              />
              <Card.Body style={{paddingTop:8,paddingBottom:0}}>
                <div><span className={styles.listProduct}>{item.spec}</span> </div>
                <div>
                  <span className={styles.listProduct}>{item.fmodel}</span>
                  <span className={styles.listPrice}>收货数量:{item.amount}</span>
                </div>
              </Card.Body>
            </Card>
                
            })
          }
      {
        productData.length > 0 ?
        <Modal
          visible={this.state.showModal}
          transparent
          maskClosable={false}
          onClose={()=>this.setState({showModal:false})}
          title={productData[index].materialName}
          footer={[{ text: '关闭', onPress: () => {this.setState({showModal:false}) } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
  
            <div className={styles.productListInfo}>
            型号: {productData[index].spec}<br />
            规格:{productData[index].fmodel}<br />
            包装单位: {productData[index].tfPacking}<br/>
            采购单位:{productData[index].purchaseUnit}<br />
            生产批号:{productData[index].flot}<br />
            生产日期:{productData[index].prodDate}<br />
            有效期: {productData[index].registerFirstLast}<br />
            发货数量:{productData[index].amount}<br />
            验收数量:{productData[index].checkfstate}<br />
            单价(¥）:{productData[index].purchasePrice}<br />
            总价(¥）:{productData[index].amountMoney}<br />
         </div>
       
        </Modal>
          :
          null
         }
         </div>
      }
      </div>
    )
  }
}

export default connect(state =>  state)(ProductList);