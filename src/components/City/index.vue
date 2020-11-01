<template>
  <div class="city_body">
    
    <div class="city_list search_body">
      <div class="search_input">
            <div class="search_input_wrapper">
                <el-input
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  v-model="message" clearable
                  @change="Search()">
                </el-input>
            </div>					
        </div>
      <Loading v-if="isLoad"/>
      <div v-else>
      <div class="city_sort" id="city-bg" v-if="message.length>0">
          <ul class="search_list">
            <li v-for="city in searchData" :key="city.id" @click="cityClick(city.id,city.nm)">
              {{ city.nm }}
            </li>
          </ul>
      </div>
      <div v-else>
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
            <li v-for="item in hotList" :key="item.cityId" @click="cityClick(item.cityId,item.name)">{{ item.name }}</li>
          </ul>
        </div>
        <div class="city_sort" ref="city_sort">
          <div v-for="item in cityList" :key="item.index">
            <h2>{{ item.index }}</h2>
            <ul>
              <li v-for="city in item.list" :key="city.id" @click="cityClick(city.id,city.nm)">
                {{ city.nm }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item, index) in cityList"
          :key="item.index"
          @touchstart="handleToIndex(index)"
        >
          {{ item.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchList from '../JS/SeaechList'
export default {
  name: "City",
  data() {
    return {
      hotList: [],
      // 原本展示的数据
      cityList: [],
      isLoad:true,
      message:'',
      // 搜索后的数据
      searchData:[]
    };
  },
  mounted() {
    let hotList=localStorage.getItem('hotList');
    let cityList=localStorage.getItem('cityList');
    if(hotList&&cityList){
      this.hotList=JSON.parse(hotList);
      this.cityList=JSON.parse(cityList);
      this.isLoad=false;
    }else{
      this.axios({
      url: "https://m.maizuo.com/gateway?k=5586821",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16016484491289761499119617","bc":"110100"}',
        "X-Host": " mall.film-ticket.city.list",
      },
    }).then((res) => {
      if (res.data.msg === "ok") {
        var citys = res.data.data.cities;
        // [{index:'A',list:[{nm:'城市',id:123}]}]
        var { hotList, cityList } = this.formCityList(citys);
        this.hotList = hotList;
        this.cityList = cityList;
        // 将数据存储到本地尽可能少的发送ajax请求
        localStorage.setItem('hotList',JSON.stringify(this.hotList));
        localStorage.setItem('cityList',JSON.stringify(this.cityList));
        this.isLoad=false;
      }
    });
    }
  },
  methods: {
    formCityList(citys) {
      // 保存热门城市
      var hotList = [];
      var cityList = [];
      for (var i = 0; i < citys.length; i++) {
        // 截取数组中的第一个首字母
        var firstLetter = citys[i].pinyin.substring(0, 1).toUpperCase();
        if (isBaohan(firstLetter)) {
          //判断新添加 index 是否重复
          cityList.push({
            index: firstLetter,
            list: [{ nm: citys[i].name, id: citys[i].cityId }],
          });
        } else {
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: citys[i].name, id: citys[i].cityId });
            }
          }
        }
        // 热门城市
        if (citys[i].isHot === 1) {
          hotList.push(citys[i]);
        }
      }
      // 数组排序
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });
      // 判断添加值
      function isBaohan(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      return {
        hotList,
        cityList,
      };
    },
    handleToIndex(index) {
      // 未完成
    },
    cityClick(cid,cn){
      this.$store.commit('city/CITY_INFO',{cn,cid});
      localStorage.setItem('cityid',cid);
      localStorage.setItem('cityname',cn);
      this.$router.push('/movie/nowPlaying');
    },
    Search(){
      let dataList=JSON.parse(localStorage.getItem('cityList'));
      if(this.message){
        this.searchData=new SearchList().search(this.message,this.cityList)
      }
    },
  },
  watch: {
    message(){
      this.Search();
    }
  },
};
</script>


<style scoped>
.search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding-right: 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding-right: 4px; outline: none; margin-left: 5px; width:100%;}
.city_body{ margin-top: -1px;overflow: auto;height: 522px;}
.city_body .city_list{overflow: hidden; background: #FFF5F0;float: left;width: 95%;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{text-align: center; border-left:1px #e6e6e6 solid;}
.city_body .city_index ul{position:fixed;top: 110px;right: 0;}
.city_body .city_sort .search_list{
  padding: 0 30px;
}
.city_body .city_sort .search_list li{
  border-bottom: 1px solid #f6f6f6;
}
#city-bg{
  background-color: white;
  margin-top: -10px;
}
</style>
<style>
.el-input__inner{
  border: 0;
  height: 24px;
  line-height: 24px;
  text-indent: 5px;
}
.el-input__icon{
  line-height: 24px;
}
</style>