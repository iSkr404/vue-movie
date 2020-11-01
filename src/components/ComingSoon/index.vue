<template>
  <div class="movie_body" :style="{height:divheight}">
      <Loading v-if="isLoad"/>
       <ul v-else>
        <li v-for="item in movieList" :key="item.filmId">
          <div class="pic_show"><img :src="item.poster" @click="handelChangePage(item.filmId)"/></div>
          <div class="info_list">
            <span @click="handelChangePage(item.filmId)">{{item.name}}</span><span class="filmType">{{item.filmType.name}}</span>
            <p class="person"></p>
            <p class="pername">主演:<span style="font-size: 12px;" v-for="(pername,index) in item.actors" :key="index"> {{pername.name}} </span></p>
            <p>上映日期: {{item.premiereAt | week(item.premiereAt)}} {{item.premiereAt | time(item.premiereAt)}}</p>
          </div>
          <div class="btn_pre" v-if="item.isPresale">预售</div>
        </li>
      </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
Vue.filter('time',function(value, format="YYYY-MM-DD"){
   return moment(value*1000).format('MM月DD日');
})
Vue.filter('week',function(value, format="ddd"){
   return moment(value*1000).format('ddd');
})
export default {
  name: 'ComingSoon',
  data() {
    return {
      movieList:[],
      pername:[],
      divheight:'',
      percityId:-1,
      isLoad:true
    }
  },
  activated() {
    let citys=this.$store.state.city.cid;
    if(this.percityId===citys){
      return;
    }
    this.axios({
        url:
        "https://m.maizuo.com/gateway?cityId="+citys+"&pageNum=1&pageSize=10&type=2&k=5534232",
        headers: {
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"16016526501299214722138115","bc":"440100"}',
        "X-Host": "mall.film-ticket.film.list",
        },
    }).then((res) => {
        this.movieList = res.data.data.films;
        this.percityId=citys;
        this.isLoad=false;
    });
    this.divheight=(document.body.clientHeight-(document.getElementById("footer").clientHeight+document.getElementById("header").clientHeight+document.getElementsByClassName("movie_menu")[0].clientHeight))-3+'px';
  },
  methods: {
    handelChangePage(filmId) {
      this.$router.push("/movie/detail/"+filmId);
    },
  },
}
</script>
<style scoped>
#content .movie_body{overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.filmType{font-size: 9px;color: #fff;background-color: #d2d6dc;height: 14px;line-height: 14px;padding: 0 2px;border-radius: 2px;margin-left: 5px;}
.person{
  padding: 8px 0;
}
</style>