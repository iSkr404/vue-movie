<template>
  <div class="movie_body" ref="movie_body" :style="{height:divheight}" @scroll="scrollEvent">
    <Loading v-if="isLoad"/>
        <ul v-else>
          <li v-for="(list,index) in movieList" :key="index">
            <div class="pic_show">
              <img :src="list.poster" @click="handelChangePage(list.filmId)" />
            </div>
            <div class="info_list">
              <span @click="handelChangePage(list.filmId)">{{ list.name }}</span><span class="filmType">{{list.filmType.name}}</span>
              <p>
                观众评 <span class="grade">{{ list.grade }}</span>
              </p>
              <p>主演:{{ dirfilter(list.director) }}</p>
              <p>{{ list.nation }}|{{ list.runtime }}分钟</p>
            </div>
            <div class="btn_mall">购票</div>
          </li>
        </ul>
        <p v-if="wanc">没有数据了<i class="el-icon-refresh"></i></p>
  </div>
</template>
<script>
import Vue from 'vue'
// import Bscroll from 'better-scroll'
export default {
    name:'NowPlaying',
    data() {
    return {
        movieList: [],
        divheight:null,
        percityId:-1,
        isLoad:true,
        page:1,
        wanc:false
        };
    },
    // mounted有keep-alive缓存机制的话不会二次执行,当我们需要切换城市的时候需要再次请求activated被 keep-alive 缓存的组件激活时调用
    activated() {
        //减少发生ajax请求
        let citys=this.$store.state.city.cid;
        if(this.percityId===citys){
          return;
        }
        this.axios({
            url:
            "https://m.maizuo.com/gateway?cityId="+citys+"&pageNum="+this.page+"&pageSize=10&type=1&k=686153",
            headers: {
            "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"16016526501299214722138115"}',
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
      //   过滤数据
      dirfilter(data) {
        var dri = data.split("|");
        return dri.join(" ");
      },
      handelChangePage(filmId) {
        this.$router.push("/movie/detail/"+filmId);
      },
      // 获取滚动条当前的位置
      getScrollTop () {
        var scrollTop = 0
        if (this.$refs.movie_body && this.$refs.movie_body.scrollTop) {
          scrollTop = this.$refs.movie_body.scrollTop;
        }
        return scrollTop;
      },
      // 获取文档完整的高度
      getScrollHeight () {
        return Math.max(this.$refs.movie_body.scrollHeight);
      },
      // 滚动事件触发下拉加载
      scrollEvent () {
        if (this.getScrollHeight() - parseInt(this.divheight) - this.getScrollTop() <= 1) {
            // 页码，分页用，默认第一页
            this.page++;
            setTimeout(()=>{
                this.axios({
                    url:
                    "https://m.maizuo.com/gateway?cityId="+this.$store.state.city.cid+"&pageNum="+this.page+"&pageSize=10&type=1&k=686153",
                    headers: {
                    "X-Client-Info":
                    '{"a":"3000","ch":"1002","v":"5.0.4","e":"16016526501299214722138115"}',
                    "X-Host": "mall.film-ticket.film.list",
                    },
                }).then((res) => {
                    this.movieList.push(...res.data.data.films);
                    if(res.data.data.films.length<10){
                        this.wanc=true;
                        return;
                    }
                });
            },100)
        }
      },
    },
    // 路由发生变化是更新数据 
    watch: {
      $route() {
      
      },
  },
}
</script>
<style scoped>
#content .movie_body{overflow:auto;}
.movie_body ul{ margin:0 12px;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;height: 100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{ margin:0; padding:0; border:none;}
.filmType{font-size: 9px;color: #fff;background-color: #d2d6dc;height: 14px;line-height: 14px;padding: 0 2px;border-radius: 2px;margin-left: 5px;}
.movie_body>p{width: 100%; line-height: 40px;text-align: center;}
</style>