<template>
	<div class="home">
		<Navigator />
		<Header />
		<div class="content-box" :class="{ 'content-collapse': collapse }">
			<el-scrollbar ref="scrollbar" @scroll="handleScroll">
				<div class="content">
					<router-view v-slot="{ Component }">
						<transition name="move" mode="out-in">
							<keep-alive exclude="Article">
								<component :is="Component" />
							</keep-alive>
						</transition>
					</router-view>
				</div>
			</el-scrollbar>
		</div>
		<BackTop />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { useStore } from '../store'

import Navigator from '@/components/common/Navigator.vue'
import Header from '@/components/common/Header.vue'
import BackTop from '@/components/common/BackTop.vue'
import EventBus from '../utils/bus'

import _ from 'lodash'

export default defineComponent({
	name: 'Home',
	components: {
		Navigator,
		Header,
		BackTop,
	},
	setup() {
		const store = useStore()
		const collapse = computed(() => store.collapse)
		const scrollbar = ref()

		const state = reactive({
			progress: 0,
		})

		const handleScroll = ({ scrollTop }: { scrollTop: any }) => {
			state.progress = scrollTop
			store.$patch((state) => {
				state.contentHeight = scrollTop
			})
		}

		// const content = ref<HTMLElement>() // content.value.scrollTop
		// onMounted(() => {
		// 	window.addEventListener(
		// 		'scroll',
		// 		_.debounce(function () {
		// 			store.commit('handleContentHeight', content?.value?.scrollTop)
		// 		}, 700),
		// 		true
		// 	)
		// })

		EventBus.on('tocAnchor', (anchor: string) => {
			console.log(anchor)

			const offsetTop = document.getElementById(anchor)?.offsetTop
			console.log(offsetTop)

			scrollbar.value.setScrollTop(offsetTop)
		})

		return {
			collapse,
			handleScroll,
			scrollbar,
		}
	},
})
</script>
