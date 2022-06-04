<template>
  <div>
    <Swiper :swiper-info-list="swiperInfo"></Swiper>
    <div>this is test</div>
  </div>
</template>

<script>
import { getSwiperInfo } from "@/services/homeService.js";
import Swiper from "@/components/Swiper";
export default {
  components: {
    Swiper,
  },
  data() {
    return {
      swiperInfo: [],
    };
  },
  methods: {
    getSwiperData() {
      getSwiperInfo()
        .then((res) => {
          this.swiperInfo = res.banners;
        })
        .catch((error) => {});
    },
  },
  created() {
    this.getSwiperData();
  },
};
</script>

<style scoped></style>
