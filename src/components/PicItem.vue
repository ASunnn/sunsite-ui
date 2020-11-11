<template>
    <div :md="3" :sm="4" :xs="6">
        <el-image :src="src"></el-image>
    </div>
</template>

<script>
    export default {
        name: "PicItem",

        props: ["src"]
    }
</script>

<style scoped>

</style>