import {request} from '@/utils/request'

export const getTreeProducts = () => {
  return request("/api/v1/shop/app/products/tree")
}

export const getProducts = (params = {}) => {
  return request("/api/v1/shop/app/products",{
    method: 'GET',
    params
  })
}


export const showProduct = (productId) => {
  return request(`/api/v1/shop/app/products/${productId}`)
}