<template>
    <div>
        <div>

        </div>
        <pager></pager>
    </div>
</template>

<script>
    import Pager from "./Pager";

    export default {
        name: "PicList",

        components: {Pager},

        props: ["data"]
    }
</script>

<style scoped>

</style>