import React , { PureComponent } from 'react';
import { List } from 'antd-mobile';
import { connect } from 'dva';

const Item = List.Item;

class OpOrderReiminder extends  PureComponent {
  state = {
    rOrgId: this.props.match.params.rOrgId,
    fOrgId: this.props.match.params.fOrgId,
    certDataList: [],
  }
  componentDidMount = () => {
    this.getOrderOperInfo();
  }
  getOrderOperInfo = () => {
    const { rOrgId, fOrgId } = this.state;
    this.props.dispatch({
      type: 'orderReminder/queryCertList',
      payload: { rOrgId: rOrgId,fOrgId: fOrgId},
      callback: (data) => {
   
        setTimeout(() => {
          this.setState({ certDataList:data})
        }, 100);
      }
    })
  }
  render() {
    const { certDataList } = this.state;
    return (
    <div>
      <List >
        {
          certDataList.map((item,index)=>{
          return <Item key={index}>{ item && item.registerNo }</Item>
          })
        }
      </List>

    </div>
    )
  }
}
export default connect(state =>  state)(OpOrderReiminder);
