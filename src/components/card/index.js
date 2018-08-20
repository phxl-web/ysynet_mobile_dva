/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-20 09:28:24 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-20 10:33:22
 * 送货单验收列表中的信息显示
 */
import React, { PureComponent} from 'react';
import {  Stepper ,Button,Checkbox } from 'antd-mobile';
import styles from './card.css';
const AgreeItem = Checkbox.AgreeItem;

class CardInfo extends PureComponent{
  state = {
    val: 3,
    data: [{
      id : 1,
      geName : "指引导管1",
      spec : "LA6SAL10",
      fmodel : "LA6SAL10",
      tenderUnit : "个",
      tfPacking : "00613994818435",
      flot : "00613994818435",
      registerFirstLast : "2019-8-19",
      prodDate : "2017-8-19",
      usefulDate : "2020-8-19",
      tenderPrice : "19.00",
      amount : "22",
      checkfstate : "33"
     },{
      id : 2,
      geName : "指引导管2",
      spec : "LA6SAL10",
      fmodel : "LA6SAL10",
      tenderUnit : "个",
      tfPacking : "00613994818435",
      flot : "00613994818435",
      registerFirstLast : "2019-8-19",
      prodDate : "2017-8-19",
      usefulDate : "2020-8-19",
      tenderPrice : "19.00",
      amount : "22",
      checkfstate : "33"
     },{
      id : 3,
      geName : "指引导管3",
      spec : "LA6SAL10",
      fmodel : "LA6SAL10",
      tenderUnit : "个",
      tfPacking : "00613994818435",
      flot : "00613994818435",
      registerFirstLast : "2019-8-19",
      prodDate : "2017-8-19",
      usefulDate : "2020-8-19",
      tenderPrice : "19.00",
      amount : "22",
      checkfstate : "33"
     }]
  }
  onChange = (val) => {
    // console.log(val);
    this.setState({ val });
  }
  handleCheckBoxChange = (val) => {
    console.log(val);
  }
  //验收通过
  handleCheck = () =>{
    this.props.history.push({pathname:'/CheckComplete'})
  } 

  render(){
    const { data } = this.state;
    return(
          data.map((item,index) => {
            return <div className={styles.listCheck} key={index}>
                    <h3 className={styles.titleInfo}>
                      <AgreeItem className={styles.geName}  onChange={this.handleCheckBoxChange}>通用名称: { item.geName }</AgreeItem>
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
                      <p className={styles.textAlignright}>总价: 100000.00</p>
                    </div>
                    <div>
                      <div className={styles.unitPriceTitle}><span>单价(¥):</span><span className={styles.price}>{ item.tenderPrice }</span></div>
                      <Stepper
                      style={{ width: '40%', minWidth: '100px', }}
                      showNumber
                      max={item.amount}
                      min={1}
                      readOnly={false}
                      value={this.state.val}
                      onChange={this.onChange}
                      />
                   </div>
                  <div className={styles.footCheckBtns}>
                    <Button type="default" inline className={styles.passBtn} style={{border:'1px solid #26a2fa'}} onClick={this.handleCheck}>验收通过</Button>
                    <Button type="default" inline className={styles.noPassBtn} style={{border:'1px solid #fc6621'}} onClick={this.handleCheck}>拒收</Button>
                  </div>
              </div>
             
          })
        

    
    )
  }
}
export default CardInfo;

