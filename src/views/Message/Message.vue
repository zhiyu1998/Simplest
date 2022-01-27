<template>
    <div>
        <el-row justify="center">
            <el-col :span="18">
                <div class="message-content">
                    <leave-message />
                    <message-list />
                </div>
            </el-col>
        </el-row>
        <Typed class="typed" :options="options">
            <h1 class="typing"></h1>
        </Typed>
    </div>
</template>
<script lang="ts">
import MessageList from './components/MessageList.vue'
import LeaveMessage from './components/LeaveMessage.vue'
import { defineComponent } from 'vue'

import { Typed } from '../../components/typed'
import type { TypedOptions } from '../../components/typed'

export default defineComponent({
    components: {
        MessageList,
        LeaveMessage,
        Typed,
    },
    setup() {
        const options: TypedOptions = {
            strings: ['Message'],
            loop: false,
            typeSpeed: 300,
            cursorChar: '_',
        }
        return { options }
    },
})
</script>
<style scoped lang="less">
.message-content {
    margin: 35% 0 40px 0;
}
</style>
