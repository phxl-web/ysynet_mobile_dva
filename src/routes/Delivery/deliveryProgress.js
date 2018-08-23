/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:22:22 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-22 14:21:52
 * 送货单进度
 */

 import React , { PureComponent } from 'react';
 import { NavBar, Icon, Steps } from 'antd-mobile';
 import styles from './style.css';
 const Step = Steps.Step;

 class DeliveryProgress extends PureComponent{
  render(){
    return (
      <div className={styles.container}>
     
        <div className={styles.progressBox}>
          <Steps size="small" current={0}>
            <Step title="供应商发货" icon={<img src={require('../../assets/image/progress1.svg')} alt="进度" className={styles.iconProgress}/>} />
            <Step title="送货单验收" icon={<img src={require('../../assets/image/progress2.svg')} alt="进度" className={styles.iconProgress}/>} />
            <Step title="建议完成" icon={<img src={require('../../assets/image/progress2.svg')} alt="进度" className={styles.iconProgress}/>} />
          </Steps>
        </div>

      </div>
    )
  }
 }
export default DeliveryProgress;