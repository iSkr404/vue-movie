<template>
  <div id="mian">
    <Header title="电影"/>
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>{{$store.state.city.cn}}</span><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowPlaying" class="hot_item">
            正在热映
          </router-link>
          <router-link tag="div" to="/movie/comingSoon" class="hot_item">
            即将上映
          </router-link>
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <TabBar/>
    <router-view name="detail"/>
  </div>
</template>
<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  name: "Movie",
  components: {
    Header,
    TabBar,
  },
  data() {
    return {
      // title:"标题",
      citys:'城市'
    }
  },
  mounted() {
    this.cshow();
    window.onresize=()=>{this.check();location.reload();};
  },
  methods: {
    isMobile() {
        let res = false
        let sUserAgent = navigator.userAgent.toLowerCase()
        let bIsIpad = sUserAgent.match(/ipad/i) == "ipad"
        let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"
        let bIsMidp = sUserAgent.match(/midp/i) == "midp"
        let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"
        let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb"
        let bIsAndroid = sUserAgent.match(/android/i) == "android"
        let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce"
        let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"
        if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
            res = true
        }
        return res;
    },
    check() {
      let ishow=true;
      let dnode=document.getElementById("device-tip");
      if (this.isMobile()) {
          dnode.style.visibility="hidden";
      } else {
          dnode.onclick=()=>{
            dnode.style.visibility="hidden";
          }
          dnode.style.visibility="visible";
      }
    },
    cshow(){
      let div_tip=document.createElement('div');
      let devicTtip =
        '<div class="device-tip" id="device-tip">关闭</div>';
      div_tip.innerHTML=devicTtip;
      document.getElementById('mian').appendChild(div_tip);
      this.check();
    }
  }
};
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}

.slide-enter-active{ animation : 13s detailMove;}
@keyframes detailMove{
	0%{
		transform : translateX(100%);
	}
	100%{
		transform : translateX(0);
	}
}
</style>