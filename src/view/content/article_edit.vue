<style lang="less">
  @import './list.less';
</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">发布文章</p>
          <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="200">
            <FormItem label="文章标题" prop="title">
                <Input v-model="formData.title" placeholder="请填写文字标题"></Input>
            </FormItem>
            <FormItem label="所属分类" prop="category_id">
              <Row>
                <Col span="6">
                  <Select placeholder="选择文章分类" v-for="item in parentCats" :key="item.category_id" @on-change="loadSubCategories">
                    <Option :value="item.category_id">{{ item.category_name }}</Option>
                  </Select>
                </Col>
                <Col span="6">
                  <Select v-model="formData.category_id" placeholder="选择文章分类" v-for="item in childCats" :key="item.category_id">
                    <Option :value="item.category_id">{{ item.category_name }}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="封面图片" prop="picture">
              <template>
                <Upload
                    multiple
                    type="drag"
                    :action="uploadUrl" name="article_pic" :onSuccess="uploadSuccess">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或拖拽图片到此处上传</p>
                    </div>
                </Upload>
              </template>
            </FormItem>
            <FormItem label="作者/来源" prop="author">
                <Input v-model="formData.author" placeholder="请填写文章作者或来源"></Input>
            </FormItem>
            <FormItem>
              <Checkbox label="置顶" v-model="formData.top">置顶</Checkbox>
              <Checkbox label="推荐" v-model="formData.best">推荐</Checkbox>
            </FormItem>
            <FormItem label="文章内容" prop="content">
              <Input v-model="formData.content" type="textarea" :autosize="{minRows: 6,maxRows: 10}" placeholder="请填写文章内容..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">确认修改</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重&nbsp;&nbsp;置</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getCateExtraList, getArticleInfo, updateArticle, getUploadUrl } from '@/api/content'
export default {
  name: 'article_list',
  data () {
    return {
      formData: {
        article_id: 0,
        title: '',
        author: '',
        category_id: 0,
        top: false,
        best: false,
        picture: '',
        content: ''
      },
      uploadUrl: '',
      parentCats: [],
      childCats: [],
      ruleValidate: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 3, max: 30, message: '标题长度应为3～30长度之间！' }
        ],
        author: [
          { min: 1, max: 20, message: '作者/来源长度应为1~20长度之间！' }
        ]
      }
    }
  },
  mounted () {
    this.uploadUrl = getUploadUrl()
    this.loadCategories()

    let article_id = this.$route.query.id
    this.loadArticleInfo(article_id)
  },
  methods: {
    loadCategories (parent_id = 0, ltype = 'parent') {
      let that = this
      getCateExtraList(parent_id).then((res) => {
        let data = res.data
        if (ltype === 'child') {
          that.childCats = data.result
        } else {
          that.parentCats = data.result
        }
      })
    },
    loadSubCategories (parent_id) {
      this.loadCategories(parent_id, 'child')
    },
    loadArticleInfo (article_id = 0) {
      const that = this
      getArticleInfo(article_id).then((res) => {
        let data = res.data
        if (data.code === 0) {
          let article_info = data.result
          article_info.top = article_info.is_top === 1
          article_info.best = article_info.is_best === 1
          that.formData = article_info
        } else {
          that.$Message.error(data.message)
        }
      })
    },
    uploadSuccess (response, file, fileList) {
    },
    handleSubmit () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          const that = this
          let data = that.formData
          data.is_best = data.best ? 1 : 0
          data.is_top = data.top ? 1 : 0

          updateArticle(data).then((res) => {
            let data = res.data
            if (data.code === 0) {
              that.$Message.success({
                content: '修改文章成功！',
                onClose: (scres) => {
                  that.$router.push({
                    name: 'nav_article_list'
                  })
                }
              })
            }
          })
        } else {
          this.$Message.error('填写信息不正确，请检查后再重新提交!')
        }
      })
    }
  }
}
</script>

<style>
</style>
