<template>
    <div>
        <div class="blog-content">
            <div v-for="(displayInfo, index) in displayBlogArr" :key="index" class="blog-items">
                <el-row class="grid-content">
                    <el-col :span="24">
                        <el-card
                            :body-style="{
                                padding: '20px',
                                height: '240px',
                                borderRadius: '15px',
                            }"
                            shadow="hover"
                            class="blog-card"
                        >
                            <div>
                                <el-image
                                    :src="displayInfo.picture"
                                    fit="cover"
                                    class="blog-img"
                                ></el-image>
                            </div>
                            <div>
                                <el-row>
                                    <!-- 标题 -->
                                    <div
                                        class="blog-desc-box"
                                        @click="handleEnterDetail(displayInfo.id)"
                                    >
                                        <h3 class="blog-title">{{ displayInfo.title }}</h3>
                                        <p class="blog-desc">
                                            {{ displayInfo.description }}
                                        </p>
                                    </div>
                                </el-row>
                                <el-row class="foot-message">
                                    <!-- 标签 -->
                                    <span class="tag-list">
                                        <el-tag
                                            class="tag"
                                            v-for="tag in displayInfo.tags"
                                            :key="tag.id"
                                            effect="plain"
                                            ><i
                                                :class="
                                                    'iconfont blog-' + tag.name.toLowerCase() || ''
                                                "
                                            ></i>
                                            {{ tag.name }}
                                        </el-tag>
                                    </span>
                                    <!-- 更新时间 -->
                                    <time class="time">{{ displayInfo.updateTime }}</time>
                                    <!-- 观看数量 -->
                                    <span class="views">
                                        <i class="iconfont blog-view"></i>
                                        {{ displayInfo.views }}
                                    </span>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="footer">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :page-count="totalPages"
                :total="totalSize"
                v-model:current-page="params.pageIndex"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, reactive, defineComponent, toRefs } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router'
import urls from '../../../utils/urls'
import service from '../../../utils/request'
import { DisplayInfo } from '../../../types/index'
import Article from '@/views/Article/Article.vue'

export default defineComponent({
    name: 'ArticleItem',
    components: {
        Article,
    },
    setup() {
        const state = reactive({
            totalPages: 0,
            totalSize: 0,
            displayBlogArr: [] as Array<DisplayInfo>,
            params: {
                pageIndex: 1, // 当前页数
                pageSize: 6, // 每页的数量【暂时设计为固定值】
            },
        })

        const router = useRouter()

        const getData = async (): Promise<void> => {
            const res: any = await service.post(urls.getBlogInfoPage, {
                data: state.params,
            })

            state.displayBlogArr.length = 0
            // 如果不使用index，可以实现无缝分页的效果
            res.records.map((blog: any) => {
                const displayInfo: DisplayInfo = reactive({
                    id: 0,
                    title: '',
                    picture: '',
                    updateTime: '',
                    description: '',
                    tags: [],
                    views: 0,
                })
                displayInfo.id = blog.id
                displayInfo.title = blog.title
                displayInfo.picture = blog.picture
                displayInfo.updateTime = blog.updateTime
                displayInfo.description = blog.description
                displayInfo.views = blog.views
                displayInfo.tags = blog.tags
                displayInfo.updateTime = moment(displayInfo.updateTime).format('YYYY-MM-DD h:mm:ss')
                state.displayBlogArr.push(displayInfo)
            })
            state.params.pageIndex = res.current
            state.params.pageSize = res.size
            state.totalPages = res.pages
            state.totalSize = res.total
        }

        onMounted(() => {
            getData()
        })

        const handleCurrentChange = () => {
            getData()
        }

        const handleEnterDetail = (id: number) => {
            router.push({ path: `/blog`, query: { id } })
        }

        return {
            ...toRefs(state),
            handleCurrentChange,
            handleEnterDetail,
        }
    },
})
</script>

<style scoped lang="less">
.blog-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    .blog-items {
        width: 50%;
    }
}

.grid-content {
    margin-bottom: 20px;
    padding: 0 20px 0 20px;
    .blog-content {
        width: 50%;
    }
}

.blog-card {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    animation: slideInUp 0.6s;
}

.blog-img {
    border-radius: 5px;
    width: 100%;
    height: 120px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
    &:hover {
        animation: pulse 2s;
    }
}

.blog-desc-box {
    padding: 10px 0 10px 10px;
    cursor: pointer;
    .blog-desc {
        color: #95a5a6;
        font-weight: thin;
        font-size: 13px;
        letter-spacing: 3px;
        margin-top: 5px;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .blog-title {
        color: #34495e;
    }
}

.foot-message {
    display: flex;
    justify-content: center;
    align-items: center;
    .views {
        font-size: 13px;
        color: #999;
        font-weight: thin;
        flex-grow: 1;
    }

    .tag-list {
        padding: 10px;
        flex-grow: 1;
        .tag {
            margin-left: 10px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        }
    }

    .time {
        font-size: 13px;
        color: #999;
        flex-grow: 1;
    }
}
</style>
