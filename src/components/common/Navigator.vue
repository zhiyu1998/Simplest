<template>
	<div class="sidebar">
		<el-menu
			:default-active="onRoutes"
			class="sidebar-el-menu"
			:collapse="collapse"
			unique-opened
			router
		>
			<template v-for="item in items" :key="item.index">
				<div>
					<el-menu-item :index="item.index">
						<i :class="item.icon"></i>
						<template #title>
							<span class="item-font">{{ item.title }}</span>
						</template>
					</el-menu-item>
				</div>
			</template>
			<el-menu-item active-text-color="#fff" v-if="collapse == false">
				<a
					href="https://travellings.link/"
					target="_blank"
					rel="noopener"
					title="开往-友链接力"
					style="color: #000000"
				>
					<img
						src="https://travellings.link/assets/logo.gif"
						alt="开往-友链接力"
						width="120"
					/>
				</a>
			</el-menu-item>
			<el-menu-item v-else>
				<a
					href="https://travellings.link/"
					target="_blank"
					rel="noopener"
					title="开往-友链接力"
					><i class="iconfont blog-train"></i
				></a>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useStore } from '../../store'
import { useRoute } from 'vue-router'

export default defineComponent({
	setup() {
		const items = [
			{
				icon: 'iconfont blog-home',
				index: '/index',
				title: '首页',
			},
			{
				icon: 'iconfont blog-guidang',
				index: '/archive',
				title: '归档',
			},
			{
				icon: 'iconfont blog-label',
				index: '/tag',
				title: '标签',
			},
			{
				icon: 'iconfont blog-friend',
				index: '/message',
				title: '留言板',
			},
			{
				icon: 'iconfont blog-about',
				index: '/about',
				title: '关于',
			},
			{
				icon: 'iconfont blog-friend',
				index: '/friends',
				title: '友情链接',
			},
		]
		const route = useRoute()
		const store = useStore()

		const onRoutes = computed(() => {
			return route.path
		})

		const collapse = computed(() => store.collapse)

		return {
			onRoutes,
			collapse,
			items,
		}
	},
})
</script>

<style scoped lang="less">
.sidebar {
	opacity: 0.8;
	position: absolute;
	display: block;
	left: 0;
	bottom: 0;
	top: 0;
	overflow-y: hidden;
	box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

.sidebar::-webkit-scrollbar {
	width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
	width: 150px;
}

.sidebar > ul {
	height: 100%;
}

.item-font {
	font-size: 15px;
	padding-left: 5px;
	font-weight: thin;
}
</style>
