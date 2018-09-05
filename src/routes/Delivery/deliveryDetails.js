/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:22:50 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-09-05 11:30:22
 * 送货单详情
 */
import React , { PureComponent } from 'react';
import {  List,Flex ,ImagePicker,Icon} from 'antd-mobile';
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
    files: [],
    loading: true
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
      <div className={styles.container}>{
        this.state.loading ?
        <div style={{ textAlign: 'center',paddingTop:'50vh' ,width:'100vw',height:'100vh'}}>
        <Icon type="loading"  size="lg"/>
        </div>
        :
       <div>
        <List>
          <Item>
             <span className={styles.detailfiled65}> { dataSource.sendFstate }</span>
            <Brief className={styles.detailBrief}>{dataSource.jywcTime}</Brief>
          </Item>
          <Item extra={ <span className={styles.detailfiled14}>{dataSource.lxdh}</span>}>
           <span className={styles.detailfiled14}> 收货人：{dataSource.lxr} </span>
          </Item>
          <Item>
            <span className={styles.detailfiled14}>收货地址：{dataSource.tfAddress}</span>
          </Item>
          <Item>
          <span className={styles.detailSendNo}> {dataSource.sendNo} </span>
            <Brief><span className={styles.detailBrief}>{dataSource.fOrgName}</span></Brief>
          </Item>
        </List>
          <List style={{marginTop:'5px'}}>
            {
              productData.map((item,index) =>{
  
                 return <Item extra={<div><span className={styles.Brief}>{item.amount}</span>
                 <span className={styles.detailUnit}>{item.purchaseUnit}</span></div>} key={index}>
                    <span className={styles.detailfiled65}>{item.materialName}</span> 
                  <Brief className={styles.detailBrief}>{item.spec}/{item.fmodel}</Brief>     
                </Item>
              })
            }
            <Item extra={productData.length > 3 ? <span onClick={this.handleMore}>更多</span> :null}>
              <Brief>{productData.length}件产品</Brief> 
            </Item>
          </List>
        <List style={{marginTop:'5px'}}>
          <Item extra={<span className={styles.detailfiled65}>{dataSource.evaluateValue}</span>}>
          <span className={styles.detailfiled65}>评价</span>
          </Item>
          <Item >
           <span className={styles.detailBrief}> {dataSource.evaluate}</span>
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
           <span className={styles.detailfiled14}>订单号:{dataSource.orderNo}</span> 
          </Item>
          <Item >
            <span className={styles.detailfiled14}> 创建时间：{dataSource.sendDate}</span> 
          </Item>
          <Item >
            <span className={styles.detailfiled14}>创建人：{dataSource.sendUsername}</span> 
          </Item>
          <Item extra={dataSource.fstate === "50"? dataSource.totalPrice:dataSource.ysje}>
            <span className={styles.detailfiled14}>{dataSource.fstate === "50"?"送货总金额":"收货总金额"}</span> 
          
          </Item>
        </List>
        <div className={styles.infoFooter}>
          <Flex>
            <Flex.Item><span className={styles.detailsLeftBtn} onClick={() => this.props.history.push({pathname:'/result'})}>联系供应商</span></Flex.Item>
            <Flex.Item><span className={styles.detailsRightBtn} onClick={() => this.props.history.push({pathname:`/message/${this.state.sendId}`})}>评价</span></Flex.Item>
          </Flex>
          </div>
          </div>
      }
      </div>
    )
  }
}

export default connect(state =>  state)(DeliveryDetails);