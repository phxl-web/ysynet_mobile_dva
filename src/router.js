// import React  from 'react';
// import { Router, Route, Switch,Redirect } from 'dva/router';
// import Login from './routes/Login';
// import Home from './routes/Home';
// import Delivery from './routes/Delivery';
// import DeliveryInfo from './routes/Delivery/deliveryInfo';
// import DeliveryNull from './routes/Delivery/deliveryNull';
// import DeliveryCheck from './routes/Delivery/deliveryCheck';
// import CheckComplete from './routes/Delivery/checkComplete';
// import ThankMessage from './routes/Delivery/thankMessage';
// import DeliveryProgress from './routes/Delivery/deliveryProgress';
// import Message from './routes/Delivery/message';
// import DeliveryDetails from './routes/Delivery/deliveryDetails';
// import ProductList from './routes/Delivery/productList';
// import ResultInfo from './routes/Result';

// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Switch>
//         <Redirect from="/" to="/login" exact={true}/>
//         <Route path="/login" exact component={Login} />
//         <Route path="/home" exact component={Home} />
//         {/* 正在建设中 */}
//         <Route path="/ResultInfo" exact component={ResultInfo} />
//         {/* 送货单列表 */}
//         <Route path="/Delivery" exact component={Delivery} />
//         {/* 送货单信息 */}
//         <Route path="/DeliveryInfo" exact component={DeliveryInfo} />
//         {/* 无效送货单 */}
//         <Route path="/DeliveryNull" exact component={DeliveryNull} />
//         {/* 送货单验收界面 */}
//         <Route path="/DeliveryCheck" exact component={DeliveryCheck} />
//         {/* 验收完成界面 */}
//         <Route path="/CheckComplete" exact component={CheckComplete} />
//          {/* 发表评价 */}
//          <Route path="/Message" exact component={Message} />
//         {/* 感谢评价 */}
//         <Route path="/ThankMessage" exact component={ThankMessage} />
//         {/* 进度 */}
//         <Route path="/DeliveryProgress" exact component={DeliveryProgress} />
//         {/* 送货单详情 */}
//         <Route path="/DeliveryDetails" exact component={DeliveryDetails} />
//         {/* 产品列表 */}
//         <Route path="/ProductList" exact component={ProductList} />
//       </Switch>
//     </Router>
//   );
// }

import React from 'react';
import { Router, Route, Switch } from 'dva/router';

// import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';

import Login from './routes/Login';

import { getNavData } from './common/nav';
import { getPlainNode } from './utils';



// dynamic.setDefaultLoadingComponent(() => (
//   <div className='loding-wapper'>
//     <Spin size="large"/>
//   </div>
// ))

function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}


function RouterConfig({ history, app }) {
  const navData = getNavData(app);
  //const WorkplaceLayout = getLayout(navData, 'WorkplaceLayout').component;
  const BasicLayout = getLayout(navData, 'BasicLayout').component;
  const passProps = {
    app,
    navData,
    getRouteData: (path) => {
      return getRouteData(navData, path);
    },
  };
  
  return (

      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login}/>
          {/* <Route path="/home" component={Home}/> */}
          {/* <Route path="/app" render={props => <WorkplaceLayout {...props} {...passProps} />} /> */}
          <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
        </Switch>
      </Router>

  );
}



export default RouterConfig;
