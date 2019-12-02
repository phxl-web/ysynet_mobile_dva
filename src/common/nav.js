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
        path: '/home/:userId/:userName/:pwd/:bool',
        component: dynamicWrapper(app, [], () => import('../routes/Home'))

      },
      {
        name: "建设中",
        icon: 'setting',
        path: '/result/:userId/:storageGuid',
        component: dynamicWrapper(app, [], () => import('../routes/Result'))
      },
      {
        name: "手术跟台申请",
        icon: 'setting',
        path: '/surgeryApplication/:userId/:storageGuid/:orgId',
        component: dynamicWrapper(app, ['SurgeryApplication'], () => import('../routes/SurgeryApplication'))
      },
      {
        name: "手术跟台申请-详情",
        icon: 'setting',
        path: '/surgeryApplicationDetails/:planNo/:userId/:storageGuid/:orgId',
        component: dynamicWrapper(app, ['SurgeryApplication'], () => import('../routes/SurgeryApplication/details'))
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
        path: '/deliveryNull/:userId/:storageGuid/:error/:orderType',
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
        component: dynamicWrapper(app, ['QualityTest', 'Delivery'], () => import('../routes/Delivery/scanDelivery'))
      },
      //订单提醒详情 普耗和手术
      {
        name: "普耗详情",
        icon: 'setting',
        path: '/orderReminder/:orderId/:openId',
        component: dynamicWrapper(app, ['OrderReminder'], () => import('../routes/orderReminder'))
      },
      {
        name: "手术订单详情",
        icon: 'setting',
        path: '/orderReminder/operDetails/:orderId/:openId',
        component: dynamicWrapper(app, ['OrderReminder'], () => import('../routes/orderReminder/operDetails'))
      },
      //手术送货单
      {
        name: "手术送货单信息",
        icon: 'setting',
        path: '/operDelivery/:sendId/:userId/:storageGuid/:isSign',
        component: dynamicWrapper(app, ['Delivery'], () => import('../routes/OperDelivery'))
      },
      {
        name: "手术送货单信息",
        icon: 'setting',
        path: '/operDelivery/details/:sendId/:userId/:storageGuid/:isSign/:packageId',
        component: dynamicWrapper(app, ['Delivery'], () => import('../routes/OperDelivery/details'))
      },
      {
        name: "证件列表",
        icon: 'setting',
        path: '/certList/:rOrgId/:fOrgId/:openId',
        component: dynamicWrapper(app, ['OrderReminder'], () => import('../routes/orderReminder/certList'))
      },
    ]
  }];