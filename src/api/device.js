import axios from '@/libs/api.request'

export const addDevice = (data) => {
  return axios.request({
    url: 'addDevice',
    data,
    method: 'post'
  })
}
