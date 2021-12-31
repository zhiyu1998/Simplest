<template>
	<el-affix target=".article-container" :offset="100">
		<el-card shadow="hover" class="catalogue">
			<el-tree :data="state.dataTree" @node-click="handleNodeClick" />
		</el-card>
	</el-affix>
</template>
<script lang="ts">
import { onMounted, reactive, defineComponent, onUnmounted } from 'vue'
import { Toc, TocTree } from '../../../types/index'
import _ from 'lodash'
import EventBus from '../../../utils/bus'

export default defineComponent({
	name: 'ScrollTo',
	props: {
		toc: {
			type: Array,
			default: '',
		},
	},
	setup(props) {
		const state = reactive({
			dataTree: [] as Array<TocTree>,
		})

		// 生成TOC
		const buildTocTree = (): Array<TocTree> => {
			const data = _.cloneDeep(props.toc)

			const anchorMaping = data.reduce((pre: any, cur: Toc, index: number) => {
				pre[cur.anchor] = index
				return pre
			}, {})

			let curRoot: Toc = data[0]
			const tempToc = data.slice(1)
			tempToc.forEach((element: Toc) => {
				if (element.level > curRoot.level) {
					const deepLevel = element.anchor.substring(0, 5)
					const level = Number(element.anchor.charAt(5)) - 1 + ''
					const parentAnchor = deepLevel + level + '1'

					// 用映射表找到父元素
					const parentEl = data[anchorMaping[parentAnchor]]
					// 把当前元素添加到父元素的`children`数组中
					parentEl.children = [...(parentEl.children || []), element]
				} else {
					curRoot = element
				}
			})

			// 第一层为最大的
			const min = data[0].level

			const res = data.filter((toc: Toc) => {
				return toc.level == min
			})

			return res
		}

		onMounted(() => {
			state.dataTree = buildTocTree()
		})

		// 在目录下点击某个节点后传入到祖先组件（Layout）进行滑动
		const handleNodeClick = (dataObj: Toc) => {
			// const anchor = data.anchor
			const anchor = dataObj.anchor
			EventBus.emit('tocAnchor', anchor)
		}

		return {
			state,
			handleNodeClick,
		}
	},
})
</script>
<style lang="less">
.catalogue {
	border-radius: 30px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
	width: 100%;
}
</style>
