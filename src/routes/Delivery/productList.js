/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:23:46 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-17 13:50:26
 * 产品列表
 */
import React , { PureComponent } from 'react';
import { NavBar, Icon, List, Modal } from 'antd-mobile';
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
class ProductList extends PureComponent { 
  state = {
    showModal: false
  }
  // 点击查看详情
  handleClick = () => {
    this.setState( { showModal : true})
  }
  render(){
    return(
      <div className={styles.container}>
        <NavBar
        mode="dark"
        leftContent={<Icon type="left"/>}
        onLeftClick={() => this.props.history.push({pathname:'/DeliveryDetails'}) }
        >产品列表</NavBar>
        <List>
          <Item>
            GD00015180700016ZJ 
            <Brief>供应商名称</Brief>
          </Item>
         
        </List>
        <List style={{marginTop:'5px'}}>
          <Item extra="*100包" onClick={this.handleClick}>
            通用名称通用名称通用名称通通用名称通用名称通用名称通   
          </Item>
          <Item extra="收货数量：100">
            <Brief>型号/规格</Brief>     
          </Item>
          <Item extra="*100包">
            通用名称通用名称通用名称通通用名称通用名称通用名称通   
          </Item>
          <Item extra="收货数量：100" onClick={this.handleClick}>
            <Brief>型号/规格</Brief>     
          </Item>
        </List>
        <Modal
          visible={this.state.showModal}
          transparent
          maskClosable={false}
          onClose={()=>this.setState({showModal:false})}
          title="通用名称通用名称通用名称"
          footer={[{ text: '关闭', onPress: () => {this.setState({showModal:false}) } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{textAlign:'left',marginLeft:"15px"}}>
            型号:<br />
            规格:<br />
            包装单位: <br/>
            采购单位:<br />
            生产批号:<br />
            生产日期:<br />
            有效期:<br />
            发货数量:<br />
            验收数量:<br />
            单价(¥）:<br />
            总价(¥）:<br />
          </div>
        </Modal>
      </div>

    )
  }
}
export default ProductList;