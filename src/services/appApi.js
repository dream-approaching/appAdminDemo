import request from '@/utils/request';
import { baseUrl } from '../defaultSettings';

// modal搜索app
export async function queryModalAppSearchReq(params) {
  return request(`${baseUrl}/interface/v1/js/content/get_recommend_list`, { data: params });
}
