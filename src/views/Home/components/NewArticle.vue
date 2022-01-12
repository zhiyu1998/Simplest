<template>
	<div>
		<el-card class="box-card">
			<template #header> 最新文章 </template>
			<div class="blog-message">
				<el-row v-for="blog in state.newBlogs" :key="blog.id" class="new-blog-item">
					<span>{{ blog.title }}</span>
					<span>{{ moment(blog.createTime).format('YYYY-MM-DD') }}</span>
					<el-divider style="padding: 0; margin: 0" border-style="dotted"></el-divider>
				</el-row>
			</div>
		</el-card>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'

import urls from '../../../utils/urls'
import service from '../../../utils/request'
import { NewBlog } from '../../../types/index'
import moment from 'moment'

export default defineComponent({
	setup() {
		const state = reactive({
			newBlogs: [] as Array<NewBlog>,
		})

		const getData = async (): Promise<void> => {
			const res: any = await service.get(urls.getNewBlogs, {})

			state.newBlogs = res
		}
		onMounted(() => {
			getData()
		})

		return {
			state,
			moment,
		}
	},
})
</script>
<style scoped lang="less">
.box-card {
	animation: slideInRight 0.9s;
	margin-top: 20px;
	.new-blog-item {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		margin-bottom: 18px;
		margin-top: 5px;
	}
}
</style>
