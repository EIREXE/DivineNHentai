const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'search/:query', name: 'search', props: true, component: () => import('pages/Search.vue') },
      {
        path: '/book/:id',
        name: 'book',
        component: () => import('layouts/BookLayout.vue'),
        children: [
          { name: 'book_info', path: '', props: true, component: () => import('pages/Book.vue') },
          { name: 'book_read', path: 'read', props: true, component: () => import('pages/BookRead.vue') }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
