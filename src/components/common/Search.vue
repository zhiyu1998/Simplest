<template>
	<div class="search">
		<el-autocomplete
			v-model="state"
			:fetch-suggestions="querySearch"
			:trigger-on-focus="false"
			class="inline-input"
			placeholder="Please Seach Blog"
			@select="handleSelect"
			clearable
		/>
	</div>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { SearchValue } from '../../types/index'
export default defineComponent({
	name: 'Search',
	components: {
		Search,
	},
	setup() {
		const restaurants = ref([] as Array<SearchValue>)
		const querySearch = (queryString: string, cb: Function) => {
			const results = queryString
				? restaurants.value.filter(createFilter(queryString))
				: restaurants.value
			// call callback function to return suggestions
			cb(results)
		}

		const createFilter = (queryString: string) => {
			return (restaurant: any) => {
				return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
			}
		}

		const handleSelect = (item: any) => {
			console.log(item)
		}

		const loadAll = () => {
			return [
				{ value: 'vue', link: 'https://github.com/vuejs/vue' },
				{ value: 'element', link: 'https://github.com/ElemeFE/element' },
				{ value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
				{ value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
				{ value: 'vuex', link: 'https://github.com/vuejs/vuex' },
				{ value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
				{ value: 'babel', link: 'https://github.com/babel/babel' },
			]
		}

		onMounted(() => {
			restaurants.value = loadAll()
		})

		return {
			handleSelect,
			querySearch,
			state: ref(''),
		}
	},
})
</script>
<style scoped lang="less">
.search {
	.inline-input {
		box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
		margin-right: 10px;
	}
	.search-btn {
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	}
}
</style>
