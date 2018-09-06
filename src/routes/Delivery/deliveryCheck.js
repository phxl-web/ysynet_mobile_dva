/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 11:16:21 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-09-05 17:54:45
 * 送货单验收界面
 */
import React , { PureComponent } from 'react';
import {  ImagePicker, Flex, Checkbox, Stepper,Button,Toast } from 'antd-mobile';
import { connect } from 'dva';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit  } from '@fortawesome/free-solid-svg-icons'
import { compressImage } from '../../utils';
import { FTP } from '../../api/local';
import styles from './style.css';
const AgreeItem = Checkbox.AgreeItem;
library.add(faEdit )

class DeliveryCheck extends PureComponent{
  state = {
    val:null,
    sendId: this.props.match.params.sendId,
    userId: this.props.match.params.userId,
    storageGuid: this.props.match.params.storageGuid ,
    files: [], // 展示图片
    submitFiles:[], // 提交图片
    imageVisible: false, // 图片 modal
    productData : [],//产品列表
    dataSource: {} ,//送的货单明细
    allChecked: false, //控制全选
    urls: [],
   // showInput: false
  };

  componentDidMount = () => {
    this.getMobileCheckDelivery();
  }

  getMobileCheckDelivery = () => {
    const { sendId ,storageGuid} = this.state;
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
        const productList = [];
        data.detials.map((item,index) => {
          item.showInput = false;
         return  productList.push(item);
        })
        this.setState( { dataSource : data, productData: productList,files: filePaths,urls:data.deliveryCheckImages} )
        this.setState({ loading: false});
        //this.setState( { showInput : false})
      }
    })
  }

  //图片更新
  imageUpdate = (files, type, index) => {
    const len = files.length - 1;
    const { submitFiles, urls,sendId } = this.state;
    if (type === 'add') {
      compressImage(files[len], newImgData => {
        this.props.dispatch({
          type: 'delivery/uploadDeliveryImages',
          payload: { tfAccessory: newImgData,sendId: sendId},
          callback: (data) => {
            urls.push(data.result);
            this.setState({ files, submitFiles: [...submitFiles, newImgData]});
             
          }
       })
      })
    } else {
      const filePath = `${urls[index]}`;
      this.props.dispatch({
        type: 'delivery/deleteDeliveryImage',
        payload: { filePath: filePath,sendId: sendId},
        callback: () => {
          submitFiles.splice(index, 1);
          urls.splice(index, 1);
          this.setState({ files, submitFiles: submitFiles, urls });
        }
      })
      
    }
  } 

  handleEditNum = (record,index) => {
    const { productData } = this.state;
    productData[index].showInput  = true;
    this.setState( { productData: [...productData]  })
  }
  handleEditOff = (item) => {

    Toast.loading('加载中...', 2, () => {
      const { val } = this.state;
      const checkAmount = val=== null ? item.amount : val;
      const storageGuid = this.state.storageGuid;
      const sendDetailGuid = item.sendDetailGuid;
      this.handleDeliverDetialCheck(storageGuid,sendDetailGuid,checkAmount,false)

    });
   
  }
  //处理每条产品选中状态
  handleDefaultCheckedProduct = (value) =>{
    const  defaultChecked = value > 0 ? true : false;
    return defaultChecked
  }

  //点击全选，显示验收通过/不通过按钮
  handleAllSelect = (e) => {
    if(e.target.checked){
      this.setState( { allChecked: true })
    }else{
     this.setState( { allChecked: false })
    }

 
  }
  handleDeliverDetialCheck = (storageGuid,sendDetailGuid,checkAmount) => {
    this.props.dispatch({
      type: 'delivery/deliveryDetialCheck',
      payload: { storageGuid: storageGuid,sendDetailGuid: sendDetailGuid,checkAmount: checkAmount },
      callback: () => {
        this.getMobileCheckDelivery();
      }
    })
  }
  //验收产品数量改为0的时候要取消选中
  onChange = (val) => {
    console.log(val,'val')
    this.setState({ val: val})
  }
  //选中
  handleCheckBoxChange = (item,index,e) => {
      const storageGuid = this.state.storageGuid;
    const sendDetailGuid = item.sendDetailGuid;
    if(e.target.checked){
    }else{
      this.handleDeliverDetialCheck(storageGuid,sendDetailGuid,0)
    }

  }
  
  handleCheck = (type) => {
     const { sendId,storageGuid,userId } = this.state;
  
     this.props.dispatch({
       type: type,
       payload: { storageGuid: storageGuid,sendId: sendId},
       callback: () => {
          this.props.history.push({pathname:`/CheckComplete/${sendId}/${userId}/${storageGuid}`});
         this.getMobileCheckDelivery();
       }
     })
  }

  //验收通过
  handleDeliveryThrough = (item) =>{
   this.handleCheck('delivery/mobileDeliveryThrough');
  }
  //验收不通过
  handleDeliveryNotThrough = (item) =>{
    this.handleCheck('delivery/mobileDeliveryNotThrough');
  }

  render (){
    const { files } = this.state;
    const { productData, dataSource,allChecked,storageGuid,userId } = this.state;
    
    return (
      <div className={styles.container}>
          <Flex>
          <Flex.Item style={{flex:7}}>
          </Flex.Item>
          <Flex.Item>
               {<span onClick={() => window.location.href= `http://nn.s1.natapp.cc/meqm/test/mobileScanQrcode?userId=${userId}&storageGuid=${storageGuid}`}><img src={require("../../assets/image/scan.svg")} alt="扫一扫" /></span>}   
          </Flex.Item>
        </Flex>
          <div className={styles.checkContent}>
          {
            productData.map((item,index) => {
                return <div className={styles.listCheck} key={index}>
                        <h3 className={styles.titleInfo}>
                          <AgreeItem className={styles.geName} checked={allChecked ? allChecked :this.handleDefaultCheckedProduct(item.checkfstate)}  onChange={this.handleCheckBoxChange.bind(null,item)}>
                          通用名称: { item.materialName }     { item.isScope || item.isRegisterOut || item.isProdDateIn || item.isUsefulDateEve || item.isUsefulDateIn? <span className={styles.tagFont}>?</span> : null}
                          </AgreeItem> 
                          { item.isScope? <span className={styles.tagFont}>超出供应商许可范围</span> : null}
                        </h3>
                        <div className={styles.checkInfo}>
                          <p>型号: { item.spec }</p>
                            <p>规格: { item.fmodel }</p>
                            <p>采购单位: { item.purchaseUnit }</p>
                            <p>包装规格:{ item.tfPacking } </p>
                            <p>生产批号: { item.flot }</p>
                            <p>证件效期: { item.registerFirstLast }</p>
                            { item.isRegisterOut? <span className={styles.tagFont}>产品注册证已过期</span> : null}
                            <p>生产日期: { item.prodDate }</p>
                            { item.isProdDateIn? <span className={styles.tagFont}>生产日期不在注册期内</span> : null}
                            <p>产品效期:{ item.usefulDate }</p>
                            { item.isUsefulDateEve ? <span className={styles.tagFont}>临近保质期</span> : null}
                            { item.isUsefulDateIn ? <span className={styles.tagFont}>已过有效期</span> : null}
                            <p>单价: {item.purchasePrice}</p>
                            <p>总价: {item.amountMoney}</p>
                        </div>
                        <hr/>
                        <div style={{height:'40px',marginBottom:'7px'}}>
                         {
                           !item.showInput ?
                           <p className={styles.checkNum}>数量: {item.amount} <span style={{color:"#666",position:'absolute',right:'10px'}} onClick={this.handleEditNum.bind(null,item,index)}><FontAwesomeIcon icon="edit" /></span></p>
                          :null 
                         }
                          {
                             item.showInput  ? 
                             <Flex >
                              <Flex.Item>
                              <Stepper
                                style={{ width: '100%', minWidth: '100px' }}
                                showNumber
                                min={0}
                                defaultValue={item.amount}
                                value={this.state.val===null ?  item.amount : this.state.val}
                                onChange={this.onChange}
                              />
                              </Flex.Item>
                              <Flex.Item><Button type="primary" style={{height:'40px',lineHeight:'40px',borderRadius:'0'}}  onClick={this.handleEditOff.bind(null,item)}>完成</Button></Flex.Item>
                            </Flex>
                             :null
                           }
                           <div>
                         
                           </div>
                      </div>
                  </div>
              })

            }

          </div>
          <div className={styles.checkFooter}>
            <ImagePicker
              length="8"
              files={files}
              onChange={this.imageUpdate}
              selectable={files.length < 8}
              accept="image/*"
            />
           <div className={styles.checkTools}>
            <Flex>
                <Flex.Item>
                <AgreeItem  onChange={this.handleAllSelect}>
                    全选
                </AgreeItem>
                </Flex.Item>
                {<Flex.Item style={{textAlign:'right',paddingRight:'10px'}}>已验收{dataSource.detailCheckNum||0}/{ dataSource.detailNum ||0}</Flex.Item>}
              </Flex>
           </div>
            <div className={styles.infoFooter}>
              <Flex>
                <Flex.Item><span className={styles.infoRightBtn} onClick={this.handleDeliveryThrough}>验收通过</span></Flex.Item>
                <Flex.Item><span className={styles.infoLeftBtn} onClick={this.handleDeliveryNotThrough}>验收不通过</span></Flex.Item>
              </Flex>
            </div>
        
          </div>
      </div>
    )
  }
}
export default connect(state =>  state)(DeliveryCheck);