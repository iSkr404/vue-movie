<template>
    <div id="mian">
        <Header title="我的猫眼"></Header>
        <div id="content">
            <Login />
        </div>
        <TabBar></TabBar>
    </div>
</template>
<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login'

export default {
    name:'Mine',
    components:{
        Header,
        TabBar,
        Login
    }
}
</script>