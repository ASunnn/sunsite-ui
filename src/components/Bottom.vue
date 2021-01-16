<template>
    <el-footer class="footer" style="height: 45px">
        <div class="menu">
            <slot></slot>
        </div>
    </el-footer>
</template>

<script>
    export default {
        name: "Bottom"
    }
</script>

<style lang="less">
    .footer {
        width: 100%;
        background-color: #ffffff;
        position: fixed;
        left: 0;
        bottom: 0;
        box-shadow: 0 -1px 4px rgba(0, 21, 41, 0.08);
        margin-top: 10px;

        .menu {
            line-height: 44px;
            span {
                padding: 5px 20px;
                color: #606266;
                cursor: pointer;
                border-radius: 5px;
                font-size: small;
                &:hover {
                    background-color: #f4f4f5;
                }
            }
            .el-divider--vertical {
                margin: 0 10px;
            }
        }
    }
</style>
