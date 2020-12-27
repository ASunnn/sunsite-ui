<template>
    <div class="type">
        <template v-for="d in data">
            <el-col class="block" :lg="8" :sm="12" :xs="24">
                <div class="content" @click="click(d.type)">
                    <p class="title">{{d.type}}</p>
                    <p class="time">{{d.lastUpdate}}</p>
                </div>
            </el-col>
        </template>
    </div>
</template>

<script>
    import axios from "../../utils/axios";

    export default {
        name: "Type",

        data() {
            return {
                data: []
            }
        },

        mounted: function () {
            const self = this;
            axios.get("/type/list").then(function (data) {
                self.data = data.list;
            });
        },

        methods: {
            click: function (type) {
                this.$router.push({name:"list", params:{name: type}});
            }
        }
    }
</script>

<style lang="less">
    .type {
        .block {
            padding: 10px;

            .content {
                padding: 30px 40px;
                border-radius: 8px;
                background-color: #f4f4f5;
                cursor: pointer;
                transition: all 0.3s;
                &:hover {
                    background-color: #e9e9eb;
                }

                .title {
                    font-size: larger;
                    font-weight: bold;
                    margin: 0 0 25px;
                }
                .time {
                    color: #909399;
                    font-size: small;
                    text-align: right;
                    margin: 0;
                }
            }
        }
    }
</style>
