<template>
    <div class="gallery">
        <div class="form">
            <el-select class="form-item" style="width: 160px" v-model="form.orientation" @change="refresh" placeholder="Orientation" clearable>
                <el-option label="Landscape" value="landscape"></el-option>
                <el-option label="Portrait" value="portrait"></el-option>
            </el-select>
            <el-select style="width: 160px" v-model="form.type" @change="refresh" placeholder="Type" clearable>
                <template v-for="t in typeList">
                    <el-option :label="t.type" :value="t.type"></el-option>
                </template>
            </el-select>
        </div>
        <pic-list url="/gallery/list" :params="params"></pic-list>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import PicList from "../../components/PicList";

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

        mounted: function () {
            const self = this;
            axios.get("/type/list").then(function (data) {
                self.typeList = data.list;
            });
        },

        methods: {
            refresh: function () {
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
        .form {
            margin-bottom: 5px;
            .form-item {
                margin-right: 15px;
            }
        }
    }
</style>
