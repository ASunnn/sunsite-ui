<script>
    import axios from "../utils/axios";
    import Axios from "axios";

    export default {
        name: "Uploader",

        data() {
            return {
                uploading: false,
                progress: 0,
                isComplete: false,
                cancel: null
            };
        },

        methods: {
            upload: function(uploadData) {
                const self = this;

                this.progress = 0;

                const CancelToken = Axios.CancelToken;
                this.cancel = CancelToken.source();
                let opts = {
                    headers:{'Content-Type':'multipart/form-data'},
                    data: uploadData,
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
            }
        }
    }
</script>
