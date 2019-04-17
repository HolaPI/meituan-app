<template>
  <div class="goods">
    <!-- categories -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li class="menu-item" :class="{'current': currentIndex === 0}" @touchend="selectMenu(0)">
          <p class="text">
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon">
            {{container.tag_name}}
          </p>
        </li>
        <li
          class="menu-item"
          :class="{'current': currentIndex === index + 1}"
          v-for="(item, index) in goods"
          :key="index"
          @touchend="selectMenu(index + 1)"
        >
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon">
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <!-- goods list -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- specialist -->
        <li class="container-list food-list-hook">
          <div v-for="(item, index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url">
          </div>
        </li>
        <!-- detail-list -->
        <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
          <h3 class="title">{{item.name}}</h3>
          <!-- details -->
          <ul>
            <li class="food-item" v-for="(food, index) in item.spus" :key="index">
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img class="product" :src="food.product_label_picture">
                <p class="price">
                  <span class="text">¥{{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                <app-cart-control :food="food"></app-cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- shopping cart -->
    <app-shopcart :poiInfo="poiInfo"></app-shopcart>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Shopcart from "../shopcart/Shopcart.vue";
import CartControl from "../cartcontrol/CartControl.vue";
export default {
  data() {
    return {
      container: {},
      goods: [],
      poiInfo: {},
      listHeight: [],
      menuScroll: {},
      foodScroll: {},
      scrollY: 0
    };
  },
  components: {
    "app-shopcart": Shopcart,
    "app-cart-control": CartControl
  },
  methods: {
    head_bg(imgName) {
      return "background-image: url(" + imgName + ");";
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll);
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3,
        touchend: true
      });
      //listen foodscroll scorll-event
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
        // console.log(this.scrollY);
      });
    },
    calculateHeight() {
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      // console.log(foodList);
      // console.log(this.listHeight);
    },
    selectMenu(index) {
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let element = foodList[index];
      this.foodScroll.scrollToElement(element, 250);
      // console.log(index);
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (
          !height2 ||
          (this.scrollY >= this.listHeight[i] &&
            this.scrollY < this.listHeight[i + 1])
        ) {
          return i;
        }
      }
      return 0;
    }
  },
  created() {
    fetch("/mock/goods.json")
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.code == 0) {
          this.container = response.data.container_operation_source;
          this.goods = response.data.food_spu_tags;
          this.poiInfo = response.data.poi_info;
          this.$nextTick(() => {
            this.initScroll();
            this.calculateHeight();
          });
        }
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
}
.goods .menu-wrapper {
  flex: 0 0 85px;
  background: #f4f4f4;
}
.goods .foods-wrapper {
  flex: 1;
  /* background: blue; */
}
.goods .menu-wrapper .menu-item {
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
}
.goods .menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.goods .menu-wrapper .menu-item .text .icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
.goods .foods-wrapper .container-list {
  padding: 11px 11px 0 11px;
  border-bottom: 1px solid #e4e4e4;
}
.goods .foods-wrapper .container-list img {
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}
.goods .foods-wrapper .food-list {
  padding: 11px;
}
.goods .foods-wrapper .food-list .title {
  height: 13px;
  font-size: 13px;
  background: url("./img/btn_yellow_highlighted@2x.png") no-repeat left center;
  background-size: 2px 10px;
  padding-left: 7px;
  margin-bottom: 12px;
}
.goods .foods-wrapper .food-list .food-item {
  display: flex;
  margin-bottom: 25px;
  position: relative;
}
.goods .foods-wrapper .food-list .food-item .icon {
  flex: 0 0 63px;
  background-position: center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
  height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content {
  flex: 1;
}
.goods .foods-wrapper .food-list .food-item .content .name {
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}
.goods .foods-wrapper .food-list .food-item .content .desc {
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;

  /* 超出部分显示省略号*/
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.goods .foods-wrapper .food-list .food-item .content .extra {
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled {
  margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product {
  height: 15px;
  margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price {
  font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text {
  font-size: 14px;
  color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit {
  font-size: 12px;
  color: #bfbfbf;
}
.goods .menu-wrapper .menu-item.current {
  background: white;
  font-weight: bold;
  margin-top: -1px;
}
.goods .menu-wrapper .menu-item:first-child.current {
  margin-top: 1px;
}

.goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
}

.goods .menu-wrapper .menu-item .num {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  color: white;
  background: red;
  text-align: center;
  font-size: 7px;
  line-height: 13px;
}
</style>
