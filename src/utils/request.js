import axios from 'axios';
import { getTokenAUTH } from './auth';
import { Loading, Message } from 'element-ui';

const BASEURL = '/api';

const LoadingInstance = {
  count: 0,
  target: null,
};

const request = function (options) {
  const instance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
  });

  let showLoading = options.showLoading ?? false;

  // 请求
  instance.interceptors.request.use(
    (config) => {
      console.log('this is config', config);
      // 设置token
      if (getTokenAUTH() && typeof window !== 'undefined') {
        config.headers.Authorization = getTokenAUTH();
      }
      // loading
      if (showLoading) {
        LoadingInstance.count++;
        if (LoadingInstance.count === 1) {
          LoadingInstance.target = Loading.service({
            text: '加载中...',
          });
        }
      }

      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // 响应
  instance.interceptors.response.use(
    ({ status, config, headers, data }) => {
      // 关闭loading
      closeLoading(showLoading);
      console.log('this is response', data);
      if (data.code !== 200 && data) {
        Message({
          type: 'error',
          message: data.message,
        });
      }
      return data;
    },
    (error) => {
      // 关闭loading
      closeLoading(showLoading);
      console.log(error);
      return Promise.reject(error);
    }
  );
  return instance(options);
};

/**
 * 关闭loading
 */
function closeLoading(showLoading) {
  if (LoadingInstance.count > 0 && showLoading) LoadingInstance.count--;
  if (LoadingInstance.count === 0) {
    LoadingInstance.target.close();
  }
}

/**
 *  handleError
 */

function handleError(error) {
  let message = '';
  if (error && error.response) {
    switch (error.response.status) {
      case 404:
        message = '路径不存在';
        break;
    }
  }
}
export default request;
