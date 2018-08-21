import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}`)),
  component,
});

export const getNavData = app => [
  {
  component: dynamicWrapper(app, [], () => import('../routes/Home')),
  layout: 'Home',
  path: '/',
  name: 'Home',
  children: [
    {
      name: "建设中",
      icon: 'setting',
      path: '/result',
      component: dynamicWrapper(app, [], () => import('../routes/Result'))
    },
    {
      name: "我的送货单",
      icon: 'setting',
      path: '/delivery',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery'))
    },
    {
      name: "送货单信息",
      icon: 'setting',
      path: '/deliveryInfo',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/deliveryInfo'))
    },
    {
      name: "无效送货单",
      icon: 'setting',
      path: '/deliveryNull',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/deliveryNull'))
    },
    {
      name: "送货单验收界面",
      icon: 'setting',
      path: '/deliveryCheck',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/deliveryCheck'))
    },
    {
      name: "验收完成界面",
      icon: 'setting',
      path: '/checkComplete',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/checkComplete'))
    },
    {
      name: "发表评价",
      icon: 'setting',
      path: '/message',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/message'))
    },
    {
      name: "感谢评价",
      icon: 'setting',
      path: '/thankMessage',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/thankMessage'))
    },
    {
      name: "感谢评价",
      icon: 'setting',
      path: '/deliveryProgress',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/deliveryProgress'))
    },
    {
      name: "送货单详情",
      icon: 'setting',
      path: '/deliveryDetails',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/deliveryDetails'))
    },
    {
      name: "产品列表",
      icon: 'setting',
      path: '/productList',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/productList'))
    },
  ]
}];