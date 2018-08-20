/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 11:16:21 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-20 11:19:08
 * 送货单验收界面
 */
import React , { PureComponent } from 'react';
import { NavBar, Icon, ImagePicker, Flex, Checkbox} from 'antd-mobile';
// import ListViewScroll from '../../components/listViewScroll';
 import CardInfo from '../../components/card';
import { compressImage } from '../../utils';
import styles from './style.css';
const AgreeItem = Checkbox.AgreeItem;

class DeliveryCheck extends PureComponent{
  state = {
    // val:3,
    files: [], // 展示图片
    submitFiles:[], // 提交图片
    imageVisible: false, // 图片 modal
    showBtns: false , // 是否显示验收通过/不通过按钮  整单验收
    contentHeight: 'calc(100vh - 160px)' , //中间div高度
  };

  //图片更新
  imageUpdate = (files, type, index) => {
    const len = files.length - 1;
    const { submitFiles } = this.state;
    if (type === 'add') {
      compressImage(files[len], newImgData => {
        this.setState({ files, submitFiles: [...submitFiles, newImgData]});
      })
    } else {
      submitFiles.splice(index, 1);
      this.setState({ files, submitFiles: submitFiles});
    }
  } 
  // 点击全选，显示验收通过/不通过按钮
  handleAllSelect = (e) => {
    console.log(e);
    if(e.target.checked)
    {
      this.setState( {showBtns : true,contentHeight: "calc(100vh - 190px)"})
    }else{
      this.setState( {showBtns : false,contentHeight: "calc(100vh - 160px)"})
    }

  }


  render (){
    const { files } = this.state;
    return (
      <div className={styles.container}>
           <NavBar
            mode="dark"
            leftContent={<Icon type="left"/>}
            rightContent={
              <span onClick={() => this.props.history.push({pathname:'/DeliveryInfo'})}>扫码</span>
            }
            onLeftClick={() => this.props.history.push({pathname:'/DeliveryInfo'}) }
          >送货单</NavBar>
          <div className={styles.checkContent} style={{height:this.state.contentHeight}}>
          <CardInfo />

            {/* <div className={styles.listCheck}>
              <h3 className={styles.titleInfo}>
                <AgreeItem  style={{ marginLeft:0,paddingBottom:0}} onChange={e => console.log('checkbox', e)}>通用名称</AgreeItem>
              </h3>
              <div className={styles.checkInfo}>
                型号:<br />
                规格:<br />
                采购单位:<br />
                包装规格: <br/>
                生产批号:<br />
                证件效期:<br />
                生产日期:<br />
                产品效期:
                <p style={{textAlign:'right'}}>总价: 100000.00</p>
              </div>
              <div>
                <div style={{width:'60%',display:'inline-block'}}><span>单价(¥):</span><span className={styles.price}>100.00</span></div>
                <Stepper
                style={{ width: '40%', minWidth: '100px', }}
                showNumber
                max={100}
                min={1}
                readOnly={false}
                value={this.state.val}
                onChange={this.onChange}
                />
              </div>
              <div className={styles.footCheckBtns}>
                <Button type="default" inline className={styles.passBtn} style={{border:'1px solid #26a2fa'}}>验收通过</Button>
                <Button type="default" inline className={styles.noPassBtn} style={{border:'1px solid #fc6621'}}>拒收</Button>
              </div>
            </div> */}
            
            
           
          

          {/* <ListViewScroll
                url={"http://118.31.237.150:9100/backw/rrpairOrderController/selectRrpairList"}
                queryParams={{
            }}
                item={obj => {
                return ("11"
                ) 
            }}/> */}

          </div>
          <div className={styles.checkFooter}>
            <ImagePicker
              length="8"
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => this.setState({imageVisible: true, imgSrc: fs[index].url })}
              selectable={files.length < 9}
              accept="image/*"
            />
           <div className={styles.checkTools}>
            <Flex>
                <Flex.Item>
                <AgreeItem  onChange={this.handleAllSelect}>
                    全选
                </AgreeItem>
                </Flex.Item>
                <Flex.Item style={{textAlign:'right',paddingRight:'10px'}}>已验收0/10</Flex.Item>
              </Flex>
           </div>
          {
            this.state.showBtns ?
            <div className={styles.infoFooter}>
              <Flex>
                <Flex.Item><span className={styles.infoRightBtn} onClick={() => this.props.history.push({pathname:'/CheckComplete'})}>验收通过</span></Flex.Item>
                <Flex.Item><span className={styles.infoLeftBtn} onClick={() => this.props.history.push({pathname:'/CheckComplete'})}>验收不通过</span></Flex.Item>
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
export default DeliveryCheck;