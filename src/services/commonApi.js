import request from '@/utils/request';
import { baseUrl } from '../defaultSettings';

// 查询探索/互动话题列表
export async function queryExploreListReq(params) {
  return request(`${baseUrl}/interface/v1/js/content/get_recommend_list`, { data: params });
}
