import request from "../utils/request.js";

/**
 *
 * 获取swiper 数据
 */
export function getSwiperInfo() {
  const options = {
    url: "/banner?type=3",
    showLoading: true,
  };
  return request(options);
}
