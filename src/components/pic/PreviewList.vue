<template>
    <div class="preview-list">
        <div class="form">
            <slot>
            </slot>
        </div>
        <el-row class="list" v-loading="loading">
            <template v-for="l in list">
                <preview-item :type="type" :item="l" :draggable="draggable" :redirect="redirect" @drag-files="onDragFiles"></preview-item>
            </template>
        </el-row>
        <pager :page="page" :count="count" @page-click="getItemList"></pager>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import Pager from "../Pager";
    import PreviewItem from "./PreviewItem";
    import underscore from "underscore";

    export default {
        name: "PreviewList",

        components: {Pager, PreviewItem},

        props: ["url", "params", "type", "draggable"],

        data() {
            return {
                page: 0,
                count: 0,
                list: [],
                redirect: false,
                loading: false
            }
        },

        mounted: function () {
            this.getItemList(0);
        },

        watch: {
            params: function (val, old) {
                if (!underscore.isEqual(val, old)) {
                    // clear
                    this.list = [];
                    // get
                    this.getItemList(0);
                }
            }
        },

        methods: {
            getItemList: function (page) {
                const self = this;

                if (page === 0) this.loading = true;
                let opts = {
                    params: Object.assign({p: page}, this.params)
                };
                axios.get(this.url, opts, true).then(function (data) {
                    if (data.code === 0) {
                        let list = data.list;
                        self.redirect = list.length === 1;
                        self.list = self.list.concat(list);

                        self.page = page;
                        self.count = data.pageCount;
                    } else {
                        self.$notify({
                            message: data.msg,
                            type: "warning"
                        });
                    }
                    self.loading = false;
                }).catch(function (error) {
                    self.$notify.error({
                        message: error.message
                    });
                    self.loading = false;
                });
            },

            onDragFiles: function (files, e) {
                this.$emit("drag-files", files, e);
            }
        }
    }
</script>

<style lang="less">
    .preview-list {
        .form {
            width: 100%;
            display: none;

            .form-content {
                width: 100%;
                height: 32px;
                margin-bottom: 5px;
            }
        }

        .list {
            margin: auto;
            /* 为加载动画预留空间 */
            min-height: 200px;
        }

        @media (min-width: 768px) {
            .form {
                display: block;
                .edge {
                    padding-right: calc((100% - 700px)/2);
                }
            }
            .list {
                width: 700px;
            }
        }
        @media (min-width: 992px) {
            .form {
                .edge {
                    padding-right: calc((100% - 900px)/2);
                }
            }
            .list {
                width: 900px;
            }
        }
        @media (min-width: 1200px) {
            .form {
                .edge {
                    padding-right: calc((100% - 1050px)/2);
                }
            }
            .list {
                width: 1050px;
            }
        }
        @media (min-width: 1600px) {
            .form {
                .edge {
                    padding-right: calc((100% - 1420px)/2);
                }
            }
            .list {
                width: 1420px;
            }
        }
        @media (min-width: 1920px) {
            .form {
                .edge {
                    padding-right: calc((100% - 1560px)/2);
                }
            }
            .list {
                width: 1560px;
            }
        }
    }
</style>
