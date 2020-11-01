<template>
  <div class="cinema_body" :style="{height:divheight}">
    <Loading v-if="isLoad"/>
    <ul v-else>
      <li v-for="item in clist" :key="item.cinemaId">
        <div>
          <span @click="cinemaClick(item.cinemaId)" class="clistname">{{item.name}}</span>
          <span class="q"><span class="price">22.9</span> 元起</span>
        </div>
        <div class="address">
          <span>{{item.address}}</span>
          <span><!--距离--></span>
        </div>
        <div class="card">
          <div v-for="(cards,index) in cards()" :key="index" :class="cards | carclass">{{cards}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Clist",
  data() {
    return {
      clist:[],
      percityId:-1,
      isLoad:true,
      divheight:''
    }
  },
  
  activated() {
    let citys=this.$store.state.city.cid;
    if(this.percityId===citys){
      return;
    }
   this.axios({
        url:
        "https://m.maizuo.com/gateway?cityId="+citys+"&ticketFlag=1&k=9876017",
        headers: {
        "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.0.4","e":"16016484491289761499119617","bc":"110100"}',
        "X-Host": "mall.film-ticket.cinema.list",
        },
    }).then((res) => {
        this.clist = res.data.data.cinemas;
        this.percityId=citys;
        this.isLoad=false;
    });
    this.divheight=(document.body.clientHeight-(document.getElementById("footer").clientHeight+document.getElementById("header").clientHeight+document.getElementsByClassName("cinema_menu")[0].clientHeight))-3+'px';
  },
  methods: {
    // 模拟卡片数据
    cards(){
       let num = parseInt(Math.random(4 - 1 + 1) * 4 + 1);
            let str = [];
            for (let i = 0; i < num; i++) {
                str.push(parseInt(Math.random(4 - 1 + 1) * 4 + 1));
            }
            for (let i = 0, len = str.length; i < len; i++) {
                for (let j = i + 1, len = str.length; j < len; j++) {
                    if (str[i] === str[j]) {
                        str.splice(j, 1);
                        j--; // 每删除一个数j的值就减1
                        len--; // j值减小时len也要相应减1（减少循环次数，节省性能）   
                    }
                }
            }
            str.sort();
            // console.log(str);
            let message=[];
            for (let k = 0; k < str.length; k++) {
                switch (str[k]) {
                    case 1:
                        message.push("改签");
                        break;
                    case 2:
                        message.push("小吃");
                        break;
                    case 3:
                        message.push("折扣卡");
                        break;
                    case 4:
                        message.push("杜比全景声厅");
                    default:
                        break;
                }
            }
            return message;
    },
    cinemaClick(cinemaid){
      this.$router.push("/cinemas/"+cinemaid);
    }
  },
  filters:{
    carclass(val){
      let cardStyle=[{key:'改签',value:'or'},{key:'小吃',value:'or',},{key:'折扣卡',value:'bl',},{key:'杜比全景声厅',value:'bl'}]
      for (let i = 0; i < cardStyle.length; i++) {
        if(cardStyle[i].key==val){
          return cardStyle[i].value;
        }
      }
      return '';
    }
  }
};
</script>
<style scoped>
#content .cinema_body {
  /* flex: 1; */
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  float: right;
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 12px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
  position: relative;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
.address span:nth-child(1){
    display: block;
    max-width: 80%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.address span:nth-child(2){
  position: absolute;
  right: 0;
  top: 0;
}
</style>