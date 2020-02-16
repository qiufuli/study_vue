<template>
    <div class="base_content_public_tit">
        <span class="base-icon_parent">
        <i class="iconfont base-content-icon" ref="div"></i>
        </span>
        <span class="base_weight">{{level2}}</span>
    </div>
</template>

<script>
export default {
    name: 'my-bread',
    data() {
        return {
          css: ''
        }
    },
    props: ['level1', 'level2'],
    methods:{
        cx(){
            let div = this.$refs.div
            let className = this.level1
            // 通过空格将原有类名字符串组装成数组
            let newClass = div.className.split(' ')
            newClass.push(className)
            // 添加完毕后 通过空格将数组组装为字符串
            div.className = newClass.join(' ')
        }
    },
    created(){
        this.$nextTick(_ => {
            this.cx()
        })
    }
}
</script>

<style>

</style>
