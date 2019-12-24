/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 11:16:21 
 * @Last Modified by: xiangxue
 * @Last Modified time: 2019-12-12 11:39:19
 * 送货单验收界面
 */
import React, { PureComponent } from 'react';
import { ImagePicker, Flex, Checkbox, Stepper, Button, Icon } from 'antd-mobile';
import { connect } from 'dva';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { compressImage } from '../../utils';
import { FTP } from '../../api/local';
import styles from './style.css';
const AgreeItem = Checkbox.AgreeItem;
library.add(faEdit)

class DeliveryCheck extends PureComponent {
  state = {
    val: null,
    sendId: this.props.match.params.sendId,
    userId: this.props.match.params.userId,
    isSign: this.props.match.params.isSign,
    storageGuid: this.props.match.params.storageGuid,
    files: [], // 展示图片
    submitFiles: [], // 提交图片
    imageVisible: false, // 图片 modal
    productData: [],//产品列表
    dataSource: {},//送的货单明细
    allChecked: false, //控制全选
    urls: [],
    modalPic: false,
    picIndex: 0,
    imgHeight: 176,
    deliveryThroughLoading: false,
    deliveryNotBtnDisabled: false,
    deliveryNotThroughLoading: false,
    deliveryBtnDisabled: false,
    // showInput: false
  };

  componentDidMount = () => {
    this.getMobileCheckDelivery();
  }

  getMobileCheckDelivery = () => {
    const { sendId, storageGuid, isSign, userId } = this.state;
    this.props.dispatch({
      type: 'delivery/mobileCheckDelivery',
      payload: { storageGuid: storageGuid, sendId: sendId, isSign: isSign, userId: userId },
      callback: (data) => {
        const filePaths = [];
        const deliveryCheckImages = data.deliveryCheckImages.filter(item => item !== "");

        if (deliveryCheckImages&&deliveryCheckImages.length) {
          data.deliveryCheckImages.map((item, index) => {
            return filePaths.push({ url: FTP + `${item}`, id: index })
          })
        }
        const productList = [];
        data.detials.map((item, index) => {
          item.showInput = false;
          return productList.push(item);
        })
        
        console.log(deliveryCheckImages)
        this.setState({ dataSource: data, productData: productList, files: filePaths, urls: (deliveryCheckImages&&deliveryCheckImages.length) ? deliveryCheckImages : [] })
        this.setState({ loading: false });
        //this.setState( { showInput : false})
      }
    })
  }
  //点击图片放大图
  imageClick = (index, files) => {
    // this.setState({ picIndex: index, modalPic: true })
    console.log(files[index])
    window.open(files[index].url)
  }
  //图片更新
  imageUpdate = (files, type, index) => {
    const len = files.length - 1;
    const { submitFiles, urls, sendId } = this.state;
    if (type === 'add') {
      compressImage(files[len], newImgData => {
        this.props.dispatch({
          type: 'delivery/uploadDeliveryImages',
          payload: { tfAccessory: newImgData, sendId: sendId },
          callback: (data) => {
            urls.push(data.result && data.result);
            this.setState({ files, submitFiles: [...submitFiles, newImgData] });
          }
        })
      })
    } else {
      const filePath = `${urls[index]}`;
      this.props.dispatch({
        type: 'delivery/deleteDeliveryImage',
        payload: { filePath: filePath, sendId: sendId },
        callback: () => {
          submitFiles.splice(index, 1);
          urls.splice(index, 1);
          this.setState({ files, submitFiles: submitFiles, urls });
        }
      })
    }
  }

