<template>
  <div id="detailContrainer" class="slide-enter-active">
		<header><i class="iconfont icon-right" @click="$router.back()"></i><h1>{{details.name}}</h1></header>
		<div class="detail_list">
			<div class="detail_list_bg"  :style="{'background':'url('+details.poster+')'}"></div>
			<div class="detail_list_filter"></div>
			<div class="detail_list_content">
				<div class="detail_list_img">
					<img :src="details.poster" alt="">
				</div>
				<div class="detail_list_info">
					<h2>{{details.name}}</h2>
					<p v-if="details.grade">{{details.grade}}分</p>
					<p>{{details.category}}</p>
					<p>{{details.director}}</p>
					<p>{{details.nation}} / {{details.runtime}}分钟</p>
					<p>{{details.premiereAt|datestr}}大陆上映</p>
				</div>
			</div>
		</div>
		<div class="detail_intro">
			<p>{{details.synopsis}}</p>
		</div>
		<div class="detail_player swiper-container" ref="detail_player1">
			<div class="actors">演职人员</div>
			<ul class="swiper-wrapper">
				<li class="swiper-slide" v-for="(actors,index) in details.actors" :key="index">
					<div>
						<img :src="actors.avatarAddress" alt="">
					</div>
					<p>{{actors.name}}</p>
					<p>{{actors.role}}</p>
				</li>
			</ul>
		</div>
		<div class="detail_player swiper-container" ref="detail_player2" :class="details.isSale==false?'':'isSale'">
			<div class="actors">剧照</div>
			<ul class="swiper-wrapper">
				<li style="width: 150px;height: 100px;padding-right:10px;" class="swiper-slide" v-for="(photos,index) in details.photos" :key="index">
					<div style="width:150px;height100px;overflow:hidden;position: relative;">
						<img :src="photos" alt="">
					</div>
				</li>
			</ul>
		</div>
		<a href="" v-if="details.isSale">
			<div class="goSchdule">
				选座购票
			</div>
		</a>
	</div>
</template>

<script>
import Header from '@/components/Header'
import moment from 'moment'
import {messageBox} from '@/components/JS'
export default {
	name:'detail',
	data() {
		return {
			details:[],
			isLoad:true
		}
	},
	created() {
		this.detailAxios();
	},
	activated() {
		if(this.details){
			this.detailAxios();
		}
	},
	methods: {
		detailAxios(){
			let _this=this;
			this.axios({
				url:`https://m.maizuo.com/gateway?filmId=${this.$route.params.filmId}&k=9147708`,
				headers: {
				"X-Client-Info":
				'{"a":"3000","ch":"1002","v":"5.0.4","e":"16016526501299214722138115","bc":"440100"}',
				"X-Host": "mall.film-ticket.film.info",
				},
			}).then((res)=>{
				this.details=res.data.data.film;
				this.isLoad=false;
				this.$nextTick(()=>{
				let s1=new Swiper(this.$refs.detail_player1 , {
						slidesPerView : 'auto',
						freeMode : true,
						freeModeSticky: true
					});
				let s2=new Swiper(this.$refs.detail_player2 , {
						slidesPerView : 'auto',
						freeMode : true,
						freeModeSticky: true
					});
					
				if(!res.data.data.film.isSale){
					messageBox({
						content:"该影片目前前没有排期，回到首页看看其他电影吧",
						cancel:"拒绝",
						ok:"同意",
						handleCancel(){
							// 拒绝
						},
						handleOk(){
							_this.$router.back();
						}
					})
				}
				});
			})
		}
	},
	filters:{
		datestr(time,format="YYYY-MM-DD"){
  			return moment(time*1000).format('YYYY-MM-DD');
		}
	}
}
</script>

<style scoped>
#detailContrainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:#f4f4f4;}
#detailContrainer.slide-enter-active{ animation:.3s slideMove;}
@keyframes slideMove{
    0%{ transform : translateX(100%); }
    100%{ transform : translateX(0); }
}
.demo{width: 150px;height: 100px;padding-left: 10px;position: absolute;margin-bottom: 60px;}
.detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
.detail_intro{ padding: 10px;background: white;}
.detail_intro p{font-size: 13px;color: #797d82;}
.detail_player{ margin-top:20px;padding: 15px;background: white;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
header{width:100%; height:50px; color: #fff; background: #e54847; border-bottom: 1px solid #e54847; position: relative;}
header h1{ font-size: 18px; text-align: center; line-height: 50px; font-weight: normal; }
header i{ position: absolute; left: 5px; top: 50%; margin-top: -13px; font-size: 26px;}
.actors{padding-bottom: 15px;}
.goSchdule{
	position: fixed;
    bottom: 0;
    left: 0;
    height: 49px;
    width: 100%;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
    font-size: 16px;
    line-height: 49px;
	z-index: 10;
}
.isSale{
	margin-bottom: 60px;
}
</style>