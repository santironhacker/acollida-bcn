import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/public/Home.vue';
import Layout from './views/public/Layout.vue';
import LayoutBO from './views/back-office/LayoutBO.vue';
import { auth } from './main';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ './views/public/About.vue')
        },
        {
          path: '/campaigns',
          name: 'campaigns',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ './views/public/campaigns/Campaigns.vue'
            )
        },
        {
          path: '/campaigns/:campaignId',
          name: 'campaign',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ './views/public/campaigns/Campaign.vue'
            )
        },
        {
          path: '/campaign/buses/:busId/bus-registration-form',
          name: 'bus-registration-form',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ './views/public/campaigns/BusRegistrationForm.vue'
            )
        },
        {
          path: '/prayers',
          name: 'prayers',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ './views/public/Prayers.vue')
        },
        /* BACK OFFICE LINK */
        {
          path: '/loginBO',
          name: 'loginBO',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ './views/back-office/LoginBO.vue'
            )
        }
      ]
    },
    /* BACK OFFICE */
    {
      path: '/bo',
      component: LayoutBO,
      redirect: '/homeBO',
      children: [
        {
          path: 'homeBO',
          name: 'homeBO',
          beforeEnter: (to, from, next) => {
            console.log('user', auth.currentUser);
            if (!auth.currentUser) next('/loginBO');
            else next();
          },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ './views/back-office/HomeBO.vue')
        }
      ]
    }
  ]
});
