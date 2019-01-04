/*
 * @Author: gaofengjiao 
 * @Date: 2018-11-22 09:25:04 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-12-11 10:44:31
 * 质检
 */
import React , { PureComponent } from 'react';
import { WhiteSpace, Tabs, List } from 'antd-mobile';
import ShowPicCard from 'components/showPicCard';
import { connect } from 'dva';
import { FTP } from '../../api/local';
import styles from './style.css';
import moment from 'moment';
const Item = List.Item;
const tabs = [
  { title: '产品参数', value: '1' },
  { title: '资质信息', value: '2' },
];

class QualityTestDetails extends PureComponent{
  state = {
    packingCode: this.props.match.params.packingCode,
    userId: this.props.match.params.userId,
    storageGuid: this.props.match.params.storageGuid,
    baseInfo : null,//产品信息
    zczTfAccessory: false,//注册证图片
    tfAccessoryFile: false,//供应商营业执照
    jyxkAccessoryFile: false,//供应商经营许可证
    businessLicenseAccessory: false ,// 生产商营业执照
    tfAllows:[],//生产商许可证
    sign:false,//标记产品效期是否过期
  }
  
  componentDidMount = () => {
    this.getMobilePackingInfo();
  }
  getMobilePackingInfo = () => {
    const { packingCode, storageGuid } = this.state;
    this.props.dispatch({
      type: 'qualityTest/mobilequalityTestDetails',
      payload: { storageGuid: storageGuid,packingCode: packingCode},
      callback: (data) => {
        const { tfAccessoryFile, jyxkAccessoryFile, businessLicenseAccessory ,zczTfAccessory, tfAllow} = data;
        let sign = false
        if(data.usefulDate){
          sign  =  moment().startOf('day').diff(data.usefulDate) > 0 ? true : false;
        }
        const tfAllows = []
        let tempTfAllow  = this.formatPicAccessory(tfAllow.join(";"));
        tempTfAllow.map(item=>{
          if(item){
            return  tfAllows.push(item);
          }else{
            return null
          }
        })
        setTimeout(() => {
          this.setState({ baseInfo:data, tfAccessoryFile, jyxkAccessoryFile, businessLicenseAccessory,zczTfAccessory ,tfAllows,sign})
        }, 100);
      }
    })
  }
  //更换格式
  formatPicAccessory =( accList )=>{
    if(accList){
      if(Array.isArray(accList)){
        return accList
      }else{
        let retList = accList.split(';');
        return retList
      }
    }else{
      return []
    }
  }

  render() {
    const { baseInfo, tfAccessoryFile, jyxkAccessoryFile, businessLicenseAccessory, zczTfAccessory, tfAllows , sign} = this.state;
    return (
      <div className={styles.container}>
        { zczTfAccessory ?  <ShowPicCard  url={`${FTP}${zczTfAccessory}`} style={{height:276,overflowY:'auto'}}/> : null }
        <WhiteSpace size="sm" />
        <ul className={styles.regInfo}>
          <li className={styles.regInfoName}>{ baseInfo ? baseInfo.materialName : null }</li>
          <li className={styles.regInfoSpec}>{ baseInfo ? baseInfo.fmodel : null }{ baseInfo ? `/${baseInfo.spec}` : null }</li>
          <li className={styles.regInfoMoney}>￥{ baseInfo ? baseInfo.purchasePrice : '0.00' }/个  <span className={styles.regInfoNum}>共{ baseInfo ? baseInfo.amount : 0 }个 </span></li>
        </ul>
        <WhiteSpace size="sm" />
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <List className={styles.prodcutInfo}>
            <Item>注册证号: <span className={styles.listItem}> { baseInfo ? baseInfo.registerNo : null } </span></Item>
            <Item>产品名称: <span className={styles.listItem}> { baseInfo ? baseInfo.materialName : null } </span></Item>
            <Item>品牌:  <span className={styles.listItem}> { baseInfo ? baseInfo.tfBrand : null } </span></Item>
            <Item>生产厂家:  <span className={styles.listItem}> { baseInfo ? baseInfo.produceName : null } </span></Item>
            <Item>型号:  <span className={styles.listItem}> { baseInfo ? baseInfo.fmodel : null } </span></Item>
            <Item>规格:  <span className={styles.listItem}> { baseInfo ? baseInfo.spec : null } </span></Item>
            <Item>采购单位:  <span className={styles.listItem}> { baseInfo ? baseInfo.purchaseUnit : null } </span></Item>
            <Item>生产日期:  <span className={styles.listItem}> { baseInfo ? baseInfo.prodDate : null } </span></Item>
            <Item>产品效期:  <span className={sign ? styles.listItemUsefulDate : styles.listItem}> { baseInfo ? baseInfo.usefulDate : null } </span></Item>
            <Item>生产批号:  <span className={styles.listItem}> { baseInfo ? baseInfo.flot : null } </span></Item>
            <Item>供货商:  <span className={styles.listItem}> { baseInfo ? baseInfo.fOrgName : null } </span></Item>
          </List>
          <div className={styles.tabs2Content}>
            { tfAccessoryFile ? <ShowPicCard title="供应商营业执照"  url={`${FTP}${tfAccessoryFile}`} style={{height:276,overflowY:'auto'}}/> : null }
            { jyxkAccessoryFile ? <ShowPicCard title="供应商经营许可证"  url={`${FTP}${jyxkAccessoryFile}`} style={{height:276,overflowY:'auto'}}/> : null }
            { businessLicenseAccessory ? <ShowPicCard title="生产商营业执照"  url={`${FTP}${businessLicenseAccessory}`} style={{height:276,overflowY:'auto'}}/> : null }
            { tfAllows && tfAllows.length !==0 ?
              tfAllows.map((item,index)=>{
                console.log(index)
                  return <ShowPicCard key={index} title={`生产商许可证${index+1}`}  url={`${FTP}${item}`} style={{height:276,overflowY:'auto'}}/> 
              })
              :null
         
            }
          </div>
        </Tabs>
        
      </div>
    );
  }
}
export default connect(state =>  state)(QualityTestDetails);