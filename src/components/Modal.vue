<template>
    <el-dialog class="modal" top="20vh" :visible.sync="showModal" :show-close="false" @close="closeModal">
        <slot></slot>
        <el-divider class="dialog_divider"></el-divider>
        <span slot="footer" class="dialog-footer">
            <el-button class="dialog_button" @click="closeModal">Close</el-button>
            <el-button class="dialog_button" type="primary" @click="submit">OK</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "Modal",

        props: ["show"],

        data() {
            return {
                data: [],
                showModal: this.show
            }
        },

        watch: {
            show: function (val) {
                this.showModal = val;
            }
        },

        methods: {
            submit: function() {
                this.$emit("submit");
            },

            closeModal: function () {
                this.$emit("close");
            }
        }
    }
</script>

<style lang="less">
    .modal {
        .el-dialog {
            width: 90%;
            .el-dialog__header {
                padding: 0;
            }
            .el-dialog__body {
                padding: 20px 15px 10px;
                .el-divider--horizontal {
                    margin: 0;
                }
            }
            .el-dialog__footer {
                padding: 5px 20px 15px;
            }
        }
        @media (min-width: 768px) {
            .el-dialog {
                width: 60%;
            }
        }
    }
</style>