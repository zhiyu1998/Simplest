<template>
	<div>
		<el-row class="friends-container" justify="center" :gutter="24">
			<el-col :span="18" :offset="0">
				<el-card style="border-radius: 20px; animation: fadeInDown 0.9s" shadow="hover">
					<div class="friends-content">
						<div class="friend" v-for="i in 20" :key="i">
							<el-row :gutter="16" justify="center">
								<el-col :span="5" class="friend-av"
									><el-avatar src="comment_flag.png" fit="fill"></el-avatar
								></el-col>
								<el-col :span="11" class="friend-desc">
									<h3>测试 {{ i }}</h3>
									<p style="color: #95a5a6">测试标语 {{ i }}</p>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-card></el-col
			>
		</el-row>
		<Typed class="typed" :options="options"> <h1 class="typing"></h1></Typed>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Typed } from '../../components/typed'
import type { TypedOptions } from '../../components/typed'
export default defineComponent({
	components: {
		Typed,
	},
	setup() {
		const options: TypedOptions = {
			strings: ['Friends'],
			loop: false,
			typeSpeed: 300,
			cursorChar: '_',
		}
		return {
			options,
		}
	},
})
</script>
<style scoped lang="less">
.friends-container {
	margin-top: 33%;
	.friends-content {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		.friend {
			width: 200px;
			height: 100px;
			border: 1px none #000;
			border-radius: 20px;
			animation: slideInUp 1.3s;
			&:hover {
				background-color: #8395a7;
				box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
			}
			.friend-av {
				margin-top: 30px;
			}
			.friend-desc {
				margin-top: 30px;
				white-space: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}
	}
}
</style>
