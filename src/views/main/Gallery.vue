<template>
    <div class="gallery">
        <pic-list url="/gallery/list" :params="params">
            <div class="form-content">
                <el-select class="form-item edge" v-model="form.orientation" @change="refresh" placeholder="Orientation" clearable>
                    <el-option label="Landscape" value="landscape"></el-option>
                    <el-option label="Portrait" value="portrait"></el-option>
                </el-select>
                <el-select class="form-item" v-model="form.type" @change="refresh" placeholder="Type" clearable>
                    <template v-for="t in typeList">
                        <el-option :label="t.type" :value="t.type"></el-option>
                    </template>
                </el-select>
            </div>
        </pic-list>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import PicList from "../../components/pic/PicList";

    export default {
        name: "Gallery",

        components: {PicList},

        data() {
            return {
                form: {
                    orientation: "",
                    type: ""
                },
                params: {},
                typeList: [],
            }
        },

        beforeMount: function () {
            let formStorage = localStorage.getItem("filter");
            if (formStorage) {
                this.form = JSON.parse(formStorage);
                this.params = {
                    o: this.form.orientation,
                    t: this.form.type
                };
            }
        },

        mounted: function () {
            const self = this;
            axios.get("/type/list").then(function (data) {
                self.typeList = data.list;
            });
        },

        methods: {
            refresh: function () {
                localStorage.setItem("filter", JSON.stringify(this.form));
                this.params = {
                    o: this.form.orientation,
                    t: this.form.type
                };
            }
        }
    }
</script>

<style lang="less">
    .gallery {
        .form-item {
            width: 160px;
            float: right;
            margin-left: 15px;
        }
    }
</style>
