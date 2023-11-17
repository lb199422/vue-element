<!--
 * @Descripttion: 
 * @version: 
 * @Author: zhengxuejiong@gz-yibo.com
 * @Date: 2022-04-07 10:56:29
 * @LastEditors: zhengxuejiong@gz-yibo.com
 * @LastEditTime: 2022-04-07 10:56:30
-->
<!--
 * @Description: 代码功能内容描述（需求）
 * @Author: zhouxiwen@gz-yibo.com
 * @Date: 2022-03-16 17:31:36
 * @LastEditTime: 2022-03-17 11:03:59
 * @LastEditors: zhouxiwen@gz-yibo.com
 * @remarks: 备注
-->
<template>
    <div class="title-wrapper">
        <span class="title">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>
<style lang="scss" scoped>
.title-wrapper {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
        font-size: 14px;
        // color: #515a56;
    }
    padding: 0 8px;
    border-bottom: 1px solid #eeeeee;
}
</style>
