// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';


// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

// 3.0.2 导入路由规则对应的组件对象
import Home from './components/Home.vue';
import shopCar from './components/account/shopCar/shopCar.vue';
import newsList from './components/account/news/newsList.vue';
// 导入详情页面
import newsInfo from './components/account/news/newsInfo.vue';
// 引入图片分享
import photolist from './components/account/photos/photolist.vue'
// 引入图片详情页面
import photoinfo from './components/account/photos/photoinfo.vue'
// 引入购物部分
import goodslist from './components/account/goods/goodslist.vue'
// 引入商品详情
import goodsinfo from './components/account/goods/goodsinfo.vue'
// 引入商品详情
import info from './components/account/goods/info.vue'
import commontinfo from './components/account/goods/commontinfo.vue'

// 3.0.2 定义路由规则
var router1 = new vueRouter({
    // 在vue中 改变class的固定写法
    linkActiveClass: "mui-active",
    routes: [
        // 将默认首页设置为home
        { path: "/", redirect: "Home" },
        { path: '/Home', component: Home },
        { path: '/shopCar/shopCar', component: shopCar },
        { path: '/news/newsList', component: newsList },
        { path: '/news/newsInfo/:id', component: newsInfo },
        { path: '/photos/photolist', component: photolist },
        { path: '/photos/photoinfo/:id', component: photoinfo },
        { path: '/goods/goodslist', component: goodslist },
        { path: '/goods/goodsinfo/:id', component: goodsinfo },
        { path: '/goods/goodsinfo/info/:id', component: info },
        { path: '/goods/goodsinfo/commontinfo/:id', component: commontinfo },

    ]
});


// 4.0 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui
Vue.use(mintui);
// 导入 MUI
import '../statics/mui/css/mui.css';
// 5.0 利用Vue对象进行解析渲染
// 引入base css 文件
import '../statics/css/base.css'
// 引用vue-resource 获取图片
import VueResource from 'vue-resource';
Vue.use(VueResource);
// 引用日期格式
import moment from 'moment';
Vue.filter('datafmt', function(input, fmtstring) {
        return moment(input).format(fmtstring)
    })
    // 引用vue-preview来设置缩略图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

new Vue({
    el: '#app',
    // 使用路由对象实例
    router: router1,
    // render:function(create){create(App)} //es5的写法
    render: c => c(App) // es6的函数写法 =>：goes to
});