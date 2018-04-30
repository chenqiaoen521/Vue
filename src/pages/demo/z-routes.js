const routes = [
  {
    path: '/',
    component: () => import('@/pages/demo/index')
  },
  {
    path: '/view',
    component: () => import('@/components/view')
  }
]

export default routes
