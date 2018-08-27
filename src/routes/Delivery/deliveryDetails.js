/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:22:50 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-27 10:00:02
 * 送货单详情
 */
import React , { PureComponent } from 'react';
import {  List,Flex ,ImagePicker} from 'antd-mobile';
import { connect } from 'dva';
import { FTP } from '../../api/local';
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
class DeliveryDetails extends PureComponent{
  state = {
    sendId: this.props.match.params.sendId,
    productData : [],//产品列表
    dataSource: {} ,//送的货单明细
    files: []
  }
  
  componentDidMount = () => {
    this.getMobileCheckDelivery();
  }
  componentDidUpdate() {
    document.body.style.overflow = 'auto';
  }
  
  getMobileCheckDelivery = () => {
    const sendId = this.state.sendId;
    const storageGuid = this.props.users.userInfo.rStorageGuid;
    this.props.dispatch({
      type: 'delivery/mobileCheckDelivery',
      payload: { storageGuid: storageGuid,sendId: sendId},
      callback: (data) => {
        const  filePaths  = [];
        if(data.deliveryCheckImages){
            data.deliveryCheckImages.map((item,index) => {
             return filePaths.push({ url: FTP+`${item}`,id:index})
            })
        }
        this.setState( { dataSource : data, productData: data.detials,files: filePaths,} )
        this.setState({ loading: false});
      }
    })
  }

  handleMore = () =>{
    this.props.history.push({pathname:`/productList/${this.state.sendId}`});
  }

  render(){
    const { productData ,dataSource,files } = this.state;
    return(
      <div className={styles.container}>
        <List>
          <Item>
             <span className={styles.detailTitle}> { dataSource.sendFstate }</span>
            <Brief style={styles.detailBrief}>{dataSource.sendDate}</Brief>
          </Item>
          <Item extra={ <span style={styles.detailAddress}>{dataSource.lxdh}</span>}>
           <span style={styles.detailAddress}> 收货人：{dataSource.lxr} </span>
          </Item>
          <Item>
            <span style={styles.detailAddress}>收货地址：{dataSource.tfAddress}</span>
          </Item>
          <Item>
            {dataSource.sendNo} 
            <Brief style={styles.detailBrief}>{dataSource.fOrgName}</Brief>
          </Item>
        </List>
          <List style={{marginTop:'5px'}}>
            {
              productData.map((item,index) =>{
  
                 return <Item extra={<div><span className={styles.Brief}>{item.amount}</span>
                 <span className={styles.detailAddress}>{item.purchaseUnit}</span></div>} key={index}>
                    <span className={styles.detailTitle}></span> {item.geName}
                  <Brief className={styles.detailBrief}>{item.spec}/{item.fmodel}</Brief>     
                </Item>
              })
            }
            <Item extra={productData.length > 3 ? <span onClick={this.handleMore}>更多</span> :null}>
              <Brief>{productData.length}件产品</Brief> 
            </Item>
          </List>
        <List style={{marginTop:'5px'}}>
          <Item extra={dataSource.evaluateValue}>
           评价
          </Item>
          <Item >
           {dataSource.evaluate}
          </Item>
          <Item >
            {
              files.length > 0 ? 
              <ImagePicker
              files={files}
              onImageClick={(index, fs) => this.showModal(index, fs)}
              selectable={false}
              multiple={this.state.multiple}/>
              :null
            }
          </Item>
        </List>
        <List style={{marginTop:'5px'}}>
          <Item>
            订单号:{dataSource.orderNo}
          </Item>
          <Item >
            创建时间：{dataSource.sendDate}
          </Item>
          <Item >
            创建人：{dataSource.sendUsername}
          </Item>
          <Item extra={dataSource.totalPrice}>
            验收/送货总金额
          </Item>
        </List>
        <div className={styles.infoFooter}>
          <Flex>
            <Flex.Item><span className={styles.infoLeftBtn} onClick={() => this.props.history.push({pathname:'/result'})}>联系供应商</span></Flex.Item>
            <Flex.Item><span className={styles.infoRightBtn} onClick={() => this.props.history.push({pathname:`/message/${this.state.sendId}`})}>评价</span></Flex.Item>
          </Flex>
          </div>
      </div>
    )
  }
}

export default connect(state =>  state)(DeliveryDetails);