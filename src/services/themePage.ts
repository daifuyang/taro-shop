import {request} from '@/utils/request'

export const getPage = (id) => {
  return request(`/api/v1/lowcode/app/theme_page/${id}`)
}
