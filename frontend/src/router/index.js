import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import HowToPlay from '@/components/HowToPlay'
import DesignPrinciple from '@/components/DesignPrinciple'
import AboutUs from '@/components/AboutUs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ad/0'
    },
    {
      path: '/ad/:id',
      name: 'Main',
      component: Main,
      meta: { view: Main }
    },
    {
      path: '/how_to_play',
      name: 'HowToPlay',
      component: HowToPlay,
      meta: { view: HowToPlay }
    },
    {
      path: '/design',
      name: 'DesignPrinciple',
      component: DesignPrinciple,
      meta: { view: DesignPrinciple }
    },
    {
      path: '/about',
      name: 'About',
      component: AboutUs,
      meta: { view: AboutUs }
    }
  ]
})
