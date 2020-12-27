<template>
    <div class="list with-footer">
        <div class="head">
            <el-row class="head-line">
                <el-col :span="20">
                    <span class="title">{{name}}</span>
                </el-col>
                <el-col :span="4">
                    <span class="more">{{book}}</span>
                </el-col>
            </el-row>
            <el-row class="head-line">
                <span class="more">{{lastUpdate}}</span>
            </el-row>
        </div>
        <preview-list url="/collection/listByType" :params="{n: name}" type="collection"></preview-list>
        <bottom>
            <span @click="onDelete">Delete</span>
        </bottom>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import Bottom from "../../components/Bottom";
    import PreviewList from "../../components/PreviewList";
    import time from "../../utils/time";

    export default {
        name: "List",

        components: {Bottom, PreviewList},

        data() {
            return {
                name: "",
                book: "",
                lastUpdate: ""
            }
        },

        created: function () {
            this.name = this.$route.params.name;

            const self = this;
            axios.get("/type/" + this.name).then(function (data) {
                self.book = data.book;
                self.lastUpdate = time(data.lastUpdate);
            });
        },

        methods: {
            onDelete: function () {
                const self = this;
                this.$confirm("Delete?", {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    axios.post("/type/delete/" + this.name).then(function (data) {
                        self.$notify({
                            message: data.msg,
                            type: "success"
                        });
                        self.$router.push(path + "/type");
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style lang="less">
    .list {
        .head {
            margin-bottom: 10px;
            .head-line {
                padding: 5px 20px;

                .title {
                    font-size: large;
                    font-weight: bold;
                }
                .more {
                    float: right;
                    font-size: small;
                    line-height: 24px;
                }
            }
        }
    }
</style>
