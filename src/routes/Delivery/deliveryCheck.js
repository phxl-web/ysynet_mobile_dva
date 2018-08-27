/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 11:16:21 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-27 17:39:09
 * 送货单验收界面
 */
import React , { PureComponent } from 'react';
import { NavBar, ImagePicker, Flex, Checkbox, Stepper } from 'antd-mobile';
import { connect } from 'dva';
import { compressImage } from '../../utils';
import { FTP } from '../../api/local';
import styles from './style.css';
const AgreeItem = Checkbox.AgreeItem;

class DeliveryCheck extends PureComponent{
  state = {
    val:0,
    sendId: this.props.match.params.sendId,
    files: [], // 展示图片
    submitFiles:[], // 提交图片
    imageVisible: false, // 图片 modal
    showBtns: false , // 是否显示验收通过/不通过按钮  整单验收
    contentHeight: 'calc(100vh - 160px)' , //中间div高度
    productData : [],//产品列表
    dataSource: {} ,//送的货单明细
    allChecked: false, //控制全选
    urls: []
  };

  componentDidMount = () => {
    this.getMobileCheckDelivery();
  }

  getMobileCheckDelivery = () => {
    const { sendId } = this.state;
    const storageGuid = this.props.users.userInfo.rStorageGuid;
    this.props.dispatch({
      type: 'delivery/mobileCheckDelivery',
      payload: { storageGuid: storageGuid,sendId: sendId},
      //payload: { storageGuid:"926ACEBC275F4806942DB9C7932D6C54",sendId:"E250CD25C0B3473083E635D0816F821B" },
      callback: (data) => {
        const  filePaths  = [];
        if(data.deliveryCheckImages){
            data.deliveryCheckImages.map((item,index) => {
             return filePaths.push({ url: FTP+`${item}`,id:index})
            })
        }
    
        this.setState( { dataSource : data, productData: data.detials,files: filePaths,urls:data.deliveryCheckImages} )
        this.setState({ loading: false});
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
  //处理每条产品选中状态
  handleDefaultCheckedProduct = (value) =>{
    const  defaultChecked = value > 0 ? true : false;
    return defaultChecked
  }

  //点击全选，显示验收通过/不通过按钮
  handleAllSelect = (e) => {
    // //判断是否有0的数据
    // const productData = this.state.productData;
    // productData.map((item,index) => {
    //   if(item.amount === 0){
    //     Toast.info("存在送货单为0的数据，不能全选",5)
    //   }
    // })
   

    if(e.target.checked)
    {
      this.setState({
        showBtns : true,
        allChecked: true,
        contentHeight: "calc(100vh - 190px)"
      })
    }else{
      this.setState({
        showBtns : false,
        allChecked: false,
        contentHeight: "calc(100vh - 160px)"
      })
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
  onChange = (item,val) => {
    this.setState({ val: val})
    if(item.checkfstate > 0){
      console.log(`item:${item},val:${val}` );
      const storageGuid = this.props.users.userInfo.rStorageGuid;
      const sendDetailGuid = item.sendDetailGuid;
      this.handleDeliverDetialCheck(storageGuid,sendDetailGuid,val)
    }
  }
  //产品第一次验收的时候选中调用接口  取消传数量为0
  handleCheckBoxChange = (item,e) => {
    const storageGuid = this.props.users.userInfo.rStorageGuid;
    const sendDetailGuid = item.sendDetailGuid;
    if(e.target.checked){
      const checkAmount = this.state.val;
      this.handleDeliverDetialCheck(storageGuid,sendDetailGuid,checkAmount)
    }else{
      this.handleDeliverDetialCheck(storageGuid,sendDetailGuid,0)
    }
  }
  
  handleCheck = (type) => {
     const storageGuid = this.props.users.userInfo.rStorageGuid;
     const sendIds = [],productData = this.state.productData;
     productData.map((item,index) => {
       return sendIds.push(item.sendId);
     })
     this.props.dispatch({
       type: type,
       payload: { storageGuid: storageGuid,sendIds: sendIds},
       callback: () => {
          this.props.history.push({pathname:`/CheckComplete/${this.state.sendId}`});
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
    const { productData, dataSource,allChecked } = this.state;
    const userId = this.props.users.userInfo.userId;
    return (
      <div className={styles.container}>
           <NavBar
            mode="dark"
            rightContent={
               <span onClick={() => window.location.href= `http://zzy6gz.natappfree.cc/meqm/test/mobileScanQrcode?userId=${userId}`}>扫码</span>
            }
          ></NavBar>
          <div className={styles.checkContent} style={{height:this.state.contentHeight}}>
          {
            productData.map((item,index) => {
                return <div className={styles.listCheck} key={index}>
                        <h3 className={styles.titleInfo}>
                          <AgreeItem className={styles.geName} checked={allChecked ? allChecked : this.handleDefaultCheckedProduct(item.checkfstate)}  onChange={this.handleCheckBoxChange.bind(null,item)}>
                          通用名称: { item.geName }     { item.isScope || item.isRegisterOut || item.isProdDateIn || item.isUsefulDateEve || item.isUsefulDateIn? <span className={styles.tagFont}>?</span> : null}
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
                            { item.isUsefulDateEve? <span className={styles.tagFont}>临近保质期</span> : null}
                            { item.isUsefulDateIn? <span className={styles.tagFont}>已过有效期</span> : null}
                            <p className={styles.textAlignright}>总价: {item.amountMoney}</p>
                        </div>
                          
                        <div>
                          <div className={styles.unitPriceTitle}><span>单价(¥):</span><span className={styles.purchasePrice}>{ item.amountMoney }</span></div>
                          <Stepper
                          style={{ width: '40%', minWidth: '100px', }}
                          showNumber
                          max={item.checkfstate}
                          min={0}
                          readOnly={false}
                          defaultValue={item.checkfstate}
                          onChange={this.onChange.bind(null,item)}
                          />
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
                {<Flex.Item style={{textAlign:'right',paddingRight:'10px'}}>已验收{dataSource.detailCheckNum||0}/{(dataSource.detailCheckNum + dataSource.detailNum)||0}</Flex.Item>}
              </Flex>
           </div>
          {
            this.state.showBtns ?
            <div className={styles.infoFooter}>
              <Flex>
                <Flex.Item><span className={styles.infoRightBtn} onClick={this.handleDeliveryThrough}>验收通过</span></Flex.Item>
                <Flex.Item><span className={styles.infoLeftBtn} onClick={this.handleDeliveryNotThrough}>验收不通过</span></Flex.Item>
              </Flex>
            </div>
            :
            null
          }
        
          </div>
      </div>
    )
  }
}
export default connect(state =>  state)(DeliveryCheck);