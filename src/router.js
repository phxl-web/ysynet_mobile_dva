import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import Login from './routes/Login';
import Home from './routes/Home';
import Delivery from './routes/Delivery';
import DeliveryInfo from './routes/Delivery/deliveryInfo';
import DeliveryNull from './routes/Delivery/deliveryNull';
import DeliveryCheck from './routes/Delivery/deliveryCheck';
import CheckComplete from './routes/Delivery/checkComplete';
import ThankMessage from './routes/Delivery/thankMessage';
import DeliveryProgress from './routes/Delivery/deliveryProgress';
import Message from './routes/Delivery/message';
import DeliveryDetails from './routes/Delivery/deliveryDetails';
import ProductList from './routes/Delivery/productList';
import ResultInfo from './routes/Result';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Redirect from="/" to="/ResultInfo" exact={true}/>
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        {/* 正在建设中 */}
        <Route path="/ResultInfo" exact component={ResultInfo} />
        {/* 送货单列表 */}
        <Route path="/Delivery" exact component={Delivery} />
        {/* 送货单信息 */}
        <Route path="/DeliveryInfo" exact component={DeliveryInfo} />
        {/* 无效送货单 */}
        <Route path="/DeliveryNull" exact component={DeliveryNull} />
        {/* 送货单验收界面 */}
        <Route path="/DeliveryCheck" exact component={DeliveryCheck} />
        {/* 验收完成界面 */}
        <Route path="/CheckComplete" exact component={CheckComplete} />
         {/* 发表评价 */}
         <Route path="/Message" exact component={Message} />
        {/* 感谢评价 */}
        <Route path="/ThankMessage" exact component={ThankMessage} />
        {/* 进度 */}
        <Route path="/DeliveryProgress" exact component={DeliveryProgress} />
        {/* 送货单详情 */}
        <Route path="/DeliveryDetails" exact component={DeliveryDetails} />
        {/* 产品列表 */}
        <Route path="/ProductList" exact component={ProductList} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
