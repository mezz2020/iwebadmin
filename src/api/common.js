import axios from '@/libs/api.request'

export const getSystemInfo = () => {
  return axios.request({
    url: 'system/info',
    method: 'get'
  })
}