  handleEditNum = (record, index) => {
    const { productData } = this.state;
    productData[index].showInput = true;
    this.setState({ productData: [...productData], val: record.amount })
  }
  handleEditOff = (item, index) => {  //当数量amount为0时 选中checkfstate取消
    const { val, productData } = this.state;
    let productDataCur = {};

    if (val <= 0) {
      productDataCur = { ...item, checkfstate: 0, amount: val, showInput: false }
    } else {
      productDataCur = { ...item, amount: val, showInput: false }
    }
    productData.splice(index, 1, productDataCur);
    this.setState({ productData: [...productData] })
    // Toast.loading('加载中...', 2, () => {
    //   const { val } = this.state;
    //   const checkAmount = val === null ? item.amount : val;
    //   const storageGuid = this.state.storageGuid;
    //   const sendDetailGuid = item.sendDetailGuid;
    //   this.handleDeliverDetialCheck(storageGuid, sendDetailGuid, checkAmount, false)
    // });
  }
  //处理每条产品选中状态
  handleDefaultCheckedProduct = (value) => {
    const defaultChecked = value > 0 ? true : false;
    return defaultChecked
  }

  //点击全选，显示验收通过/不通过按钮
  handleAllSelect = (e) => {
    if (e.target.checked) {
      this.setState({ allChecked: true })
    } else {
      this.setState({ allChecked: false })
    }
  }
  handleDeliverDetialCheck = (storageGuid, sendDetailGuid, checkAmount) => {
    this.props.dispatch({
      type: 'delivery/deliveryDetialCheck',
      payload: { storageGuid: storageGuid, sendDetailGuid: sendDetailGuid, checkAmount: checkAmount },
      callback: () => {
        this.getMobileCheckDelivery();
      }
    })
  }
  //验收产品数量改为0的时候要取消选中
  onChangeAmount = (val, index) => {
    this.setState({ val: val })
  }
  //选中
  handleCheckBoxChange = (item, index, e) => {
    const { productData } = this.state;
    const checkfstate = item.checkfstate === 1 ? 0 : 1;
    const curItem = { ...item, checkfstate };
    productData.splice(index, 1, curItem);
    this.setState({ productData: [...productData] })
    // const storageGuid = this.state.storageGuid;
    // const sendDetailGuid = item.sendDetailGuid;
    // if (e && e.target && e.target.checked) {
    // } else {
    //   this.handleDeliverDetialCheck(storageGuid, sendDetailGuid, 0)
    // }
  }

  handleCheck = (type, prodDateCur) => {
    const { sendId, storageGuid, userId, isSign } = this.state;
    if (!prodDateCur) {
      this.setState({
        deliveryNotThroughLoading: false,
        deliveryBtnDisabled: false,
        deliveryNotBtnDisabled: false,
      })
    }

    this.props.dispatch({
      type: type,
      payload: { storageGuid: storageGuid, sendId: sendId, isSign: isSign, prodDateCur, userId: userId },
      callback: (status) => {
        if (status) {
          this.props.history.push({ pathname: `/checkComplete/${sendId}/${userId}/${storageGuid}` });
          this.getMobileCheckDelivery();
        } else {
          this.setState({
            deliveryNotThroughLoading: false,
            deliveryThroughLoading: false,
            deliveryNotBtnDisabled: false,
            deliveryBtnDisabled: false
          })
        }

      }
    })
  }

