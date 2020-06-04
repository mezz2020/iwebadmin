<style lang="less">
  @import './style.less';
</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">添加商品</p>
          <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="200">
            <Tabs value="goods_base">
              <TabPane label="基本信息" name="goods_base">
                <FormItem label="商品名称" prop="product_name">
                    <Input v-model="formData.product_name" placeholder="请填写商品名称"></Input>
                </FormItem>
                <FormItem label="商品货号" prop="product_sn">
                    <Input v-model="formData.product_sn" placeholder="请填写商品货号，不填写则由系统自动生成"></Input>
                </FormItem>
                <FormItem label="所属商家" prop="category_id">
                  <Row>
                    <Col span="6">
                      <Select placeholder="选择商品分类" v-for="item in parentCats" :key="item.category_id" @on-change="loadSubCategories">
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
                <FormItem label="所属分类" prop="category_id">
                  <Row>
                    <Col span="6">
                      <Select placeholder="选择商品分类" v-for="item in parentCats" :key="item.category_id" @on-change="loadSubCategories">
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
                <FormItem label="供应商价格" prop="supplier_price">
                  <Input v-model="formData.supplier_price" placeholder="请填写商品的供应商价格">
                    <span slot="prepend"> ¥ </span>
                  </Input>
                </FormItem>
                <FormItem label="销售价格" prop="price">
                  <Input v-model="formData.price" placeholder="请填写商品的销售价格">
                    <span slot="prepend"> ¥ </span>
                  </Input>
                </FormItem>
                <FormItem label="市场价格" prop="market_price">
                  <Input v-model="formData.market_price" placeholder="请填写商品的市场参考价格">
                    <span slot="prepend"> ¥ </span>
                  </Input>
                </FormItem>
                <FormItem label="商品赠送积分" prop="give_integral">
                    <Input v-model="formData.give_integral" placeholder="购买止商品赠送会员积分数，0 表示不赠送"></Input>
                </FormItem>
                <FormItem label="库存" prop="stock">
                    <Input v-model="formData.stock" placeholder="当前商品库存数量，0则表示不限数量"></Input>
                </FormItem>
                <FormItem>
                  <Checkbox label="是否上架" v-model="formData.onsale">是否上架</Checkbox>
                  <Checkbox label="是否推荐" v-model="formData.best">是否推荐</Checkbox>
                </FormItem>
                <FormItem label="商品描述" prop="description">
                  <Input v-model="formData.description" type="textarea" :autosize="{minRows: 6,maxRows: 10}" placeholder="请填写商品详细描述信息..."></Input>
                </FormItem>
              </TabPane>
              <TabPane label="属性规格" name="goods_attr">
                <FormItem label="商品类型" prop="type_id">
                  <Select placeholder="请选择商品类型" v-model="formData.type_id" @on-change="handleProductType">
                    <Option v-for="item in product_types" :key="item.type_id" :value="item.type_id" >{{ item.type_name }}</Option>
                  </Select>
                </FormItem>
                <FormItem v-for="(item,index) in attributes" :key="item.attr_id" :label="item.attr_name">
                  <div v-for="(selitem, selidx) in attr_inputs[index].attr_values" :key="selidx">
                    <Row>
                      <Col span="6">
                        <div v-if="item.input_mode == 1">
                          <Select v-model="attr_inputs[index].attr_values[selidx].value" style="margin-bottom:5px;">
                            <Option v-for="(subitem, subidx) in item.attr_value" :key="subidx" :value="subitem" >{{subitem}}</Option>
                          </Select>
                        </div>
                        <div v-else>
                          <Input v-model="attr_inputs[index].attr_values[selidx].value" style="margin-bottom:5px;"></Input>
                        </div>
                      </Col>
                      <Col span="6" offset="1">
                        <div v-if="item.attr_type == 1">
                          属性价格：<Input v-model="attr_inputs[index].attr_values[selidx].price" prefix="logo-yen" style="width: auto" placeholder="请填写商品属性价格"></Input>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="6">
                        <div v-if="item.attr_type == 1">
                          <Upload :action="uploadUrl.attribute" name="upload_pic" :onSuccess="handleAttrUpload" :data="{attr_id: item.attr_id, attr_index: selidx}">
                            <Button icon="ios-cloud-upload-outline">上传属性图片</Button>
                          </Upload>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Button v-if="item.attr_type == 1" type="dashed" shape="circle" icon="md-add" @click="handAddElement(item.attr_id)" style="margin-right:5px;">添加</Button>
                    <Button v-if="item.attr_type == 1" type="dashed" shape="circle" icon="md-remove" @click="handRemoveElement($event,item.attr_id)">移除</Button>
                  </div>
                </FormItem>
              </TabPane>
              <TabPane label="商品相册" name="goods_img">
                <template>
                  <div class="file-upload-list" v-for="item in product_imgs.uploadList" :key="item.id">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="file-upload-list-cover">
                          <Icon type="md-aperture" @click.native="handleSetDefault(item)" size="36" title="设为默认主图"></Icon>
                          <Icon type="ios-eye-outline" @click.native="handleView(item.url)" size="42" title="查看大图"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item)" size="36" title="移除此图片"></Icon>
                      </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                  </div>
                  <Upload
                      ref="upload"
                      :show-upload-list="false"
                      :default-file-list="product_imgs.defaultList"
                      :on-success="handleSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="handleBeforeUpload"
                      multiple
                      type="drag"
                      :action="uploadUrl.product"
                      name="upload_pic"
                      style="display: inline-block;width:58px;">
                      <div style="width: 58px;height:58px;line-height: 58px;">
                          <Icon type="ios-camera" size="20"></Icon>
                      </div>
                  </Upload>
                  <Modal title="查看图片" v-model="product_imgs.visible">
                      <img :src="product_imgs.showImg" v-if="product_imgs.visible" style="width: 100%">
                  </Modal>
                </template>
              </TabPane>
            </Tabs>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">确认添加</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重&nbsp;&nbsp;置</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { createProduct, getTypeList, getExtraList, getUploadUrl } from '@/api/product'
