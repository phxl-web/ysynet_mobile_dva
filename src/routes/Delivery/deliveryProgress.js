/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:22:22 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-09-04 15:49:52
 * 送货单进度
 */

 import React , { PureComponent } from 'react';
 import { Steps } from 'antd-mobile';
 import styles from './style.css';
 const Step = Steps.Step;

 class DeliveryProgress extends PureComponent{
   state= {
    fstate: this.props.match.params.fstate,
   }

  render(){
    const { fstate } = this.state;

    return (
      <div className={styles.container}>
     
        <div className={styles.progressBox}>
          <Steps size="small" >
            <Step title="供应商发货"  icon={<img src={fstate==="40" ?require('../../assets/image/progress1.svg'):require('../../assets/image/progress2.svg')}  alt="进度" className={styles.iconProgress}/>} />
            <Step title="送货单验收"  icon={<img src={fstate==="50" || fstate === "60" || fstate === "90" ?require('../../assets/image/progress1.svg'):require('../../assets/image/progress2.svg')} alt="进度" className={styles.iconProgress}/>} />
            <Step title="交易完成" icon={<img src={fstate==="80" ? require('../../assets/image/progress1.svg'):require('../../assets/image/progress2.svg')} alt="进度" className={styles.iconProgress}/>} />
          </Steps>
        </div>

      </div>
    )
  }
 }
export default DeliveryProgress;