  //验收通过
  handleDeliveryThrough = (item) => {
    const { productData, deliveryBtnDisabled } = this.state;
    if (!deliveryBtnDisabled) {
      this.setState({
        deliveryBtnDisabled: true,
        deliveryThroughLoading: true,
        deliveryNotBtnDisabled: true,
      })
      const curProduct = productData.filter(item => item.checkfstate > 0)
        .map((_item) => { return { sendDetailGuid: _item.sendDetailGuid, amount: _item.amount } })
      this.handleCheck('delivery/mobileDeliveryThrough', curProduct);

    }
  }
  //验收不通过
  handleDeliveryNotThrough = (item) => {
    const { deliveryNotBtnDisabled } = this.state;
    if (!deliveryNotBtnDisabled) {
      this.setState({
        deliveryNotThroughLoading: true,
        deliveryBtnDisabled: true,
        deliveryNotBtnDisabled: true,
      })
      this.handleCheck('delivery/mobileDeliveryNotThrough');
    }
  }
  render() {
    const {
      productData,
      dataSource,
      allChecked,
      storageGuid,
      userId,
      sendId,
      isSign,
      files,
      deliveryThroughLoading,
      deliveryNotBtnDisabled,
      deliveryNotThroughLoading,
      deliveryBtnDisabled,
    } = this.state;
    console.log(deliveryThroughLoading)
    return (
      <div className={styles.container}>
        <Flex>
          <Flex.Item style={{ flex: 7 }}>
          </Flex.Item>
          <Flex.Item>
            {/* {<span onClick={() => window.location.href = `http://wxtest.hsms.com.cn/meqm/test/mobileScanPackQrcode?userId=${userId}&storageGuid=${storageGuid}&sendId=${sendId}`}><img src={require("../../assets/image/scan.svg")} alt="扫一扫" /></span>} */}
            {<span onClick={() => window.location.href = `http://yxc.nat300.top/meqm/test/mobileScanPackQrcode?userId=${userId}&storageGuid=${storageGuid}&sendId=${sendId}`}><img src={require("../../assets/image/scan.svg")} alt="扫一扫" /></span>}
          </Flex.Item>
        </Flex>
        <div className={styles.checkContent} style={isSign === "01" ? { height: (document.body.clientHeight - 120) } : null}>
          {
            productData.map((item, index) => {
              return <div className={styles.listCheck} key={index}>
                <h3 className={styles.titleInfo}>
                  <AgreeItem className={styles.geName} checked={allChecked ? allChecked : this.handleDefaultCheckedProduct(item.checkfstate)} onChange={this.handleCheckBoxChange.bind(null, item, index)}>
                    通用名称: {item.materialName}     {item.isRegisterOut || item.isProdDateIn || item.isUsefulDateEve || item.isUsefulDateIn ? <span className={styles.tagFont}>?</span> : null}
                  </AgreeItem>
                  {/* {item.isScope ? <span className={styles.tagFont}>超出供应商许可范围</span> : null} */}
                </h3>
                <div className={styles.checkInfo}>
                  <p>型号: {item.spec}</p>
                  <p>规格: {item.fmodel}</p>
                  <p>采购单位: {item.purchaseUnit}</p>
                  <p>包装规格:{item.tfPacking} </p>
                  <p>生产批号: {item.flot}</p>
                  <p>证件效期: {item.registerFirstLast}</p>
                  {item.isRegisterOut&&item.registerType!=='01' ? <span className={styles.tagFont}>产品注册证已过期</span> : null}
                  <p>生产日期: {item.prodDate}</p>
                  {(item.registerType==='00'&&item.isProdDateIn && item.prodDate)? <span className={styles.tagFont}>生产日期不在注册期内</span> : null}
                  <p>产品效期:{item.usefulDate}</p>
                  {item.isUsefulDateEve ? <span className={styles.tagFont}>临近保质期</span> : null}
                  {item.isUsefulDateIn ? <span className={styles.tagFont}>已过有效期</span> : null}
                  <p>产品注册证号: {item.registerNo}</p>
                  <p>主条码: {item.fbarcode}</p>
                  <p>次条码: {item.fbarcodeSec}</p>
                  <p>单价: {item.purchasePrice}</p>
                  <p>总价: {item.amountMoney}</p>
                </div>
                <hr />
                <div style={{ height: '40px', marginBottom: '7px' }}>
                  {
                    !item.showInput
                    &&
                    <p className={styles.checkNum}>数量: {item.amount}
                      {item.DeliveryDetailFstate === "70" ? null : <span style={{ color: "#666", position: 'absolute', right: '10px' }} onClick={this.handleEditNum.bind(null, item, index)}><FontAwesomeIcon icon="edit" /></span>}
                    </p>
                  }
                  {
                    item.showInput
                    &&
                    <Flex >
                      <Flex.Item>
                        <Stepper
                          style={{ width: '100%', minWidth: '100px', touchAction: 'none' }}
                          showNumber
                          min={0}
                          defaultValue={item.amount}
                          value={this.state.val === null ? item.amount : this.state.val}
                          onChange={(val) => this.onChangeAmount(val, index)}
                        />
                      </Flex.Item>
                      <Flex.Item><Button type="primary" style={{ height: '40px', lineHeight: '40px', borderRadius: '0' }} onClick={this.handleEditOff.bind(null, item, index)}>完成</Button></Flex.Item>
                    </Flex>
                  }
                  <div>

                  </div>
                </div>
              </div>
            })
          }
        </div>
        <div className={styles.checkFooter} style={isSign === "01" ? { height: 85 } : null}>
          {
            isSign !== "01" ?
              <ImagePicker
                length="8"
                files={files}
                onChange={this.imageUpdate}
                onImageClick={this.imageClick}
                selectable={files.length < 8}
                accept="image/*"
              />
              :
              null
          }
          <div className={styles.checkTools}>
            <Flex>
              <Flex.Item>
                <AgreeItem onChange={this.handleAllSelect}>
                  全选
                </AgreeItem>
              </Flex.Item>
              {<Flex.Item style={{ textAlign: 'right', paddingRight: '10px' }}>
                <div>已验收{dataSource.detailCheckNum || 0}/{dataSource.totalAmount || 0}</div>
                <div>产品总数{dataSource.totalAmount}</div>
              </Flex.Item>}
            </Flex>
          </div>
          <div className={styles.infoFooter}>
            <Flex>
              <Flex.Item>
                <span className={styles.infoRightBtn} onClick={this.handleDeliveryThrough} style={{ color: deliveryBtnDisabled ? '#ccc' : '#fff' }}>
                  {deliveryThroughLoading && <Icon type='loading' size='xs' style={{ position: 'relative', top: '5px', left: '-10px', }} />}
                  {isSign === "01" ? "签收通过" : "验收通过"}
                </span>
              </Flex.Item>
              <Flex.Item>
                <span className={styles.infoLeftBtn} onClick={this.handleDeliveryNotThrough} style={{ color: deliveryNotBtnDisabled ? '#ccc' : '#000' }}>
                  {deliveryNotThroughLoading && <Icon type='loading' size='xs' style={{ position: 'relative', top: '5px', left: '-10px', }} />}

                  {isSign === "01" ? "签收不通过" : "验收不通过"}
                </span>
              </Flex.Item>
            </Flex>
          </div>
        </div>
        {/* <Modal
          visible={this.state.modalPic}
          transparent
          style={{ width: '100%' }}
          title={null}
          onClose={()=>{this.setState({modalPic:false})}}
        >
          {
            files && files.length &&
            <Carousel
              autoplay={false}
              dots={false}
              infinite
              selectedIndex={picIndex}
            >
              {files.map(item => (
                <img
                  src={item.url}
                  key={item.id}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top', height: imgHeight }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              ))
              }
            </Carousel>
          }
        </Modal> */}
        {/* <PicModal
          picModalProps={{ visible: modalPic, index: picIndex, imgHeight, files }}
          onClose={() => { this.setState({ modalPic: false }) }}
        /> */}
      </div >
    )
  }
}
export default connect(state => state)(DeliveryCheck);

