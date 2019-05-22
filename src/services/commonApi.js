import request from '@/utils/request';
import { baseUrl } from '../defaultSettings';

// 查询探索/互动话题列表
export async function queryExploreListReq(params) {
  return request(`${baseUrl}/interface/v1/js/content/get_recommend_list`, { data: params });
}

// 探索/互动话题增删改
export async function articleActionReq(params) {
  return request(`${baseUrl}/interface/v1/js/content/commit_recommend_content`, {
    method: 'POST',
    body: params,
  });
}