export default {
  name: 'product_add',
  data () {
    return {
      formData: {
        product_name: '',
        product_sn: '',
        category_id: 0,
        type_id: 0,
        merchant_id: 0,
        supplier_price: '',
        market_price: '',
        price: '',
        give_integral: 0,
        stock: 0,
        onsale: false,
        best: false,
        picture: '',
        description: ''
      },
      product_imgs: {
        visible: false, // 是否显示大图
        showImg: '', // 大图地址
        uploadList: [], // 上传图片列表
        defaultList: [], // 默认图片列表
        default_index: 0 // 商品默认显示图片索引
      },
      uploadUrl: { // 图片上传地址
        product: '',
        attribute: ''
      },
      parentCats: [],
      childCats: [],
      product_types: [], // 商品类型列表
      attributes: [], // 商品类型所有属性列表
      attr_inputs: [], // 商品属性值
      ruleValidate: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 3, max: 30, message: '标题长度应为3～30长度之间！' }
        ],
        author: [
          { min: 1, max: 20, message: '文章作者/来源长度应为1~20长度之间！', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initUploadUrl()
    this.loadProductTypes()
    this.product_imgs.uploadList = this.$refs.upload.fileList
  },
  methods: {
    handleSubmit () {
      const that = this
      let data = that.formData
      data.is_best = data.best ? 1 : 0
      data.is_onsale = data.onsale ? 1 : 0

      // 处理上传的商品相册图片
      data.product_pics = []
      let upload_pics = that.product_imgs.uploadList
      if (upload_pics) {
        upload_pics.forEach((val, idx) => {
          let default_pic = idx === that.product_imgs.default_index ? 1 : 0
          data.product_pics.push({ file_name: val.name, url: val.url, is_default: default_pic })
        })
      }

      // 处理商品属性
      data.product_attrs = this.attr_inputs

      createProduct(data).then((res) => {
        let data = res.data
        if (data.code === 0) {
          that.$Message.success({
            content: '添加商品成功！',
            onClose: (scres) => {
              that.$router.push({
                name: 'nav_product_list'
              })
            }
          })
        } else {
          that.$Message.error(data.message)
        }
      })
    },
    handleReset () {
      this.$refs['formValidate'].resetFields()
    },
    initUploadUrl () {
      this.uploadUrl.product = getUploadUrl('product')
      this.uploadUrl.attribute = getUploadUrl('attribute')
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '上传文件限制',
        desc: '文件 ' + file.name + ' 超出上传限制, 最大上传为2MB.'
      })
    },
    handleBeforeUpload () {
      const check = this.product_imgs.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传5张图片.'
        })
      }
      return check
    },
    handleSuccess (response, file, fileList) {
      const that = this
      if (response.code === 0) {
        let data = response.result
        file.url = data.url
        file.name = data.file_name
      } else {
        that.$Message.error(response.message)
      }
    },
    handleView (url) {
      this.product_imgs.showImg = url
      this.product_imgs.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSetDefault (file) {
      const fileList = this.$refs.upload.fileList
      let idx = fileList.indexOf(file)
      this.product_imgs.default_index = idx
      this.$Message.success('已将第' + (idx + 1) + '张图片设为产品封面图')
    },
    loadProductTypes () {
      let that = this
      let param = { page: 1 }
      getTypeList(param).then(res => {
        const data = res.data
        if (data.code === 0) {
          that.product_types = data.result.data
        } else {
          that.$Message.error(result.message)
        }
      })
    },
    handleProductType (val) {
      let that = this
      let param = { type_id: val }
      getExtraList(param).then(res => {
        const data = res.data
        if (data.code === 0) {
          let attr_list = data.result
          that.attr_inputs = []
          attr_list.map((attr, idx) => {
            that.attr_inputs.push({ attr_id: attr.attr_id, attr_values: [{ value: '', price: 0.00, attr_img: '' }] })
          })
          that.attributes = attr_list
        } else {
          that.$Message.error(result.message)
        }
      })
    },
    handAddElement (attr_id) {
      this.attr_inputs.map((val, idx) => {
        if (val.attr_id === attr_id) {
          val.attr_values.push({ value: '', price: 0.00, attr_img: '' })
        }
      })
    },
    handRemoveElement (attr_id) {
      this.attr_inputs.map((val, idx) => {
        if (val.attr_id === attr_id) {
          if (val.attr_values.length > 1) {
            val.attr_values.pop()
          }
        }
      })
    },
    handleAttrUpload (response) {
      if (response.code === 0) {
        let attr_img = response.result.url
        let extra_data = response.extra

        this.attr_inputs.map((val, idx) => {
          if (val.attr_id == extra_data.attr_id) {
            let attr_index = Number(extra_data.attr_index)
            val.attr_values[attr_index].attr_img = attr_img
          }
        })
      }
    }
  }
}
</script>
