import request from '@/utils/request';
import { baseUrl } from '../defaultSettings';

// 查询探索/互动话题列表
export async function queryExploreListReq(params) {
  return request(`${baseUrl}/interface/v1/js/content/get_recommend_list`, { data: params });
}

// 查看文章内容
export async function queryExploreDetailReq(params) {
  return request(`${baseUrl}/interface/v1/js/content/get_recommend_detail`, { data: params });
}

// 探索/互动话题增删改
export async function articleActionReq(params) {
  return request(`${baseUrl}/interface/v1/js/content/commit_recommend_content`, {
    method: 'POST',
    body: params,
  });
}

// 标签弹出框
export async function queryModalLabelReq(params) {
  return request(`${baseUrl}/interface/v1/js/label/label_pop_list`, { data: params });
}
