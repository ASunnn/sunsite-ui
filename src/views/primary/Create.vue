<template>
    <div>
        <el-form ref="form" :model="form" :rules="rule" label-width="100px">
            <el-form-item label="Circle" prop="circle">
                <el-input v-model="form.circle" placeholder="circle"></el-input>
            </el-form-item>
            <el-form-item label="Collection" prop="collection">
                <el-input v-model="form.collection" placeholder="collection"></el-input>
            </el-form-item>
            <el-form-item label="Type" prop="type">
                <el-input v-model="form.type" placeholder="type"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from "../../utils/axios";

    export default {
        data() {
            return {
                form: {
                    circle: "",
                    collection: "",
                    type: ""
                },
                rule: {
                    circle: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    collection: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            submit: function() {
                const self = this;
                this.$refs.form.validate((vaild) => {
                    if (vaild) {
                        let opts = {
                            data: {
                                group : this.form.circle,
                                collection: this.form.collection,
                                type: this.form.type
                            }
                        };
                        axios.post(path + "/collection/create", opts).then(function(data) {
                            self.$notify({
                                message: data.msg,
                                type: "success"
                            });
                            self.form = {
                                circle: "",
                                collection: "",
                                type: ""
                            };
                        });
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>