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
                <el-button type="primary" @click="doUpload">Submit</el-button>
            </el-form-item>
        </el-form>
        <el-col>
            <el-upload :auto-upload="false" :on-change="refreshFiles" action="/index" drag multiple>
                <div class="upload-tip">将图片拖到此处，或点击上传</div>
            </el-upload>
        </el-col>
        <progress-bar :show="uploading" :percentage="progress" :complete="isComplete" @cancel="cancelUpload" @complete="completeUpload"></progress-bar>
    </div>
</template>

<script>
    import ProgressBar from "../../components/Progress";
    import Uploader from "../../mixin/Uploader";

    export default {
        name: "Upload",

        components: {ProgressBar},

        mixins: [Uploader],

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
                files: []
            }
        },

        methods: {
            refreshFiles: function(file, fileList) {
                this.files = fileList;
            },

            doUpload: function() {
                const self = this;
                this.$refs.form.validate((vaild) => {
                    if (vaild) {
                        self.upload(self.getUploadData());
                    }
                });
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

        /*.v-modal {*/
        /*    opacity: 0.3;*/
        /*}*/
    }
</style>
