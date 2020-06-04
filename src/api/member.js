import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

export const getUserList = (param) => {
  return axios.request({
    url: 'member/list',
    params: {
      page: param.page,
      token: getToken()
    },
    method: 'get'
  })
}
