<template>
	<div
		:class="[
			'header',
			collapse ? 'header-collapse-off' : 'header-collapse-on',
			route.meta.title == 'Home' ? 'bg-null' : '',
		]"
	>
		<!-- 折叠按钮 -->
		<div class="toggle" :class="{ active: !collapse }" @click="collapseChange">
			<span></span>
			<span></span>
			<span></span>
		</div>
		<!-- LOGO -->
		<div class="logo">
			<!-- <el-image class="logo-img" src="logo.png" /> -->
			<!-- <p>Simplest</p> -->
		</div>
		<div class="right-side">
			<el-row :gutter="24">
				<el-col :span="19">
					<!-- 搜索栏 -->
					<div class="search">
						<Search />
					</div>
				</el-col>
				<!-- 暗黑模式 -->
				<el-col :span="5">
					<div class="moon-mode">
						<el-switch
							class="moon-mode-switch"
							v-model="globalDark"
							inline-prompt
							:active-icon="Sunny"
							:inactive-icon="Moon"
							inactive-color="#2c3e50"
							active-color="#3498db"
							@change="darkToggle()"
						></el-switch>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
	<div v-if="route.meta.title != 'Home'">
		<el-image class="bg" fit="cover" :src="routeTitle.toLowerCase() + '.png' || ''" />
	</div>
</template>
<script lang="ts">
import { computed, onMounted, defineComponent } from 'vue'
import { useStore } from '../../store'
import Search from './Search.vue'
import { useRoute } from 'vue-router'

import { Sunny, Moon } from '@element-plus/icons-vue'
import { toggleDark, isDark } from '../darkToggle'


export default defineComponent({
	components: { Search },
	setup() {		
		const route = useRoute()
		const store = useStore()

		const collapse = computed(() => store.collapse)
		const globalDark = computed(() => store.globalDark)

		// 侧边栏折叠
		const collapseChange = () => {
			store.$patch({
				collapse: !collapse.value,
			})
		}

		const darkToggle = () => {
			toggleDark()
			store.$patch({
				globalDark: isDark.value
			})
		}

		onMounted(() => {
			if (document.body.clientWidth < 1500) {
				collapseChange()
			}
		})

		const routeTitle = computed(() => route.meta.title as string)

		return {
			collapse,
			collapseChange,
			Sunny,
			Moon,
			Search,
			routeTitle,
			route,
			globalDark,
			darkToggle
		}
	},
})
</script>
<style scoped lang="less">
.header {
	position: absolute;
	opacity: 0.9;
	top: 0;
	box-sizing: border-box;
	padding-right: 65px;
	width: 100%;
	height: 70px;
	font-size: 22px;
	display: flex;
	justify-content: space-between;
	-webkit-transition: left 0.3s ease-in-out;
	transition: left 0.3s ease-in-out;
	box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;

	.toggle {
		position: relative;
		width: 40px;
		height: 40px;
		box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		margin: 10px 0 0 10px;
		overflow: hidden;
		& span {
			position: absolute;
			width: 30px;
			height: 2px;
			background-color: #3498db;
			border-radius: 10px;
			transition: 0.5s;
		}
		& span:nth-child(1) {
			transform: translateY(-15px);
			width: 20px;
			left: 6px;
		}
		&.active span:nth-child(1) {
			width: 30px;
			transform: translateY(0) rotate(45deg);
		}
		& span:nth-child(2) {
			transform: translateY(15px);
			width: 15px;
			left: 6px;
		}
		&.active span:nth-child(2) {
			width: 30px;
			transform: translateY(0) rotate(-45deg);
		}
		&.active span:nth-child(3) {
			transform: translateX(60px);
		}
	}
	.right-side {
		.search {
			margin-top: 10px;
		}
		.collapse-on {
			margin-right: 100px;
		}
		.moon-mode {
			margin: 15px 50px 0 0;
		}
	}
}
@keyframes rotate {
	0% {
		transform: translate(-50%, -50%) rotate(0);
	}
	100% {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}

.bg-null {
}

.bg {
	position: absolute;
	filter: contrast(70%);
	height: 70%;
	width: 100%;
	z-index: -2;
}

.header-collapse-on {
	left: 152px;
}
.header-collapse-off {
	left: 65px;
}

.typed {
	position: absolute;
	top: 0;
	left: 40%;
	z-index: 999;
}
</style>
