<template>
    <div class="circle">
        <preview-list url="/circle/list" :params="params" type="circle" :draggable="true" @drag-files="onDragFiles">
            <div class="form-content">
                <el-input class="form-item edge" v-model="form.name" placeholder="filter" @keyup.enter.native="refresh" ref="input">>
                    <el-button slot="append" type="primary" @click="refresh">Go</el-button>
                </el-input>
            </div>
        </preview-list>
        <progress-bar :show="uploading" :percentage="progress" :complete="isComplete" @cancel="cancelUpload" @complete="completeUpload"></progress-bar>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import PreviewList from "../../components/pic/PreviewList";
    import ProgressBar from "../../components/Progress";
    import Uploader from "../../mixin/Uploader";

    export default {
        name: "Circle",

        components: {PreviewList, ProgressBar},

        mixins: [Uploader],

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
            },

            onDragFiles: function (data, e) {
                let target = e.path.find(function (p) {
                    return p.className === "item" || p.className === "item drag";
                });

                if (target) {
                    let entry = data.items[0].webkitGetAsEntry();
                    let reader = entry.createReader();

                    // 拿到上传的信息
                    let circle = target.firstChild.childNodes[2].innerText; // div -> a -> p
                    let collection = entry.name;

                    const self = this;
                    reader.readEntries(function(entries) {
                        self.fileEntryFilter(entries).then(function (files) {
                            if (files.length > 0) {
                                self.$prompt("Type：", {
                                    showClose: false,
                                    showCancelButton: false
                                }).then(({ value }) => {
                                    self.doUpload(files, value, circle, collection);
                                }).catch(() => {});
                            }
                        });

                    }, function(error) {
                        // ignore now
                    });
                } else {
                    this.$notify({
                        message: "Invalid Target",
                        type: "warning"
                    });
                }
            },

            doUpload: function (files, type, circle, collection) {
                const self = this;
                let opts = {
                    data: {
                        group : circle,
                        collection: collection,
                        type: type
                    }
                };
                axios.post(path + "/collection/create", opts, true).then(function(data) {
                    if (data.code === 0 || data.code === 1) {
                        self.$notify({
                            message: "Collcetion: " + data.msg,
                            type: "success"
                        });

                        let formData = new FormData();
                        files.forEach(function(f) {
                            formData.append("file", f);
                        });
                        formData.append("illustrator", circle);
                        formData.append("group", circle);
                        formData.append("collection", collection);

                        self.upload(formData);
                    } else {
                        self.$notify({
                            message: data.msg,
                            type: "warning"
                        });
                    }
                }).catch(function (error) {
                    self.$notify.error({
                        message: error.message,
                    });
                });
            },

            completeUpload: function() {
                const self = this;
                this.uploading = false;
                // 点击确定进度条消失后 防止取消键那么快冒出来
                setTimeout(function () {
                    self.isComplete = false;
                }, 150);
            },

            fileEntryFilter: async function (entries) {
                let res = [];
                if (entries.length && entries.length > 0) {
                    for (let i = 0; i < entries.length; ++i) {
                        if (entries[i].isFile) {
                            let file = await getFile(entries[i]);
                            res.push(file);
                        }
                    }
                }

                async function getFile (fileEntry) {
                    try {
                        return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
                    } catch (e) {
                        // ignore now
                    }
                }

                return res;
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
