/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:16:33 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-09-05 16:32:49
 * 验收完成
 */

 import React , { PureComponent } from 'react';
 import {  Icon, Result, Button,List } from 'antd-mobile';
 import { connect } from 'dva';
 import styles from './style.css';
 const Item = List.Item;
 const Brief = Item.Brief;
 class CheckComplete extends PureComponent {
  state = {
    sendId: this.props.match.params.sendId,
    userId: this.props.match.params.userId,
    storageGuid: this.props.match.params.storageGuid ,
    dataSource:{},
    productData:[]
   }
  componentDidMount = () => {
    this.getMobileCheckDelivery();
  }

  getMobileCheckDelivery = () => {
    const { sendId, storageGuid } = this.state;
    this.props.dispatch({
      type: 'delivery/mobileCheckDelivery',
      payload: { storageGuid: storageGuid,sendId: sendId},
      callback: (data) => {
        const productDatas = [];
        data.detials.map((item,index) => {
          if(item.NoCheckNum !== 0){
            productDatas.push(item);
          }
          return null
        })
        this.setState( { dataSource : data, productData:productDatas,} )
        this.setState({ loading: false});
      }
    })
  }
  //  验收通过   图标颜色26a2fa
  //拒收 图标颜色  fc6621
   render () {
     const { dataSource,productData ,userId,storageGuid} = this.state;
     return (
      <div className={styles.container}>
        <Result
        img={dataSource.fstate === "90" ? <Icon type="check-circle" className={styles.nullIcon} style={{ fill: '#fc6621' }} /> : <Icon type="check-circle" className={styles.nullIcon} style={{ fill: '#26a2fa' }} />}
        title={dataSource.fstate === "90" ? "验收完成，整单拒收" : "验收完成"}
        message={
          <div className={styles.checkMessage}>
            <p>送货单号：{ dataSource.sendNo  }</p>
            <p>供应商：{ dataSource.fOrgName }</p>
            <p>验收员：{ dataSource.checkUserName }</p>
            <p>验收时间：{ dataSource.checkTime }</p>
          </div>
        }
        />
        {
          dataSource.fstate === "60" && productData.length !==0?
          <List style={{marginTop:'5px'}}>
          <Item>
            <Brief>验收不通过产品</Brief> 
          </Item>
          {
            productData.map((item,index) =>{
                    return <Item extra={<div><span className={styles.Brief}>{item.NoCheckNum}</span>
                    <span className={styles.detailUnit}>{item.purchaseUnit}</span></div>} key={index}>
                      <span className={styles.detailfiled65}>{item.materialName}</span> 
                    <Brief className={styles.detailBrief}>{item.spec}/{item.fmodel}</Brief>     
                  </Item>
              
            })
    
          }
         
        </List>
          :null
        }
        
        <div className={styles.checkBtns}>
          <Button type="default" inline className={styles.supBtn} onClick={() => this.props.history.push({pathname:`/result/${userId}/${storageGuid}`})}  style={{border:'1px solid #666'}}>联系供应商</Button>
          <Button type="default" inline className={styles.messageBtn} onClick={() => this.props.history.push({pathname:`/message/${this.state.sendId}/${userId}/${storageGuid}`})} style={{border:'1px solid #26a2fa'}}>评价</Button>
          <Button type="default" inline className={styles.goBtn} onClick={() => this.props.history.push({pathname:`/delivery/${userId}/${storageGuid}`})} style={{border:'1px solid green'}}>继续验收</Button>
        </div>
      </div>
     )
   }
 }

 export default connect(state =>  state)(CheckComplete);