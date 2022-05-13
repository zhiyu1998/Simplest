<template>
  <div>
    <el-card class="box-card">
      <template #header> 博客信息</template>
      <div class="blog-message">
        <el-row :gutter="24">
          <el-col :span="12" class="blog-msg-item">
            <span>文章</span>
            <span>{{ blogCount }}</span>
          </el-col>
          <el-col :span="12" class="blog-msg-item">
            <span>标签</span>
            <span>{{ tagCount }}</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <div :class="moonMode ? 'btn-dark' : 'btn'">加入书签</div>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import {onMounted, reactive, defineComponent, toRefs, computed} from 'vue'
import urls from '../../../utils/urls'
import service from '../../../utils/request'
import {useStore} from "../../../store"

export default defineComponent({
  name: 'BlogMessage',
  setup() {
    const store = useStore()

    const state = reactive({
      blogCount: 0,
      tagCount: 0,
    })
    const getData = async (): Promise<void> => {
      state.blogCount = await service.get(urls.getBlogCount)
      state.tagCount = await service.get(urls.getTagCount)
    }

    const moonMode = computed(() => store.globalDark)

    onMounted(() => {
      getData()
    })

    return {
      ...toRefs(state),
      getData,
      moonMode,
    }
  },
})
</script>

<style scoped lang="less">
.box-card {
  animation: slideInRight 0.5s;
}

.avatar {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}

.name {
  margin: 20px auto;
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
}

.blog-message {
  padding: 10px;
  letter-spacing: 10px;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
}

.add-book {
  width: 100%;
  margin: 20px;
}

.my-icon {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-left: 20%;
}

.path {
  stroke-dasharray: 100;
}

.blog-msg-item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
}

@keyframes rotate {
  100% {
    transform: translate(-50%, -50%) rotate(1turn);
  }
}

.btn {
  --color: #0ebeff;

  position: relative;
  z-index: 0;
  width: 160px;
  height: 80px;
  line-height: 80px;
  color: var(--color);
  font-size: 24px;
  border-radius: 10px;
  text-align: center;
  margin: auto;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  -webkit-box-reflect: below 10px linear-gradient(transparent, rgba(0, 0, 0, 0.4));

  &:hover {
    color: #000;
    box-shadow: 0 0 5px var(--color), 0 0 25px var(--color);

    &::after,
    &::before {
      transition: 0.3s;
      background: var(--color);
    }
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 300%;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: 0 0;
    background-image: conic-gradient(var(--color), var(--color));
    animation: rotate 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 2px;
    top: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: #fff;
    border-radius: 10px;
  }
}

.btn-dark {
  --color: #0ebeff;

  position: relative;
  z-index: 0;
  width: 160px;
  height: 80px;
  line-height: 80px;
  color: var(--color);
  font-size: 24px;
  border-radius: 10px;
  text-align: center;
  margin: auto;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  -webkit-box-reflect: below 10px linear-gradient(transparent, rgba(0, 0, 0, 0.4));

  &:hover {
    color: #000;
    box-shadow: 0 0 5px var(--color), 0 0 25px var(--color);

    &::after,
    &::before {
      transition: 0.3s;
      background: var(--color);
    }
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 300%;
    background-color: #2d3436;
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: 0 0;
    background-image: conic-gradient(var(--color), var(--color));
    animation: rotate 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 2px;
    top: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: #2d3436;
    border-radius: 10px;
  }
}
</style>
