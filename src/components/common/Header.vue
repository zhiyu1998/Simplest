<template>
	<div
		:class="[
			'header',
			collapse ? 'header-collapse-off' : 'header-collapse-on',
			route.meta.title == 'Home' ? 'bg-null' : '',
		]"
	>
		<!-- 折叠按钮 -->
		<div class="collapse-btn">
			<el-button
				@click="collapseChage"
				style="box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; margin-left: 10px"
				circle
			>
				<i v-if="collapse" class="iconfont blog-right"></i>
				<i v-else class="iconfont blog-left"></i>
			</el-button>
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
							v-model="moonMode"
							inline-prompt
							:active-icon="Moon"
							:inactive-icon="Sunny"
							inactive-color="#3498db"
							active-color="#2c3e50"
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
import { ref, computed, onMounted, defineComponent } from 'vue'
import { useStore } from '../../store'
import Search from './Search.vue'
import { useRoute } from 'vue-router'

import { Sunny, Moon } from '@element-plus/icons-vue'

export default defineComponent({
	components: { Search },
	setup() {
		const route = useRoute()
		const store = useStore()

		// 侧边栏折叠
		const collapseChage = () => {
			store.$patch({
				collapse: !collapse.value,
			})
		}

		const collapse = computed(() => store.collapse)

		const moonMode = ref(false)

		onMounted(() => {
			if (document.body.clientWidth < 1500) {
				collapseChage()
			}
		})

		const routeTitle = computed(() => route.meta.title as string)

		return {
			collapse,
			collapseChage,
			Sunny,
			Moon,
			Search,
			moonMode,
			routeTitle,
			route,
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
	.collapse-btn {
		cursor: pointer;
		margin-top: 10px;
		position: absolute;
		top: 0;
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
	background: #fff;
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
