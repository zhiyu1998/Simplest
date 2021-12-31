<template>
	<div>
		<el-row justify="center">
			<el-col :span="18">
				<div class="tags-content">
					<el-card shadow="hover" class="tags-card">
						<h2 style="margin-bottom: 20px">共有 {{ state.tagCount }} 标签</h2>
						<el-card
							class="letter-card"
							v-for="(item, name) in state.tagList"
							:key="name"
						>
							<el-row>
								<h2>{{ name }}</h2>
							</el-row>
							<el-row>
								<span class="tag-list">
									<el-tag
										class="tag"
										v-for="tag in item"
										:key="tag.id"
										effect="plain"
									>
										<i
											:class="'iconfont blog-' + tag.name.toLowerCase() || ''"
										></i>
										{{ tag.name }}
									</el-tag>
								</span>
							</el-row>
						</el-card>
					</el-card>
				</div>
			</el-col>
		</el-row>
		<Typed class="typed" :options="options">
			<h1 class="typing"></h1>
		</Typed>
	</div>
</template>
<script lang="ts">
import urls from '../../utils/urls'
import service from '../../utils/request'
import { TagList } from '../../types/index'
import { reactive, defineComponent } from 'vue'

import { Typed } from '../../components/typed'
import type { TypedOptions } from '../../components/typed'
export default defineComponent({
	components: {
		Typed,
	},
	setup() {
		const state = reactive({
			tagCount: 0,
			tagList: {} as TagList,
		})

		const getData = async (): Promise<void> => {
			state.tagCount = await service.get(urls.getTagCount)
			state.tagList = await service.get(urls.getTagList)
		}

		getData()

		const options: TypedOptions = {
			strings: ['Tag'],
			loop: false,
			typeSpeed: 300,
			cursorChar: '_',
		}

		return {
			state,
			getData,
			options,
		}
	},
})
</script>
<style lang="less">
.tags-content {
	margin: 35% 0 40px 0;
	.tags-card {
		border-radius: 25px;
		box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

		.letter-card {
			margin-bottom: 20px;

			.tag-list {
				float: right;
				margin-top: 8px;
				.tag {
					margin-right: 5px;
					box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
						rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
				}
			}
		}
	}
}
</style>
