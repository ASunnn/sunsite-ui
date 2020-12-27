<template>
    <el-dialog class="progress" width="30%" top="10vh"
            :visible.sync="showProgress" :show-close="false" :close-on-press-escape="false"
            @close="onCancel">
        <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage" color="#909399"></el-progress>
        <el-divider class="dialog_divider"></el-divider>
        <span slot="footer" class="dialog-footer">
                <el-button class="dialog_button" v-show="!complete" @click="onCancel">Cancel</el-button>
                <el-button class="dialog_button" v-show="complete" type="primary" @click="onComplete">OK</el-button>
            </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "Progress",

        props: ["show", "percentage", "complete"],

        data() {
            return {
                showProgress: this.show
            }
        },

        watch: {
            show: function (val) {
                this.showProgress = val;
            }
        },

        methods: {
            onCancel: function () {
                this.$emit("cancel");
            },

            onComplete: function () {
                this.$emit("complete");
            }
        }
    }
</script>

<style lang="less">
    .progress {
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
