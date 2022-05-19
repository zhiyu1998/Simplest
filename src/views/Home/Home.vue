<template>
    <div>
        <el-row justify="center" align="bottom">
            <div class="slide2list">
                <span @click="slideArticle" href="#" class="slide-item">
                    <el-icon color="#FFF">
                        <ArrowDownBold />
                    </el-icon>
                    <el-icon color="#FFF">
                        <ArrowDownBold />
                    </el-icon>
                </span>
            </div>
        </el-row>
        <el-row justify="center">
            <el-col :span="18" class="article-list">
                <div class="home-content" ref="homeContent">
                    <el-card class="home-card" shadow="hover">
                        <ArticleItem />
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import ArticleItem from '@/views/Home/components/ArticleItem.vue'

import { ArrowDownBold } from '@element-plus/icons-vue'

import { defineComponent, ref } from 'vue'
import EventBus from '../../utils/bus'

export default defineComponent({
    name: 'Index',
    components: {
        ArticleItem,
        ArrowDownBold
    },
    setup() {

        const homeContent = ref()

        const slideArticle = () => {
            // console.log(homeContent.value);
            EventBus.emit('scrollTo', homeContent.value.offsetHeight)
        }

        return { ArrowDownBold, slideArticle, homeContent }
    },
})
</script>

<style scoped lang="less">
.slide2list {
    margin: 43% 0 5% 0;
    animation: fadeInDown 1.5s;
    animation-iteration-count: infinite;


    .slide-item {
        cursor: pointer;
        display: flex;
        flex-direction: column-reverse;
    }
}

.home-content {
    margin: 0 0 20px 0;

    .home-card {
        animation: fadeInUp 0.5s;
        padding-top: 50px;
        border-radius: 25px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    }
}

.collapse-button {
    z-index: 999;
    position: absolute;
    top: -40px;
    left: 10px;
}
</style>
