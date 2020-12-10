<template>
    <div>
        <preview-list url="/collection/list" type="collection"></preview-list>
    </div>
</template>

<script>
    import PreviewList from "../../components/PreviewList";

    export default {
        name: "Collection",

        components: {PreviewList}
    }
</script>

<style scoped>

</style>