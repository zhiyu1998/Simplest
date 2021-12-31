<template>
	<div>
		<el-row class="reply-all" v-if="replyComments != null">
			<div style="border-radius: 35px" v-for="reply in replyComments" :key="reply.id">
				<el-row :gutter="24">
					<el-col :span="1">
						<el-avatar
							v-if="reply.adminComment == false"
							:size="35"
							src="anonymity-reply.png"
						></el-avatar>
						<el-avatar v-else :size="35" src="anonymity-reply.png"></el-avatar>
					</el-col>
					<el-col :span="14">
						<el-row>
							<span class="reply-nickname">
								{{ reply.nickname }}
							</span>
							<span class="time">
								{{ moment(reply.createTime).format('YYYY-MM-DD h:mm:ss') }}
							</span>
						</el-row>
						<el-row
							><el-card class="reply-content" shadow="hover">
								回复
								<span style="color: #2980b9">@{{ parentName }}</span>
								：
								<span>{{ reply.content }}</span>
							</el-card></el-row
						>
					</el-col>
				</el-row>
			</div>
		</el-row>
		<div v-if="state.recLength > state.displayReplyCommentsCount" @click="handleMoreReply">
			<span style="font-size: 13px; font-weight: thin">共有{{ state.recLength }}条回复，</span
			><span style="color: #2980b9; cursor: pointer">点击查看</span>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import moment from 'moment'
import type { Message } from '../../../types'

export default defineComponent({
	props: {
		replyComments: {
			type: Array,
			default: [],
		},
		parentName: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const state = reactive({
			recLength: props.replyComments.length,
			parentName: props.parentName,
			displayReplyCommentsCount: 2,
		})

		const replyComments =
			state.recLength > state.displayReplyCommentsCount
				? ref(props.replyComments.slice(state.displayReplyCommentsCount) as Array<Message>)
				: ref(props.replyComments as Array<Message>)

		const handleMoreReply = () => {
			replyComments.value = [...(props.replyComments as Array<Message>)]
			state.displayReplyCommentsCount = replyComments.value.length
		}

		return {
			state,
			replyComments,
			moment,
			handleMoreReply,
		}
	},
})
</script>
<style lang="less">
.reply-all {
	display: flex;
	flex-direction: column;
	margin-left: 50px;
	.reply-content {
		height: 50px;
		font-size: 14px;
		margin: 0px;
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
	.reply-nickname {
		padding: 10px 0;
		font-size: 14px;
		font-weight: bolder;
		font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
			'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
	}

	.time {
		padding: 13px 0;
		margin-left: 10px;
		font-size: 13px;
		color: #999;
	}
}
</style>
