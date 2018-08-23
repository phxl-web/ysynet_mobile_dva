/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 11:16:21 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-23 13:39:30
 * 送货单验收界面
 */
import React , { PureComponent } from 'react';
import { NavBar, Icon, ImagePicker, Flex, Checkbox, Stepper ,Button} from 'antd-mobile';
import { connect } from 'dva';
import { compressImage } from '../../utils';
import styles from './style.css';
const AgreeItem = Checkbox.AgreeItem;

class DeliveryCheck extends PureComponent{
  state = {
    val:3,
    sendId: this.props.match.params.sendId,
    files: [], // 展示图片
    submitFiles:[], // 提交图片
    imageVisible: false, // 图片 modal
    showBtns: false , // 是否显示验收通过/不通过按钮  整单验收
    contentHeight: 'calc(100vh - 160px)' , //中间div高度
    productData : [],//产品列表
    dataSource: {} ,//送的货单明细
    allChecked: false //控制全选
  };

  componentDidMount = () => {
    this.getMobileCheckDelivery();
  }

  getMobileCheckDelivery = () => {
    //const sendId = this.state.sendId;
    //const storageGuid = this.props.users.userInfo.rStorageGuid;
    this.props.dispatch({
      type: 'delivery/mobileCheckDelivery',
      //payload: { storageGuid: storageGuid,sendId: sendId},
      payload: { storageGuid:"926ACEBC275F4806942DB9C7932D6C54",sendId:"E250CD25C0B3473083E635D0816F821B" },
      callback: (data) => {
        this.setState( { dataSource : data, productData: data.detials} )
        this.setState({ loading: false});
      }
    })
  }

  //图片更新
  imageUpdate = (files, type, index) => {
    const len = files.length - 1;
    const { submitFiles } = this.state;
    console.log(submitFiles,'submitFiles')
    if (type === 'add') {
      compressImage(files[len], newImgData => {
        this.props.dispatch({
          type: 'delivery/uploadDeliveryImages',
          //payload: { tfAccessory: newImgData,sendId: sendId},
          payload: { tfAccessory:newImgData,sendId:"E250CD25C0B3473083E635D0816F821B" },
          callback: (data) => {
            files[len].tfAccessory = data.result;
             this.setState({ files, submitFiles: [...submitFiles, newImgData]});
          }
        })
      })
    } else {
  
      submitFiles.splice(index, 1);

      // this.props.dispatch({
      //   type: 'delivery/uploadDeliveryImages',
      //   //payload: { tfAccessory: newImgData,sendId: sendId},
      //   payload: { tfAccessory:newImgData,sendId:"E250CD25C0B3473083E635D0816F821B" },
      //   callback: (data) => {
      //   }
      // })
      this.setState({ files, submitFiles: submitFiles});
    }
   
  } 
  //处理每条产品选中状态
  handleDefaultCheckedProduct = (value) =>{
    const  defaultChecked = value === 1 ? true : false;

    return defaultChecked
  }
  //点击全选，显示验收通过/不通过按钮
  handleAllSelect = (e) => {
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
      //payload: { storageGuid: storageGuid,sendId: sendId},
      payload: { storageGuid: storageGuid,sendDetailGuid: sendDetailGuid,checkAmount: checkAmount },
      callback: (data) => {
        console.log(data)
        this.setState( { dataSource : data, productData: data.detials} )
      }
    })
  }
  //验收产品数量改为0的时候要取消选中
  onChange = (val) => {
    // console.log(val);
    this.setState({ val });
  }
  //产品第一次验收的时候选中调用接口  取消传数量为0
  handleCheckBoxChange = (item,e) => {
    //const storageGuid = this.props.users.userInfo.rStorageGuid;
    const storageGuid = "926ACEBC275F4806942DB9C7932D6C54";
    const sendDetailGuid = item.sendDetailGuid;
    if(e.target.checked){
      const checkAmount = this.state.val;
      this.handleDeliverDetialCheck(storageGuid,sendDetailGuid,checkAmount)
    }else{
      this.handleDeliverDetialCheck(storageGuid,sendDetailGuid,0)
    }
  }
  
  handleCheck = (type) => {
     // const storageGuid = this.props.users.userInfo.rStorageGuid;
     const sendIds = [],productData = this.state.productData;
     productData.map((item,index) => {
       return sendIds.push(item.sendId);
     })
     this.props.dispatch({
       type: type,
       //payload: { storageGuid: storageGuid,sendId: sendIds},
       payload: { storageGuid:"926ACEBC275F4806942DB9C7932D6C54",sendIds: sendIds},
       callback: () => {
         this.getMobileCheckDelivery();
       }
     })
  }

  //验收通过
  handleDeliveryThrough = (item) =>{
   this.handleCheck('delivery/mobileDeliveryThrough');
   this.props.history.push({pathname:`/CheckComplete/${this.state.sendId}`});
  }
  //验收不通过
  handleDeliveryNotThrough = (item) =>{
    this.handleCheck('delivery/mobileDeliveryNotThrough');
    this.props.history.push({pathname:`/CheckComplete/${this.state.sendId}`});
  }

  render (){
    const { files } = this.state;
    const { productData, dataSource,allChecked } = this.state;
    return (
      <div className={styles.container}>
           <NavBar
            mode="dark"
            rightContent={
              <span onClick={() => this.props.history.push({pathname:'/DeliveryInfo'})}>扫码</span>
            }
          ></NavBar>
          <div className={styles.checkContent} style={{height:this.state.contentHeight}}>
          {
            productData.map((item,index) => {
                return <div className={styles.listCheck} key={index}>
                        <h3 className={styles.titleInfo}>
                          <AgreeItem className={styles.geName} checked={allChecked ? allChecked : this.handleDefaultCheckedProduct(item.checkfstate)}  onChange={this.handleCheckBoxChange.bind(null,item)}>通用名称: { item.geName }</AgreeItem> 
                        </h3>
                        <div className={styles.checkInfo}>
                          型号: { item.spec }<br />
                          规格: { item.fmodel }<br />
                          采购单位: { item.tenderUnit }<br />
                          包装规格:{ item.tfPacking } <br/>
                          生产批号: { item.flot }<br />
                          证件效期: { item.registerFirstLast }<br />
                          生产日期: { item.usefulDate }<br />
                          产品效期:{ item.usefulDate }
                          <p className={styles.textAlignright}>总价: {item.tenderPrice}</p>
                        </div>
                        <div>
                          <div className={styles.unitPriceTitle}><span>单价(¥):</span><span className={styles.tenderPrice}>{ item.amountMoney }</span></div>
                          <Stepper
                          style={{ width: '40%', minWidth: '100px', }}
                          showNumber
                          max={item.amount}
                          min={1}
                          readOnly={false}
                          defaultValue={item.amount}
                          onChange={this.onChange}
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