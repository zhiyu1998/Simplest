<template>
    <el-card shadow="hover" class="message-leave">
        <div class="message">
            <el-form
                :model="params"
                status-icon
                :rules="rules"
                ref="params"
                label-width="50px"
                class="demo-ruleForm"
            >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="submit-content" label="内容" prop="content">
                            <el-input
                                type="textarea"
                                placeholder="必填"
                                v-model="params.content"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="8">
                        <el-form-item label="邮箱" prop="email">
                            <el-input
                                type="text"
                                placeholder="必填"
                                v-model="params.email"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="网站" prop="phone">
                            <el-input v-model="params.phone" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称" prop="name">
                            <el-input v-model="params.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item>
                        <el-button
                            color="#16a085"
                            type="primary"
                            :loading="btnLoading"
                            @click="submit"
                            >提交</el-button
                        >
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </el-card>
</template>
<script lang="ts">
const check = (rule: any, value: string | any, callback: Function | any): any => {
    if (!value) {
        return callback(new Error('邮箱不能为空'))
    }
}
const checkPhone = (rule: any, value: string | any, callback: Function | any): any => {
    if (!value) {
        return callback(new Error('网站地址不能为空'))
    }
}
const checkName = (rule: any, value: string | any, callback: Function | any): any => {
    if (!value) {
        return callback(new Error('昵称不能为空'))
    }
}
const checkContent = (rule: any, value: string | any, callback: Function | any) => {
    if (!value) {
        return callback(new Error('内容不能为空'))
    }
}

import { reactive, defineComponent, toRefs } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    setup() {
        const state = reactive({
            btnLoading: false,
            cacheTime: 0, // 缓存时间
            times: 0, // 留言次数
            params: {
                email: '',
                phone: '',
                name: '',
                content: '',
            },
            rules: {
                email: [{ validator: check, trigger: 'blur' }],
                phone: [{ validator: checkPhone, trigger: 'blur' }],
                name: [{ validator: checkName, trigger: 'blur' }],
                content: [{ validator: checkContent, trigger: 'blur' }],
            },
        })

        const submit = async () => {
            if (state.times > 3) {
                ElMessage({
                    message: '您今天留言的次数已经用完，明天再来留言吧！',
                    type: 'warning',
                })
                return
            }
            let now = new Date()
            let nowTime = now.getTime()
            if (nowTime - state.cacheTime < 60000) {
                ElMessage({
                    message: '您留言太过频繁，1 分钟后再来留言吧！',
                    type: 'warning',
                })
                return
            }
            const reg = new RegExp(
                '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
            )
            if (!state.params.email) {
                ElMessage({
                    message: '邮箱不能为空！',
                    type: 'warning',
                })
                return
            } else if (!reg.test(state.params.email)) {
                ElMessage({
                    message: '请输入格式正确的邮箱！',
                    type: 'warning',
                })
                return
            } else if (!state.params.phone) {
                ElMessage({
                    message: '手机不能为空',
                    type: 'warning',
                })
                return
            } else if (!state.params.name) {
                ElMessage({
                    message: '昵称不能为空',
                    type: 'warning',
                })
                return
            } else if (!state.params.content) {
                ElMessage({
                    message: '内容不能为空',
                    type: 'warning',
                })
                return
            }
            state.btnLoading = true
            // await service.post(urls.addMessage, state.params)
            state.btnLoading = false
            state.times++
            state.cacheTime = nowTime
            ElMessage({
                message: '感谢您的留言，有必要的，博主有空都会回复您的 ！',
                type: 'success',
            })
            state.params.content = ''
        }
        return {
            ...toRefs(state),
            submit,
        }
    },
})
</script>
<style lang="less">
.submit-content {
    height: 100%;
}
.message-leave {
    animation: fadeInDown 0.9s;
    opacity: 0.8;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    margin-bottom: 40px;
}
.message-card {
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
}
</style>
