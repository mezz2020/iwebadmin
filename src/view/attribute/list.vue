<style lang="less">
  @import '../../index.less';
</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">商品属性列表</p>
          <Table :columns="columns" :data="list.data">
            <template slot-scope="{ row }" slot="attr_name">
              <strong>{{ row.attr_name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="status">
              <Icon type="md-checkmark" size="20" v-if="row.status == 1"/>
              <Icon type="md-close" size="20" v-if="row.status == 0"/>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row.attr_id)">编辑</Button>
                <Button type="error" size="small" @click="handleRemove(row.attr_id, index)">删除</Button>
            </template>
          </Table>
          <br>
          <Button type="primary" size="large" @click="handleAdd()"><Icon type="md-add"></Icon> 新增属性</Button>
        </Card>
      </Col>
    </Row>
    <Row>
      <div class="paginate">
        <template>
          <Page :total="list.total" :page-size="list.per_page" show-elevator show-total @on-change="handlePage" />
        </template>
      </div>
    </Row>
  </div>
</template>

<script>
import { getAttributeList, deleteAttribute } from '@/api/product'
export default {
  name: 'emporium_list',
  data () {
    return {
      columns: [{
        title: '编号',
        key: 'attr_id',
        width: 100,
        sortable: true
      },
      {
        title: '属性名称',
        slot: 'attr_name',
        sortable: true
      },
      {
        title: '商品类型',
        key: 'type_name'
      },
      {
        title: '输入方式',
        key: 'input_mode'
      },
      {
        title: '可选值列表',
        key: 'attr_value'
      },
      {
        title: '排序',
        key: 'sort'
      },
      {
        title: '状态',
        slot: 'status'
      },
      {
        title: '添加时间',
        key: 'create_time',
        sortable: true
      },
      {
        title: '操作',
        slot: 'action',
        width: 150,
        align: 'center'
      }],
      curr_page: 1,
      type_id: 0,
      list: {}
    }
  },
  mounted () {
    this.type_id = this.$route.query.type_id
    this.loadList()
  },
  methods: {
    loadList () {
      let that = this
      let param = { page: that.curr_page, type_id: that.type_id }
      getAttributeList(param).then(res => {
        const data = res.data
        if (data.code === 0) {
          that.list = data.result
        } else {
          that.$Message.error(result.message)
        }
      })
    },
    handlePage (p) {
      this.curr_page = p
      this.loadList()
    },
    handleEdit (attr_id) {
      this.$router.push({
        name: 'nav_attr_edit',
        query: {
          type_id: this.type_id,
          attr_id: attr_id
        }
      })
    },
    handleRemove (attr_id, index) {
      let that = this
      that.$Modal.confirm({
        title: '是否删除当前商品属性',
        onOk: () => {
          deleteAttribute(attr_id).then((res) => {
            let data = res.data
            if (data.code === 0) {
              that.list.data.splice(index, 1)
              that.$Message.success('删除商品属性成功！')
            } else {
              that.$Message.error(data.message)
            }
          })
        }
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'nav_attr_add',
        query: {
          type_id: this.type_id
        }
      })
    }
  }
}
</script>
