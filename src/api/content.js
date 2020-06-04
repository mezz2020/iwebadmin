import axios from '@/libs/api.request'
import config from '@/config'

export const getUploadUrl = () => {
  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
  const upload_url = baseUrl + 'upload/article'
  return upload_url
}

export const getArticleList = (param) => {
  return axios.request({
    url: 'article/list',
    params: {
      page: param.page
    },
    method: 'get'
  })
}

/**
 * 获取分类分页列表
 */
export const getCategoryList = (param) => {
  return axios.request({
    url: 'category/index',
    params: {
      page: param.page
    },
    method: 'get'
  })
}

/**
 * 获取指定分类下的所有子分类
 */
export const getCateExtraList = (parent_id) => {
  return axios.request({
    url: 'category/list',
    params: {
      pid: parent_id
    },
    method: 'get'
  })
}

/**
 * 新增文章
 */
export const createArticle = (data) => {
  return axios.request({
    url: 'article/save',
    data,
    method: 'post'
  })
}

/**
 * 编辑文章
 */
export const updateArticle = (data) => {
  return axios.request({
    url: 'article/update',
    data,
    method: 'post'
  })
}

/**
 * 获取文章信息
 */
export const getArticleInfo = (article_id = 0) => {
  return axios.request({
    url: 'article/info',
    params: {
      article_id
    },
    method: 'get'
  })
}

/**
 * 删除文章
 */
export const removeArticle = (article_id = 0) => {
  return axios.request({
    url: 'article/delete',
    params: {
      article_id
    },
    method: 'get'
  })
}
