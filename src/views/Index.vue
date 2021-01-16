<template>
    <el-container>
        <el-header class="header" style="height: auto">
            <el-menu class="menu" mode="horizontal">
                <el-menu-item index="0"><router-link class="menu-title" to="/">SunSite</router-link></el-menu-item>
                <el-menu-item index="1"><router-link class="menu-item" to="/illustrator">Illustrator</router-link></el-menu-item>
                <el-menu-item index="2"><router-link class="menu-item" to="/circle">Circle</router-link></el-menu-item>
                <el-menu-item index="3"><router-link class="menu-item" to="/collection">Collection</router-link></el-menu-item>
                <el-menu-item index="4"><router-link class="menu-item" to="/type">Type</router-link></el-menu-item>
                <el-menu-item v-show="show" style="float: right" index="5"><router-link :to="toGo"><i class="el-icon-top"></i></router-link></el-menu-item>
            </el-menu>
        </el-header>
        <el-main class="main">
            <el-col :xl="{span: 20, offset: 2}" :lg="{span: 22, offset: 1}" :md="24">
                <transition name="fade-transform" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-col>
        </el-main>
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
        },

        mounted() {
            this.$store.dispatch('progress/inLoad');
        }
    }
</script>

<style lang="less">
    .header {
        padding: 0;
        width: 100%;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        margin-bottom: 5px;

        .menu {
            padding: 0 20px;

            .menu-title {
                font-size: large;
            }
            .menu-item {
                font-size: revert;
            }

            .el-menu-item {
                text-decoration: none;
                transition: none;
                a {
                    text-decoration: none;
                }
            }
            .el-menu--horizontal>.el-menu-item.is-active {
                border-bottom: none;
            }
        }
    }

    .main {
        padding: 0 20px 30px 20px;
        min-height: calc(100vh - 81px);
        position: relative;

        .fade-transform-leave-active, .fade-transform-enter-active {
            transition: all 0.2s;
        }
        .fade-transform-enter {
            opacity: 0;
            transform: translateX(-30px);
        }
        .fade-transform-leave-to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
</style>
