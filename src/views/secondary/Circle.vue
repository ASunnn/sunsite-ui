<template>
    <div class="circle">
        <preview-list url="/circle/list" :params="params" type="circle">
            <div class="form-content">
                <el-input class="form-item edge" v-model="form.name" placeholder="filter" @keyup.enter.native="refresh" ref="input">>
                    <el-button slot="append" type="primary" @click="refresh">Go</el-button>
                </el-input>
            </div>
        </preview-list>
    </div>
</template>

<script>
    import PreviewList from "../../components/pic/PreviewList";

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

        mounted: function () {
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
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
        .form-item {
            width: 160px;
            float: right;
            margin-left: 15px;
        }
    }
</style>
