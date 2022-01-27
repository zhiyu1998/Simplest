<template>
    <div class="home">
        <Navigator />
        <Header />
        <div class="content-box" :class="collapse ? 'content-box-leave' : 'content-box-enter'">
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
            <el-backtop
                target=".content-box .el-scrollbar__wrap"
                :bottom="100"
                :visibility-height="290"
            ></el-backtop>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { useStore } from '../store'

import Navigator from '@/components/common/Navigator.vue'
import Header from '@/components/common/Header.vue'
import EventBus from '../utils/bus'

import _ from 'lodash'

export default defineComponent({
    name: 'Home',
    components: {
        Navigator,
        Header,
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

<style scoped lang="less">
.content-box {
    position: absolute;
    right: 0;
    bottom: 0;
    top: 70px;
}

.content {
    width: 100%;
    padding: 10px;
    overflow-y: hidden; /* 引入element-ui的滚轮后开启隐藏  */
    overflow-x: hidden;
    box-sizing: border-box;
}
.content-box-enter {
    transition: left 500ms;
    left: 150px;
}
.content-box-leave {
    transition: left 500ms;
    left: 50px;
}
</style>
