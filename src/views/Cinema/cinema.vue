<template>
  <div class="cinema" v-if="cinemaList">
      <Loading :style="{height:divheight}" v-if="isLoad"/>
      <div v-else>
          <header id="header"><i class="iconfont icon-right" @click="$router.back()"/></header>
            <div class="header-title">{{cinemaList.name}}</div>
            <div class="header-address" :title="cinemaList.address">地址:{{cinemaList.address}}</div>
            <div class="schedule-wrap">
                <div class="film-bg">
                    <div class="img" :style="{'background':'url('+filmInfo.poster+')'}">
                    </div>
                </div>
                <div class="film-list">
                    <div class="detail_player swiper-container" ref="data_player">
                        <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="list in dataList" :key="list.filmId" >
                            <img style="height:130px;width:90px;" :src="list.poster" alt="">
                        </div>
                        </div>
                    </div>
                </div>  
                <div class="film-info">
                    <div class="film-head">
                        <span class="film-name">{{filmInfo.name}}</span>
                        <span class="film-score">{{filmInfo.grade}}分</span>
                    </div>
                    <div class="film-desc">
                        {{filmInfo.category}}|{{filmInfo.runtime}}分钟|{{filmInfo.director}}
                    </div>
                    <i class="el-icon-arrow-right t-z"  @click="$router.push('/movie/detail/'+filmInfo.filmId)"></i>
                </div>
                    <el-tabs class="elemClass" v-model="activeName">
                        <el-tab-pane :label="toDay" name="first">还未完成...</el-tab-pane>
                        <el-tab-pane :label="nextDay" name="second">加载中...</el-tab-pane>
                    </el-tabs>
            </div>
        </div>
  </div>
</template>

<script>
import { calendarFormat } from 'moment';
export default {
    name:'cinemas',
    data() {
        return {
            id:'',
            cinemaList:[],
            dataList:[],
            filmId:'',
            filmInfo:[],
            activeName: 'first',
            isLoad:true,
            divheight:''
        }
    },
    activated() {
       this.cinemaAxios();
       this.dataAxios();
       this.divheight=(document.body.clientHeight)-3+'px';
    },
    methods: {
        // 影院信息
        cinemaAxios(){
            this.axios({
                url:"https://m.maizuo.com/gateway/?cinemaId="+this.$route.params.cinemaid+"&k=9527860",
                headers:{
                    "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"16016526501299214722138115","bc":"440100"}',
                    "X-Host": "mall.film-ticket.cinema.info"
                }
            }).then((res)=>{
                this.cinemaList=res.data.data.cinema;
            })
        },
        // 影片信息
        dataAxios(){
            this.axios({
                url:"https://m.maizuo.com/gateway/?cinemaId="+this.$route.params.cinemaid+"&k=8863164",
                headers:{
                    "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"16016526501299214722138115","bc":"360400"}',
                    "X-Host": "mall.film-ticket.film.cinema-show-film"
                }
            }).then((res)=>{
                let _this=this;
                this.dataList=res.data.data.films;
                this.filmInfo=this.dataList[0];
                this.isLoad=false;
                this.$nextTick(()=>{
                        // _this.isLoad=false;
                        var swiper = new Swiper(this.$refs.data_player, {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        centeredSlides: true,
                        on:{
                            slideChange: function(){
                                // 切换时执行
                                _this.filmInfo=_this.dataList[this.activeIndex];
                                _this.filmId=_this.dataList[this.activeIndex].filmId;
                            },
                        },
                    });
                })
            })
        },
        infoData(filmId){
            for(let i=0;i<this.dataList.length;i++){
                if(this.dataList[i].filmId==filmId){
                   this.filmInfo=this.dataList[i];
                }
            }
        },
    },
    watch: {
        filmId(val){
            this.infoData(val);
        }
    },
    computed: {
            toDay(){
                return `今天${new Date().getMonth()+1}月${new Date().getDate()}日`;
            },
            nextDay(){
                return `明天${new Date().getMonth()+1}月${new Date().getDate()+1}日`;
            }
    },
}
</script>

<style scoped>
html,body{position: relative;}
#header{width:100%; height:50px; line-height: 50px; color: #fff; background: #e54847; border-bottom: 1px solid #e54847; position: relative;}
#header h1{ font-size: 18px; text-align: center; line-height: 50px; font-weight: normal; }
#header i{ position: absolute; left: 5px; top: 50%; margin-top: -22px; font-size: 26px;}
.header-title{
    position: relative;
    text-align: center;
    font-size: 17px;
    color: #191a1b; 
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    background: #fff;
    top: 0;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #ededed;
}
.schedule-wrap{
    position: relative;
}
.film-bg{
    position: absolute;
    top: 0;
    height:140px;
    width: 100%;
    padding: 15px 0;
    overflow: hidden;
}
.film-bg .img{
    height: 100%;
    width: 100%;
    filter: blur(30px);
    -webkit-filter: blur(30px);
}
.film-list{
    height: 160px;
    padding: 15px 0;
    position: relative;
}
.header-address{
    width: 90%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
}
.swiper-container {
      width: 100%;
      height: 100%;
}
.swiper-slide {
    text-align: center;
    font-size: 18px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 300ms;
    transform: scale(0.8);
}
.swiper-slide-active,.swiper-slide-duplicate-active{
    transform: scale(1);
}
.film-info{
    background: #fff;
    height: 80px;
    padding:25px 15px 0;
    position: relative;
    border-bottom: 1px solid #ededed;
}
.t-z{
    position: absolute;
    top: 45px;
    right: 30px;
}
.film-head{
    margin-bottom: 10px;
    text-align: center;
    line-height: 18px;
}
.film-desc{
    text-align: center;
    height: 18px;
    color: #797d82;
    font-size: 13px;
    padding: 0 12%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.film-name{
    font-size: 15px;
    color: #191a1b;
    padding-right: 5px;
}
.film-score{
    font-size: 16px;
    font-style: italic;
    color: #ffb232;
}

</style>
<style>
.el-tabs__item:hover {
    color: #e54847;
    cursor: pointer;
}

.el-tabs__active-bar {
    background-color: #e54847;
}

.el-tabs__item.is-active {
    color: #e54847;
}
.el-tabs__header{
    padding: 0 15px;
    border-bottom: 1px solid #ededed;
}
.el-tabs__nav-wrap::after{
    height: 0;
}
</style>