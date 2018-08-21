/*
 * @Author: gaofengjiao 
 * @Date: 2018-08-16 14:20:41 
 * @Last Modified by: gaofengjiao
 * @Last Modified time: 2018-08-20 16:02:24
 * 发表评价
 */

import React , { PureComponent } from 'react';
import { NavBar, Icon, TextareaItem, List,Flex ,Button } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
class Message extends PureComponent{
  render (){
    return(
      <div>
        <NavBar
          mode="dark"
          leftContent={<Icon type="left"/>}
          rightContent={
            <span onClick={() => this.props.history.push({pathname:'/ThankMessage'})}>发表</span>
          }
          onLeftClick={() => this.props.history.push({pathname:'/Delivery'}) }
        >发表评价</NavBar>
        <TextareaItem
          rows={5}
          placeholder="请填写评价"
        />
        <List>
          <Item>
          送货评分:
            <Brief>
              <Flex>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item>5星</Flex.Item>
              </Flex>
            </Brief>
          </Item>
          <Item>
          指标2:
            <Brief>
              <Flex>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item>5星</Flex.Item>
              </Flex>
            </Brief>
          </Item>
          <Item>
          指标2:
            <Brief>
              <Flex>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item><img src={require('../../assets/image/star.svg')} alt="星"/></Flex.Item>
                <Flex.Item>5星</Flex.Item>
              </Flex>
            </Brief>
          </Item>
        </List>
        　<Button type="primary">发表</Button>
      </div>
    )
  }
}

export default Message;