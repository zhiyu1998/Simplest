<template>
    <el-row class="article-container" :class="isCatalogueShow ? 'article-card-move' : ''"
        v-loading.fullscreen.lock="loading">
        <el-col :span="18">
            <div class="article-content">
                <el-card shadow="hover" class="article-card">
                    <el-row justify="center">
                        <h2>{{ articleDetail.title }}</h2>
                    </el-row>
                    <div justify="center" ref="article-detail" v-html="articleDetail.content"></div>
                </el-card>
            </div>
        </el-col>
        <div class="catalogue" v-if="isCatalogueShow">
            <scroll-to :toc="toc" v-if="toc" />
        </div>
    </el-row>
</template>
<script lang="ts">
import urls from '../../utils/urls'
import service from '../../utils/request'
import markdown from '../../utils/markdown'
import { BlogDetail } from '../../types/index'
import { onMounted, reactive, watch, defineComponent, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../../store'
import ScrollTo from './components/ScrollTo.vue'
import EventBus from '../../utils/bus'

export default defineComponent({
    name: 'Article',
    components: { ScrollTo },
    setup() {
        const state = reactive({
            toc: [],
            loading: true,
            isCatalogueShow: false,
            articleDetail: {
                id: 0,
                appreciation: false,
                commentabled: false,
                content: '',
                createTime: '',
                description: '',
                flag: '',
                published: true,
                recommend: false,
                shareStatement: true,
                title: '',
                updateTime: '',
                views: 0,
                userId: 0,
            } as BlogDetail,
            params: {
                id: 0,
            },
        })

        const route = useRoute()
        const store = useStore()

        watch(
            () => store.contentHeight,
            () => {
                // console.log(store.state.contentHeight)

                if (store.contentHeight > 600) {
                    state.isCatalogueShow = true
                } else {
                    state.isCatalogueShow = false
                }
            }
        )

        const getData = async (): Promise<void> => {
            const res: any = await service.get(urls.getBlogDetails + '?id=' + state.params.id, {
                data: state.params,
            })

            state.articleDetail = res
        }

        onMounted(() => {
            state.params.id = Number(route.query.id)

            getData().then(() => {
                // MD转换为HTML
                const article = markdown.marked(state.articleDetail.content)
                article.then((res: any) => {
                    state.articleDetail.content = res.content
                    state.toc = res.toc
                    state.loading = false // 结束加载
                })
            })
        })

        // onUnmounted(() => {
        // 	EventBus.off('tocAnchor')
        // })

        return {
            ...toRefs(state),
        }
    },
})
</script>
<style lang="less">
.article-container {
    left: 10%;
    transition: left 1200ms;

    .article-content {
        margin-top: 45%;

        .article-card {
            border-radius: 25px;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

            pre {
                font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
                    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

                margin: 10px 0;
                padding: 20px;
                box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
                    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
            }
        }
    }
}

.catalogue {
    position: absolute;
    left: 66%;
    width: 300px;
    top: 0;
}

.article-card-move {
    left: 5%;
}
</style>
