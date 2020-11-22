<template>
    <el-col class="login" :sm="{span: 8, offset: 8}" :xs="{span: 16, offset: 4}">
        <el-input type="password" v-model="passCode" @keyup.enter.native="login" :disabled="disable">
            <el-button slot="append" icon="el-icon-arrow-right" @click="login"></el-button>
        </el-input>
    </el-col>
</template>

<script>
    import axios from "../utils/axios";
    import qs from "querystring";

    export default {
        data() {
            return {
                disable: true,
                passCode: ""
            }
        },
        mounted: function() {
            const self = this;

            axios.get("/try", {}, true)
                .then(function (data) {
                    if (data.code === 0)
                        self.$router.push(path + "/gallery");
                    else {
                        self.disable = false;
                    }
                }).catch(function (error) {
                    self.$notify.error({
                        message: error.message,
                    });
                });
        },
        methods: {
            login: function() {
                const self = this;
                let opts = {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    data: qs.stringify({code: this.passCode})
                };
                axios.post("/verify", opts).then(function (data) {
                    self.$router.push(path + "/gallery");
                });
            }
        }
    }
</script>

<style lang="less">
    .login {
        margin-top: 40vh;
    }
</style>