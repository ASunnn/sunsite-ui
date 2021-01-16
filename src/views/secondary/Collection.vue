<template>
    <div class="collection">
        <preview-list url="/collection/list" type="collection"></preview-list>
    </div>
</template>

<script>
    import PreviewList from "../../components/pic/PreviewList";

    export default {
        name: "Collection",

        components: {PreviewList}
    }
</script>

<style>

</style>
