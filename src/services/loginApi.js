// import { stringify } from 'qs';
import request from '@/utils/request';
import { baseUrl } from '../defaultSettings';

// 获取验证码
export async function getCaptchaReq(params) {
  return request(`${baseUrl}/interface/v1/user/auth/sendsms?params=${JSON.stringify(params)}`);
}

// 登录
export async function loginReq(params) {
  return request(`${baseUrl}/interface/v1/js/user/auth/userlogin`, { data: params });
}

// // 搜索 APP，文章，互动话题，X友分享
// export async function searchReq(params) {
//   return request(`${baseUrl}/interface/v1/app/label/search_list`, { data: params });
// }

// // 删除历史搜索
// export async function deleteHistorySearchReq() {
//   return request(`${baseUrl}/interface/v1/app/label/delete_his_search`, {
//     method: 'POST',
//   });
// }
