<template>
    <div class="pic-list">
        <el-row class="list">
            <template v-for="p in list">
                <pic-item :seq="p.sequence" :src="src(p.sequence)" :alt="alt(p)" :title="title(p)"></pic-item>
            </template>
        </el-row>
        <pager :page="page" :count="count" @page-click="getPictureList"></pager>
    </div>
</template>

<script>
    import axios from "../utils/axios";
    import Pager from "./Pager";
    import PicItem from "./PicItem";
    import urls from "../utils/urls";

    export default {
        name: "PicList",

        components: {Pager, PicItem},

        props: ["url", "params"],

        data() {
            return {
                page: 0,
                count: 0,
                list: []
            }
        },

        mounted: function () {
            this.getPictureList(0);
        },

        watch: {
            params: function () {
                // clear
                this.list = [];
                // get
                this.getPictureList(0);
            }
        },

        methods: {
            getPictureList: function (page) {
                const self = this;

                let opts = {
                    params: Object.assign({p: page}, this.params)
                };
                axios.get(this.url, opts).then(function (data) {
                    let pictureList = data.pictureList;
                    self.list = self.list.concat(pictureList);

                    self.page = page;
                    self.count = data.pageCount;
                });
            },

            src: function (seq) {
                return urls("/m/" + seq);
            },
            alt: function (p) {
                return p.name + " / " + p.collection + " / " + p.group;
            },
            title: function (p) {
                return p.name + " / " + p.collection + " / " + p.group;
            }
        }
    }
</script>

<style lang="less">
    .pic-list {
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
