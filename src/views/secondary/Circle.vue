<template>
    <div class="circle">
        <div class="form">
            <el-input style="width: 160px" v-model="form.name" placeholder="filter" @keyup.enter.native="refresh" autofocus="true">
                <el-button slot="append" type="primary" @click="refresh">Go</el-button>
            </el-input>
        </div>
        <preview-list url="/circle/list" :params="params" type="circle"></preview-list>
    </div>
</template>

<script>
    import PreviewList from "../../components/PreviewList";

    export default {
        name: "Circle",

        components: {PreviewList},

        data() {
            return {
                form: {
                    name: ""
                },
                params: {}
            }
        },

        methods: {
            refresh: function () {
                let params = {};
                if (this.form.name) {
                    params.q = this.form.name;
                }
                this.params = params;
            }
        }
    }
</script>

<style lang="less">
    .circle {
        .form {
            margin-bottom: 5px;
        }
    }
</style>
