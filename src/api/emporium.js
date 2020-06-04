import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

export const getEmporiumList = (param) => {
  return axios.request({
    url: 'emporium/list',
    params: {
      page: param.page,
      token: getToken()
    },
    method: 'get'
  })
}

export const getMerchantList = (param) => {
  return axios.request({
    url: 'merchant/list',
    params: {
      page: param.page,
      token: getToken()
    },
    method: 'get'
  })
}
