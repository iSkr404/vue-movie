<template>
      <div>
        <div class="messageBox">
            <h2 v-if="title">{{title}}</h2>
        <p>
            {{content}}
        </p>
        <div>
            <div @click="handleCancel" class="cancel">{{cancel}}</div>
            <div @click="handleOk" class="ok">{{ok}}</div>
        </div>
    </div>
    <div class="box">
    </div>
    </div>
</template>

<script>
export default {
    name:'messageBox',
}
</script>

<style scoped>
.box{position: fixed;left: 0;top: 0;width: 100%;height: 100%;opacity: .5;background: #000;z-index: 999;}
.messageBox{ width:200px; height:120px; border:1px #ccc solid; border-radius: 2px; background:white; position: absolute; left: 50%; top: 50%; margin:-60px 0 0 -100px;z-index: 1000;}
.messageBox h2{ text-align: center; line-height: 40px; font-size: 18px;}
.messageBox p{ text-align: center; line-height:40px;}
.messageBox > div{ display: flex; position: absolute; bottom: 0; width:100%; border-top:1px #ccc solid;}
.messageBox > div div{ flex:1; text-align: center; line-height: 30px; border-right:1px #ccc solid;}
.ok:hover,.cancel:hover{color: #e54847;}
.messageBox > div div:last-child{ border:none;}
</style>