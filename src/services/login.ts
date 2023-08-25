import {request} from '@/utils/request'

export const login = (params = {}) => {
  return request("/api/v1/wechat/login",{
    method: 'get',
    params
  })
}
