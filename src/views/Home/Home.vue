<template>
	<div>
		<el-row :gutter="24">
			<el-col :span="18" class="article-list">
				<ArticleItem />
			</el-col>
			<el-col :span="6" class="side-bar">
				<BlogMessage />
				<Notice />
				<NewArticleVue />
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import ArticleItem from '@/views/Home/components/ArticleItem.vue'
import BlogMessage from '@/views/Home/components/BlogMessage.vue'
import Notice from '@/views/Home/components/Notice.vue'
import NewArticleVue from '@/views/Home/components/NewArticle.vue'

import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Index',
	components: {
		ArticleItem,
		BlogMessage,
		Notice,
		NewArticleVue,
	},
	setup() {},
})
</script>

<style scoped lang="less">
.article-item {
	margin-bottom: 20px;
}

.collapse-button {
	z-index: 999;
	position: absolute;
	top: -40px;
	left: 10px;
}
</style>
