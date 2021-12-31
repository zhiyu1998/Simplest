import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		redirect: '/index',
	},
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Layout.vue'),
		children: [
			{
				path: '/index',
				name: 'Index',
				component: () => import('@/views/Home/Home.vue'),
				meta: { title: 'Home' },
			},
			{
				path: '/archive',
				name: 'Archive',
				component: () => import('@/views/Archive/Archive.vue'),
				meta: { title: 'Archive', titleZh: '归档' },
			},
			{
				path: '/tag',
				name: 'Tag',
				component: () => import('@/views/Tag/Tag.vue'),
				meta: { title: 'Tag', titleZh: '标签' },
			},
			{
				path: '/message',
				name: 'Message',
				component: () => import('@/views/Message/Message.vue'),
				meta: { title: 'Message', titleZh: '留言板' },
			},
			{
				path: '/about',
				name: 'About',
				component: () => import('@/views/About/About.vue'),
				meta: { title: 'About', titleZh: '关于' },
			},
			{
				path: '/friends',
				name: 'Friends',
				component: () => import('@/views/Friends/Friends.vue'),
				meta: { title: 'Friends', titleZh: '友情链接' },
			},
			{
				path: '/blog',
				name: 'Blog',
				component: () => import('@/views/Article/Article.vue'),
				meta: { title: 'Article', titleZh: '博客详情' },
			},
		],
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const fixedTitle = 'Simplest 大道至简 ZhiyuBlogv2 | '
	fixedTitle + to.meta.title && (document.title = fixedTitle + to.meta.title)
	next()
})

export default router
