<template>
    <div class="post">
        <div class="image">
            <el-image :src="src" ref="img" @load="imageLoad">
                <div slot="error">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <div class="prev area" :style="{'height': navigateHeight}" @click="nextPost(false)">
                <i class="el-icon-arrow-left" :style="{'line-height': navigateHeight}"></i>
            </div>
            <div class="next area" :style="{'height': navigateHeight}" @click="nextPost(true)">
                <i class="el-icon-arrow-right" :style="{'line-height': navigateHeight}"></i>
            </div>
        </div>
        <div class="meta">
            <h4 class="name">{{name}}</h4>
            <span class="size">{{size}}</span>
            <span class="pixel">{{width + " × " + height}}</span>
        </div>
        <el-divider></el-divider>
        <div class="info">
            <div>
                <h3 class="content" @click="onCircleClick()">{{circle}}</h3>
                <span class="type">circle</span>
            </div>
            <div>
                <h3 class="content" @click="onCollectionClick()">{{collection}}</h3>
                <span class="type">collection</span>
            </div>
            <div>
                <template v-for="i in illustrators">
                    <span class="illustrator" @click="onIllustratorClick(i)">{{i}}</span>
                </template>
            </div>
        </div>

        <bottom>
            <span @click="showModifyModal = true">Modify</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="onDelete">Delete</span>
        </bottom>

        <modal :show="showModifyModal" @submit="onModalSubmit" @close="onModalClose">
            <el-form label-position="right" label-width="100px" :model="modifyForm">
                <el-form-item label="Name">
                    <el-input v-model="modifyForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Illustrators">
                    <el-input v-model="modifyForm.illustrators"></el-input>
                </el-form-item>
            </el-form>
        </modal>
    </div>
</template>

<script>
    import Bottom from "../components/Bottom";
    import Modal from "../components/Modal";

    export default {
        name: "Post",

        components: {Modal, Bottom},

        data() {
            return {
                seq: "",
                src: "https://cdn.wallpaperhub.app/cloudcache/0/d/c/e/3/7/0dce3731051ad7faec97269c52b44489817d3698.jpg",
                // src: "http://sjbz.fd.zol-img.com.cn/t_s1080x1920c/g6/M00/07/01/ChMkKV-g-_2IG-TAAD9-OV4E0KsAAEuvQAAAAAAP35R190.jpg",
                name: "",
                size: "",
                width: "",
                height: "",

                circle: "",
                cId: "",
                collection: "",
                illustrators: "",

                prev: "",
                next: "",
                navigateHeight: 0,

                showModifyModal: false,
                modifyForm: {
                    name: "",
                    illustrators: ""
                }
            }
        },

        created: function () {
            this.seq = this.$route.params.seq;
            this.init();
        },

        mounted: function () {
            window.onresize = this.imageLoad;
        },

        destroyed: function () {
            window.onresize = null;
        },

        watch: {
            $route(to, from) {
                this.seq = to.params.seq;
                this.init();
            }
        },

        methods: {
            init: function () {
                this.name = this.seq + ".jpg";
                this.circle = "circle" + this.seq;
                this.collection = "collection" + this.seq;
                this.illustrators = ["a", "b", "c"];
                this.size = this.seq + "kb";
                this.width = this.seq;
                this.height = this.seq;

                this.modifyForm.name = this.name;
                this.modifyForm.illustrators = this.illustrators;
            },

            imageLoad: function (e) {
                this.navigateHeight = this.$refs.img.$el.offsetHeight + "px";
            },

            nextPost: function (next) {
                if (next) {
                    this.$router.push({name:"post", params:{seq: this.seq + 1}});
                } else {
                    this.$router.push({name:"post", params:{seq: this.seq - 1}});
                }
            },

            onCircleClick: function () {
                console.log(this.circle);
            },

            onCollectionClick: function () {
                console.log(this.cId);
            },

            onIllustratorClick: function (illustrator) {
                console.log(illustrator);
            },

            onDelete: function () {
                this.$confirm("Delete?", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("ok")
                }).catch(() => {
                });
            },

            onModalSubmit: function () {
                console.log(this.modifyForm)
            },

            onModalClose: function () {
                this.showModifyModal = false;
            }
        }
    }
</script>

<style lang="less">
    .post {
        .image {
            text-align: center;
            position: relative;

            .area {
                position: absolute;
                width: 20%;
                top: 0;
                opacity: 0;
                transition: opacity 0.2s;
                &:hover {
                    cursor: pointer;
                    opacity: 1;
                }

                i {
                    font-size: 80px;
                }
            }
            .prev {
                left: 0;
                background: linear-gradient(to left, #ffffff00, #ffffff7f);
                text-align: left;
            }
            .next {
                right: 0;
                background: linear-gradient(to right, #ffffff00, #ffffff7f);
                text-align: right;
            }
        }

        .meta {
            margin-top: 5px;
            padding: 0 5px;

            .name {
                display: inline;
            }
            .size {
                color: #909399;
                font-size: small;
                margin-left: 15px;
                vertical-align: bottom;
            }
            .pixel {
                color: #909399;
                float: right;
            }
        }

        .info {
            padding: 0 5px;

            div {
                margin-bottom: 10px;
                padding: 5px 0;
            }
            .content {
                display: inline;
                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                    color: #337ab7;
                }
            }
            .type {
                color: #909399;
                font-size: small;
                margin-left: 10px;
            }

            .illustrator {
                padding: 5px 10px;
                border-radius: 5px;
                &:hover {
                    cursor: pointer;
                    background-color: #f4f4f5;
                }
            }
        }
    }
</style>