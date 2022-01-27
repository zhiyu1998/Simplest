<template>
    <div>
        <el-row justify="center">
            <el-col :span="18">
                <div class="archive-content">
                    <el-card shadow="hover" class="archive-card">
                        <h2 style="margin-bottom: 20px">共计 {{ blogCount }} 篇</h2>

                        <el-timeline>
                            <el-timeline-item
                                v-for="(item, index) in displayArchives"
                                :key="item.id"
                                center
                                :timestamp="item.createTime"
                                placement="top"
                            >
                                <!-- 优化逐个卡片加入的载入动画 -->
                                <el-card :style="{ animation: 'fadeInRight 1' + index + '00ms' }">
                                    <el-row :gutter="24">
                                        <el-col
                                            :span="18"
                                            style="cursor: pointer"
                                            @click="handleEnterDetail(item.id)"
                                        >
                                            <h3 class="archive-title">{{ item.title }}</h3>
                                            <p class="archive-desc">{{ item.description }}</p>
                                        </el-col>
                                        <el-col :span="6">
                                            <!-- 标签 -->
                                            <span class="tag-list">
                                                <el-tag
                                                    class="tag"
                                                    v-for="tag in item.tags"
                                                    :key="tag.id"
                                                    effect="plain"
                                                >
                                                    <i
                                                        :class="
                                                            'iconfont blog-' +
                                                                tag.name.toLowerCase() || ''
                                                        "
                                                    ></i>
                                                    {{ tag.name }}
                                                </el-tag>
                                            </span>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                        <el-pagination
                            class="archive-pagination"
                            layout="prev, pager, next"
                            :page-count="totalPages"
                            :total="totalSize"
                        ></el-pagination>
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
import { DisplayArch } from '../../types/index'

import { reactive, defineComponent, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

import { Typed } from '../../components/typed'
import type { TypedOptions } from '../../components/typed'

export default defineComponent({
    components: { Typed },
    setup() {
        const state = reactive({
            blogCount: 0,
            displayArchives: [] as Array<DisplayArch>,
            totalPages: 5,
            totalSize: 1,
            params: {
                pageIndex: 1, // 当前页数
                pageSize: 10, // 每页的数量【暂时设计为固定值】
            },
        })

        const router = useRouter()

        const getData = async (): Promise<void> => {
            const res: any = await service.get(urls.getArchive, {
                data: state.params,
            })
            state.blogCount = await service.get(urls.getBlogCount)

            res.records.map((blog: any) => {
                const displayArch: DisplayArch = reactive({
                    id: 0,
                    title: '',
                    createTime: '',
                    description: '',
                    tags: [],
                    recommend: 0,
                })

                displayArch.id = blog.id
                displayArch.title = blog.title
                displayArch.recommend = blog.picture
                displayArch.description = blog.description
                displayArch.tags = blog.tags
                displayArch.createTime = moment(blog.createTime).format('YYYY-MM-DD')
                state.displayArchives.push(displayArch)
            })
            state.params.pageIndex = res.current
            state.params.pageSize = res.size
            state.totalPages = res.pages
            state.totalSize = res.total
        }

        getData()

        const options: TypedOptions = {
            strings: ['Archive'],
            loop: false,
            typeSpeed: 300,
            cursorChar: '_',
        }

        const handleEnterDetail = (id: number) => {
            router.push({ path: `/blog`, query: { id } })
        }

        return {
            ...toRefs(state),
            options,
            handleEnterDetail,
        }
    },
})
</script>
<style scoped lang="less">
.archive-content {
    margin: 35% 0 20px 0;
    .archive-card {
        animation: fadeInDown 1s;
        border-radius: 25px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        .archive-title {
            margin-bottom: 5px;
            font-weight: bold;
        }
        .archive-desc {
            font-weight: thin;
            color: #34495e;
        }
        .tag-list {
            float: right;
            .tag {
                margin-right: 5px;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
            }
        }
    }
    .archive-pagination {
        margin-left: 40%;
    }
}
</style>
