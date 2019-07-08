import request from '@/utils/request';
import { baseUrl } from '../defaultSettings';

// 搜索app列表
export async function queryModalAppSearchReq(params) {
  return request(`${baseUrl}/interface/v1/js/app/get_app_list`, { data: params });
}
