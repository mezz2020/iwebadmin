<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">编号属性</p>
          <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="200">
            <FormItem label="属性名称" prop="attr_name">
              <Input v-model="formData.attr_name" placeholder="请填写属性名称"></Input>
            </FormItem>
            <FormItem label="商品类型" prop="type_id">
              <Select v-model="formData.type_id" style="width:200px">
                <Option v-for="item in product_types" :key="item.type_id" :value="item.type_id">{{ item.type_name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="属性类型" prop="attr_type">
              <RadioGroup v-model="formData.attr_type">
                <Radio label="0">唯一属性</Radio>
                <Radio label="1">单选属性</Radio>
             </RadioGroup>
            </FormItem>
            <FormItem label="排序" prop="sort">
              <Input v-model="formData.sort" placeholder="请填输入属性排序，数值越大越靠前"></Input>
            </FormItem>
            <FormItem label="属性值录入方式" prop="input_mode">
              <RadioGroup v-model="formData.input_mode" @on-change="changeInputMode">
                <Radio label="0">手工录入</Radio>
                <Radio label="1">从下面的列表中选择（一行代表一个可选值）</Radio>
                <Radio label="2">多行文本框</Radio>
             </RadioGroup>
            </FormItem>
            <FormItem label="可选值列表">
              <Input v-model="formData.attr_value" type="textarea" :disabled="valDisabled" :rows="4" />
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
import { updateAttribute, getAttributeInfo, getTypeList } from '@/api/product'
export default {
  name: 'attr_add',
  data () {
    return {
      formData: {
        attr_id: 0,
        type_id: 1,
        attr_name: '',
        attr_type: '0',
        input_mode: '0',
        attr_value: '',
        sort: 100,
        status: 0
      },
      product_types: [],
      search_list: {
        keywords: ''
      },
      valDisabled: true,
      loadType: false,
      ruleValidate: {
        attr_name: [
          { required: true, message: '属性名称不能为空', trigger: 'blur' },
          { min: 1, max: 30, message: '属性名称应为1～30长度之间！' }
        ]
      }
    }
  },
  mounted () {
    this.formData.attr_id = this.$route.query.attr_id
    this.formData.type_id = this.$route.query.type_id
    this.loadAttributeInfo()
    this.loadProductTypes()
  },
  methods: {
    handleSubmit () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          const that = this
          let attr_data = that.formData

          updateAttribute(attr_data).then((res) => {
            let data = res.data
            if (data.code === 0) {
              that.$Message.success({
                content: '更新属性成功！',
                onClose: (scres) => {
                  that.$router.push({
                    name: 'nav_attributes',
                    query: {
                      type_id: attr_data.type_id
                    }
                  })
                }
              })
            }
          })
        } else {
          this.$Message.error('填写信息不正确，请检查后再重新提交!')
        }
      })
    },
    handleReset () {
      this.$refs['formValidate'].resetFields()
    },
    loadProductTypes () {
      let that = this
      let param = { page: 1, keywords: that.search_list.keywords }
      getTypeList(param).then(res => {
        const data = res.data
        if (data.code === 0) {
          that.product_types = data.result.data
        } else {
          that.$Message.error(result.message)
        }
      })
    },
    searchProductTypes (query) {
      if (query !== '') {
        this.loadType = true
        this.search_list.keywords = query
        this.loadProductTypes()
        this.loadType = false
      } else {
        this.product_types = []
      }
    },
    querySearchTypes (query) {
      if (query === '') {
        this.search_list.keywords = ''
        this.loadProductTypes()
      }
    },
    changeInputMode (val) {
      this.valDisabled = val !== '1'
    },
    loadAttributeInfo () {
      let that = this
      let param = { attr_id: that.formData.attr_id }
      getAttributeInfo(param).then(res => {
        const data = res.data
        if (data.code === 0) {
          let attr_info = data.result
          if (attr_info) {
            attr_info.attr_type = String(attr_info.attr_type)
            attr_info.input_mode = String(attr_info.input_mode)
            that.formData = attr_info
            this.valDisabled = attr_info.input_mode !== '1'
          }
        } else {
          that.$Message.error({
            content: data.message,
            onClose: () => {
              that.$router.go(-1)
            }
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