// function PicModal(props) {
//   const { visible, files, index } = props.picModalProps;
//   return (
//     <div>
//       {
//         visible
//         &&
//         <div className={styles.picModal} >
//           <div className={styles.carousel}>
//             <div className={styles.close}>
//               <Icon type='cross' size='lg' onClick={() => { props.onClose() }} /></div>
//               {
//                 <img
//                 src={files[index].url}
//                 key={files[index].id}
//                 alt=""
//                 style={{ width: '100%', verticalAlign: 'top', height: 'auto' }}
//                 // onLoad={() => {
//                 //   window.dispatchEvent(new Event('resize'));
//                 // }}
//               />
//               }
//             {/* {
//               files && files.length &&
//               <Carousel
//                 autoplay={false}
//                 dots={false}
//                 infinite
//                 selectedIndex={index}
//                 style={{ height: 'auto' }}
//               >
//                 {files.map(item => (
//                   <img
//                     src={item.url}
//                     key={item.id}
//                     alt=""
//                     style={{ width: '100%', verticalAlign: 'top', height: 'auto' }}
//                     onLoad={() => {
//                       window.dispatchEvent(new Event('resize'));
//                     }}
//                   />
//                 ))
//                 } 
//               </Carousel>*/}
//             }
//           </div>
//           <div className={styles.shade}></div>
//         </div>
//       }
//     </div>
//   )
// }