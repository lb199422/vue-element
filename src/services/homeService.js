import request from "../utils/request.js";

/**
 *
 * 获取swiper 数据
 */
export function getSwiperInfo() {
  const options = {
    url: "/login/qr/key",
    showLoading: true,
  };
  return request(options);
}
