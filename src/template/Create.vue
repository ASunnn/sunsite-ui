<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="Circle">
                <el-input v-model="form.circle" placeholder="circle"></el-input>
            </el-form-item>
            <el-form-item label="Collection">
                <el-input v-model="form.collection" placeholder="collection"></el-input>
            </el-form-item>
            <el-form-item label="Type">
                <el-input v-model="form.type" placeholder="type"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                form: {
                    circle: "",
                    collection: "",
                    type: ""
                }
            }
        },

        methods: {
            submit: function() {
                const self = this;

                let data = {
                    group : this.form.circle,
                    collection: this.form.collection,
                    type: this.form.type
                };

                axios.post(path + "/collection/create", data)
                    .then(function(response) {
                        let data = response.data;

                        if (data.code === 0) {
                            self.$notify({
                                message: data.msg,
                                type: 'success'
                            });
                        } else {
                            self.$notify({
                                message: data.msg + " : " + data.detail,
                                type: "warning"
                            });
                        }
                    }).catch(function(error) {
                        self.$notify.error({
                            message: error.message,
                        });
                    });
            },
        }
    }
</script>

<style scoped>

</style>