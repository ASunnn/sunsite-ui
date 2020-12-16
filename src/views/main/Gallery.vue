<template>
    <div class="gallery">
        <pic-list url="/gallery/list"></pic-list>
    </div>
</template>

<script>
    import PicList from "../../components/PicList";

    export default {
        name: "Gallery",

        components: {PicList}
    }
</script>

<style lang="less">

</style>
