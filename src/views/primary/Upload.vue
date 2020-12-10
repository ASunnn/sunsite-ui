<template>
    <div class="upload">
        <el-form ref="form" :model="form" :rules="rule" label-width="100px">
            <el-form-item label="Illustrator" prop="illustrator">
                <el-input v-model="form.illustrator" placeholder="illustrator"></el-input>
            </el-form-item>
            <el-form-item label="Circle" prop="circle">
                <el-input v-model="form.circle" placeholder="circle"></el-input>
            </el-form-item>
            <el-form-item label="Collection" prop="collection">
                <el-input v-model="form.collection" placeholder="collection"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="upload">Submit</el-button>
            </el-form-item>
        </el-form>
        <el-col>
            <el-upload :auto-upload="false" :on-change="refreshFiles" action="/index" drag multiple>
                <div class="upload-tip">将图片拖到此处，或点击上传</div>
            </el-upload>
        </el-col>

        <el-dialog
                :visible.sync="uploading"
                width="30%"
                top="10vh"
                :show-close="false"
                :close-on-press-escape="false">
            <el-progress :text-inside="true" :stroke-width="20" :percentage="progress" color="#909399"></el-progress>
            <el-divider class="dialog_divider"></el-divider>
            <span slot="footer" class="dialog-footer">
                <el-button class="dialog_button" v-show="!isComplete" @click="cancelUpload">Cancel</el-button>
                <el-button class="dialog_button" v-show="isComplete" type="primary" @click="completeUpload">OK</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import Axios from "axios";

    export default {
        data() {
            return {
                form: {
                    illustrator: "",
                    circle: "",
                    collection: ""
                },
                rule: {
                    circle: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    collection: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ]
                },
                files: [],
                // 上传相关
                uploading: false,
                progress: 0,
                isComplete: false,
                cancel: null
            }
        },

        methods: {
            refreshFiles: function(file, fileList) {
                this.files = fileList;
            },

            upload: function() {
                const self = this;
                this.$refs.form.validate((vaild) => {
                    if (vaild) {
                        self.doUpload();
                    }
                });
            },

            doUpload: function() {
                const self = this;

                this.progress = 0;

                const CancelToken = Axios.CancelToken;
                this.cancel = CancelToken.source();
                let opts = {
                    headers:{'Content-Type':'multipart/form-data'},
                    data: this.getUploadData(),
                    cancelToken: this.cancel.token,
                    onUploadProgress: function(e) {
                        if (e.lengthComputable) {
                            self.progress = parseInt(((e.loaded / e.total) * 100).toFixed());
                        } else {
                            self.progress = 100;
                        }
                    }
                };
                axios.post("/gallery/upload", opts, true).then(function(data) {
                    if (data.code === 0) {
                        self.progress = 100;
                        self.isComplete = true;
                        self.$notify({
                            message: data.msg,
                            type: "success"
                        });
                    } else {
                        self.$notify({
                            message: data.msg,
                            type: "warning"
                        });
                    }
                }).catch(function(error) {
                    if (Axios.isCancel(error)) {
                        // console.log("冇事发生");
                        return;
                    }
                    self.$notify.error({
                        message: error.message
                    });
                    self.progress = 100;
                });

                this.uploading = true;
            },

            getUploadData: function() {
                let formData = new FormData();
                this.files.forEach(function(val, key) {
                    formData.append("file", val.raw);
                });
                formData.append("illustrator", this.form.illustrator ? this.form.illustrator.split("，") : []);
                formData.append("group", this.form.circle);
                formData.append("collection", this.form.collection);

                return formData;
            },

            cancelUpload: function() {
                this.cancel.cancel();
                this.uploading = false;
            },

            completeUpload: function() {
                window.location.reload();
            }
        }
    }
</script>

<style lang="less">
    .upload {

        .el-upload {
            width: 100%;

            .el-upload-dragger {
                width: 100%;
                height: 100px;
            }

            .upload-tip {
                font-size: 20px;
                margin-top: 10px;
                color: #777;
            }
        }

        .v-modal {
            opacity: 0.3;
        }

        .el-dialog__header {
            padding: 0;
        }

        .el-dialog__body {
            padding: 15px 15px 0 15px;
            .dialog_divider {
                margin: 15px 0 0 0;
            }
        }

        .el-dialog__footer {
            padding: 5px 0;
            .dialog_button {
                margin: 4px 12px 4px 0;
                padding: 6px 12px;
            }
        }
    }

</style>