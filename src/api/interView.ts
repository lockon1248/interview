import axios from 'axios';

// 取得数据
export const apiGetList = async (): Promise<any> => {
  return axios.get(`https://dahua.metcfire.com.tw/api/CRUDTest/a`);
};

// 新增数据
export const apiAddData = async (data: any): Promise<any> => {
  return axios.post(`https://dahua.metcfire.com.tw/api/CRUDTest`, data);
};

// 编辑数据
export const apiEditData = async (data: any): Promise<any> => {
  return axios.patch(`https://dahua.metcfire.com.tw/api/CRUDTest`, data);
};

// 删除数据
export const apiDeleteData = async (id: any): Promise<any> => {
  return axios.delete(`https://dahua.metcfire.com.tw/api/CRUDTest/${id}`);
};
