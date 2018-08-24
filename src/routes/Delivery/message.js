/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:20:41 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-24 11:30:40
 * 发表评价
 */

import React , { PureComponent } from 'react';
import { TextareaItem, List ,Button } from 'antd-mobile';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'dva';
import styles from './style.css'

const Item = List.Item;
const Brief = Item.Brief;
class Message extends PureComponent{
  state = {
    loading: false,
    score: 5,
    evaluateWords: '',
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({score: nextValue});
  }
  handleBlur = (val) => {
   this.setState( { evaluateWords : val})
  }
  handleClick = () => {
    this.setState({ loading: true})
    const { evaluateWords,score } = this.state;
    const storageGuid = this.props.users.userInfo.rStorageGuid;
    const sendId = this.props.match.params.sendId;
    this.props.dispatch({
      type: 'delivery/deliveryEvaluate',
      payload: { storageGuid:storageGuid,sendId:sendId,evaluateWords:evaluateWords,score:score },
      callback: () => {
        this.setState({ loading: false}); 
      }
    })
  }


  render (){
    const { score } = this.state;
    console.log(this.props)
    return(
      <div>
        <TextareaItem
          rows={5}
          placeholder="请填写评价"
          onBlur={this.handleBlur}
        />
        <List>
          <Item>
          送货评分:
            <Brief>
              <StarRatingComponent 
                  name="score" 
                  className={styles.star}
                  emptyStarColor={'#e5e5e5'}
                  value={score}
                  onStarClick={this.onStarClick.bind(this)}
                />
            </Brief>
          </Item>
        </List>
        <div className={styles.margin10}>
          <Button type="primary" loading={this.state.loading} onClick={this.handleClick}>发表</Button>
        </div>
      </div>
    )
  }
}

export default connect(state =>  state)(Message);