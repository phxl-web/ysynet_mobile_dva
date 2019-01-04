import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}`)),
  component,
});

export const getNavData = app => [
  {
    component: dynamicWrapper(app, [], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    path: '/',
    name: '工作台',
  children: [
    {
      name: "home",
      icon: 'home',
      path: '/home/:userId',
      component: dynamicWrapper(app, [], () => import('../routes/Home'))
    },
    {
      name: "建设中",
      icon: 'setting',
      path: '/result/:userId/:storageGuid',
      component: dynamicWrapper(app, [], () => import('../routes/Result'))
    },
    {
      name: "我的送货单",
      icon: 'setting',
      path: '/delivery/:userId/:storageGuid',
      component: dynamicWrapper(app, ['Delivery'], () => import('../routes/Delivery'))
    },
    {
      name: "送货单信息",
      icon: 'setting',
      path: '/deliveryInfo/:sendId/:userId/:storageGuid/:isSign',
      component: dynamicWrapper(app, ['Delivery'], () => import('../routes/Delivery/deliveryInfo'))
    },
    {
      name: "无效送货单",
      icon: 'setting',
      path: '/deliveryNull/:userId/:storageGuid/:error',
      component: dynamicWrapper(app, ['Delivery'], () => import('../routes/Delivery/deliveryNull'))
    },
    {
      name: "送货单验收界面",
      icon: 'setting',
      path: '/deliveryCheck/:sendId/:userId/:storageGuid/:isSign',
      component: dynamicWrapper(app, ['Delivery'], () => import('../routes/Delivery/deliveryCheck'))
    },
    {
      name: "验收完成界面",
      icon: 'setting',
      path: '/checkComplete/:sendId/:userId/:storageGuid',
      component: dynamicWrapper(app, ['Delivery'], () => import('../routes/Delivery/checkComplete'))
    },
    {
      name: "发表评价",
      icon: 'setting',
      path: '/message/:sendId/:userId/:storageGuid',
      component: dynamicWrapper(app, ['Delivery'], () => import('../routes/Delivery/message'))
    },
    {
      name: "感谢评价",
      icon: 'setting',
      path: '/thankMessage/:userId/:storageGuid',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/thankMessage'))
    },
    {
      name: "进度",
      icon: 'setting',
      path: '/deliveryProgress/:fstate',
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/deliveryProgress'))
    },
    {
      name: "送货单详情",
      icon: 'setting',
      path: '/deliveryDetails/:sendId/:userId/:storageGuid',
      component: dynamicWrapper(app, ['Delivery'], () => import('../routes/Delivery/deliveryDetails'))
    },
    {
      name: "产品列表",
      icon: 'setting',
      path: '/productList/:sendId',
      component: dynamicWrapper(app, ['Delivery'], () => import('../routes/Delivery/productList'))
    },
    //质检
    {
      name: "质检",
      icon: 'setting',
      path: '/qualityTest/:packingCode/:userId/:storageGuid',
      component: dynamicWrapper(app, ['QualityTest'], () => import('../routes/qualityTest'))
    },
    {
      name: "无效包装码",
      icon: 'setting',
      path: '/qualityTest/:userId/:error',
      component: dynamicWrapper(app, ['Delivery'], () => import('../routes/qualityTest/errorInfo'))
    },
    {
      name: "扫箱码",
      icon: 'setting',
      path: '/scanDelivery/:packingCode/:sendId/:userId/:storageGuid',
      component: dynamicWrapper(app, ['QualityTest','Delivery'], () => import('../routes/Delivery/scanDelivery'))
    },
  ]
}];