<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span>项目更新公告</span>
				<el-button class="button" type="text">查看详情</el-button>
			</div>
		</template>
		<div v-for="(updateitem, index) in updateContent" :key="index" class="text item">
			{{ index + 1 + '. ' + updateitem }}
		</div>
	</el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Notice',
	setup() {
		const updateContent = ['加入了音乐模块', '更新了SQL语句', '加入了友情链接', '加入了留言板']
		return {
			updateContent,
		}
	},
})
</script>

<style scoped>
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.box-card {
	animation: slideInRight 0.7s;
	margin-top: 20px;
}
</style>
