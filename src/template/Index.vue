<template>
    <el-container>
        <el-col :md="{span: 20, offset: 2}" :sm="24">
            <el-header style="height: unset">
                <el-menu mode="horizontal">
                    <el-menu-item index="0"><router-link class="menu-title" to="/">SunSite</router-link></el-menu-item>
                    <el-menu-item index="1"><router-link class="menu-item" to="/illustrator">Illustrator</router-link></el-menu-item>
                    <el-menu-item index="2"><router-link class="menu-item" to="/circle">Circle</router-link></el-menu-item>
                    <el-menu-item index="3"><router-link class="menu-item" to="/collection">Collection</router-link></el-menu-item>
                    <el-menu-item index="4"><router-link class="menu-item" to="/type">Type</router-link></el-menu-item>
                    <el-menu-item v-show="show" style="float: right" index="5"><router-link :to="toGo"><i class="el-icon-top"></i></router-link></el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <el-col :md="{span: 20, offset: 2}" :sm="24">
                    <router-view></router-view>
                </el-col>
            </el-main>
        </el-col>
    </el-container>
</template>

<script>
    export default {
        computed: {
            show: function () {
                return !this.$route.path.includes("/upload") && !this.$route.path.includes("/create");
            },

            toGo: function() {
                return this.$route.path.includes("/collection") ? "/create" : "/upload";
            }
        }
    }
</script>

<style lang="less">
    .el-menu-item {
        transition: none;
    }

    .el-menu--horizontal>.el-menu-item.is-active {
        border-bottom: none;
    }
</style>