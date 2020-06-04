import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'
import config from '@/config'

export const getUploadUrl = (upload_name = 'product') => {
  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
  const upload_url = baseUrl + 'upload/' + upload_name
  return upload_url
}

/**
 * 获取商品分页列表
 * @param {*} param
 */
export const getProductList = (param) => {
  param.token = getToken()
  return axios.request({
    url: 'product/list',
    params: param,
    method: 'get'
  })
}

/**
 * 获取商品信息
 * @param {*} param
 */
export const getProductInfo = (param) => {
  param.token = getToken()
  return axios.request({
    url: 'product/info',
    params: param,
    method: 'get'
  })
}

/**
 * 新增商品
 * @param {*} data
 */
export const createProduct = (data) => {
  data.token = getToken()
  return axios.request({
    url: 'product/save',
    data,
    method: 'post'
  })
}

/**
 * 删除商品
 * @param {*} product_id
 */
export const removeProduct = (product_id = 0) => {
  return axios.request({
    url: 'product/delete',
    params: {
      product_id: product_id,
      token: getToken()
    },
    method: 'get'
  })
}

/**
 * 获取商品类型分页列表
 * @param {*} param
 */
export const getTypeList = (param) => {
  param.token = getToken()
  return axios.request({
    url: 'product_type/list',
    params: param,
    method: 'get'
  })
}

/**
 * 获取商品类型信息
 * @param {*} param
 */
export const getTypeInfo = (param) => {
  param.token = getToken()
  return axios.request({
    url: 'product_type/info',
    params: param,
    method: 'get'
  })
}

/**
 * 获取商品属性列表
 * @param {*} param
 */
export const getAttributeList = (param) => {
  param.token = getToken()
  return axios.request({
    url: 'attribute/list',
    params: param,
    method: 'get'
  })
}

/**
 * 获取商品属性列表
 * @param {*} param
 */
export const getExtraList = (param) => {
  param.token = getToken()
  return axios.request({
    url: 'attribute/extralist',
    params: param,
    method: 'get'
  })
}

/**
 * 新增商品属性
 * @param {*} data
 */
export const createAttribute = (data) => {
  data.token = getToken()
  return axios.request({
    url: 'attribute/save',
    data,
    method: 'post'
  })
}

/**
 * 更新商品属性
 * @param {*} data
 */
export const updateAttribute = (data) => {
  data.token = getToken()
  return axios.request({
    url: 'attribute/update',
    data,
    method: 'post'
  })
}

/**
 * 删除商品属性信息
 * @param {*} param
 */
export const deleteAttribute = (attr_id) => {
  return axios.request({
    url: 'attribute/del',
    params: {
      attr_id: attr_id,
      token: getToken()
    },
    method: 'get'
  })
}

/**
 * 获取商品属性信息
 * @param {*} param
 */
export const getAttributeInfo = (param) => {
  param.token = getToken()
  return axios.request({
    url: 'attribute/info',
    params: param,
    method: 'get'
  })
}
