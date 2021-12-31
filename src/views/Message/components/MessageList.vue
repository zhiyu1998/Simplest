<template>
	<el-card shadow="hover" class="message-card">
		<div class="message-title">
			<h2 style="margin-bottom: 20px">共有 {{ commentCount }} 条留言</h2>
			<div style="margin-right: 5px">
				<span style="color: #3498db; cursor: pointer" @click="handleHotSort"
					><el-avatar
						src="comment_flag.png"
						:size="20"
						v-if="isHotSort"
					/>按热度排序</span
				>
				|

				<span style="color: #3498db; cursor: pointer" @click="handleLatestSort"
					><el-avatar
						src="comment_flag.png"
						:size="20"
						v-if="!isHotSort"
					/>按最新排序</span
				>
			</div>
		</div>
		<div v-for="item in message" :key="item.id">
			<el-card class="message-card">
				<el-row :gutter="20" class="card-header">
					<el-col :span="1">
						<el-avatar
							v-if="item.adminComment == false"
							:size="50"
							src="anonymity.png"
						></el-avatar>
						<el-avatar v-else :size="50" src="anonymity.png"></el-avatar>
					</el-col>
					<el-col :span="14">
						<el-row>
							<span class="nickname">{{ item.nickname }}</span>
							<span class="time">
								<time>{{
									moment(item.createTime).format('YYYY-MM-DD h:mm:ss')
								}}</time>
							</span>
						</el-row>
						<el-row justify="space-between">
							<el-card shadow="hover" class="message-content" style="margin: 0px"
								>{{ item.content }}
							</el-card>
						</el-row>
					</el-col>
				</el-row>
				<div>
					<div class="relpy-func">
						<LikeButton :like="item.likeComment" />
						<el-button class="reply" @click="dialogFormVisible = true" type="primary"
							>回复</el-button
						>
					</div>

					<el-divider></el-divider>
				</div>
				<!-- 回复 -->
				<Reply :reply-comments="item.replyComments" :parent-name="item.nickname" />
			</el-card>
		</div>
	</el-card>
	<!-- 模态框 -->
	<el-dialog v-model="dialogFormVisible" title="当前昵称：（尚未加入登录功能，属于测试阶段）">
		<el-form :model="form">
			<el-form-item label="回复内容" :label-width="formLabelWidth">
				<el-input v-model="form.content" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script lang="ts">
import urls from '../../../utils/urls'
import service from '../../../utils/request'
import { Message } from '../../../types/index'

import LikeButton from '@/views/Message/components/LikeButton.vue'
import Reply from './Reply.vue'

import { onMounted, reactive, defineComponent, toRefs } from 'vue'
import moment from 'moment'
import { ElMessage } from 'element-plus'

export default defineComponent({
	components: {
		LikeButton,
		Reply,
	},
	setup() {
		const state = reactive({
			isHotSort: true,
			commentCount: 0,
			message: [] as Array<Message>,
			dialogFormVisible: false,
			formLabelWidth: '120px',
			form: {
				content: '',
			},
		})
		const getData = async (): Promise<void> => {
			state.commentCount = await service.get(urls.getCommentCount)
			state.message = await service.post(urls.getMessage, {
				getCommentMethod: 'like_comment', // 默认以热度排序
			})
		}
		onMounted(() => {
			getData()
		})

		const handleHotSort = async (): Promise<void> => {
			if (state.isHotSort) {
				ElMessage({
					message: '已经是最热评论了哦.',
					type: 'warning',
				})
				return
			} else {
				state.message = await service.post(urls.getMessage, {
					getCommentMethod: 'like_comment', // 默认以热度排序
				})
				state.isHotSort = true
			}
		}

		const handleLatestSort = async (): Promise<void> => {
			if (!state.isHotSort) {
				ElMessage({
					message: '已经是最新评论了哦.',
					type: 'warning',
				})
			} else {
				state.message = await service.post(urls.getMessage, {
					getCommentMethod: 'create_time', // 默认以热度排序
				})
				state.isHotSort = false
			}
		}

		return {
			...toRefs(state),
			moment,
			handleHotSort,
			handleLatestSort,
		}
	},
})
</script>
<style scoped lang="less">
.message-card {
	margin: 15px 0;
}

.message-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.message-content {
	height: 50px;
	margin: 0;
	border-radius: 10px;
	-moz-border-radius: 10px;
	-webkit-border-radius: 10px;
	&::before {
		content: '';
		width: 0;
		height: 0;
		top: -10px;
		left: -10px;
		position: absolute;
		border: 10px solid;
		border-color: transparent transparent #ecf0f1 transparent;
		transform: rotate(-45deg);
	}
	&::after {
		content: '';
		width: 0;
		height: 0;
		top: -9px;
		left: -9px;
		position: absolute;
		border: 10px solid;
		border-color: transparent transparent #fff transparent;
		transform: rotate(-45deg);
	}
}

.nickname {
	padding: 10px 0;
	margin-left: 8px;
	font-size: 14px;
	font-weight: bolder;
	font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
		'微软雅黑', Arial, sans-serif;
}

.time {
	padding: 13px 0;
	margin-left: 10px;
	font-size: 13px;
	color: #999;
}

.like-comment {
	cursor: pointer;
	margin-right: 10px;
}

.relpy-func {
	float: right;
	.reply {
		margin: 0 5px;
	}
}
</style>
