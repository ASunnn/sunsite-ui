<template>
    <div class="preview-list">
        <el-row class="list">
            <template v-for="l in list">
                <preview-item :type="type" :item="l"></preview-item>
            </template>
        </el-row>
        <pager :page="page" :count="count" @page-click="getItemList"></pager>
    </div>
</template>

<script>
    import axios from "../utils/axios";
    import Pager from "./Pager";
    import PreviewItem from "./PreviewItem";

    export default {
        name: "PreviewList",

        components: {Pager, PreviewItem},

        props: ["url", "params", "type"],

        data() {
            return {
                page: 0,
                count: 0,
                list: []
            }
        },

        mounted: function () {
            this.getItemList(0);
        },

        methods: {
            getItemList: function (page) {
                const self = this;

                let opts = {
                    params: Object.assign({p: page}, this.params)
                };
                axios.get(this.url, opts).then(function (data) {
                    let list = data.list;
                    self.list = self.list.concat(list);

                    self.page = page;
                    self.count = data.pageCount;
                });
            }
        }
    }
</script>

<style lang="less">
    .preview-list {
        .list {
            margin: auto;
        }

        @media (min-width: 768px) {
            .list {
                width: 700px;
            }
        }
        @media (min-width: 992px) {
            .list {
                width: 900px;
            }
        }
        @media (min-width: 1200px) {
            .list {
                width: 1080px;
            }
        }
        @media (min-width: 1600px) {
            .list {
                width: 1420px;
            }
        }
        @media (min-width: 1920px) {
            .list {
                width: 1560px;
            }
        }
    }
</style>
