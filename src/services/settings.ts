import {request} from '@/utils/request'

export const getSetting = () => {
  return request("/api/v1/lowcode/app/settings/wei")
}
