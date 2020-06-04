<style lang="less">
  @import '../../index.less';
</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">商品类型表</p>
          <Table :columns="columns" :data="list.data">
            <template slot-scope="{ row }" slot="type_name">
              <strong>{{ row.type_name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="status">
              <Icon type="md-checkmark" size="20" v-if="row.status == 1"/>
              <Icon type="md-close" size="20" v-if="row.status == 0"/>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" style="margin-right: 5px" @click="handleAttrs(row.type_id)">属性列表</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row.attr_id)">编辑</Button>
                <Button type="error" size="small" @click="handleRemove(row.attr_id, index)">删除</Button>
            </template>
          </Table>
          <br>
          <Button type="primary" size="large" @click="handleAdd()"><Icon type="md-add"></Icon> 新增类型</Button>
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
import { getTypeList } from '@/api/product'
export default {
  name: 'product_type',
  data () {
    return {
      columns: [{
        title: '编号',
        key: 'type_id',
        width: 100,
        sortable: true
      },
      {
        title: '商品类型名称',
        slot: 'type_name',
        sortable: true
      },
      {
        title: '属性数',
        key: 'attr_count'
      },
      {
        title: '状态',
        slot: 'status'
      },
      {
        title: '操作',
        slot: 'action',
        width: 220,
        align: 'center'
      }],
      curr_page: 1,
      list: {}
    }
  },
  mounted () {
    this.loadList()
  },
  methods: {
    loadList () {
      let that = this
      let param = { page: that.curr_page }
      getTypeList(param).then(res => {
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
    handleEdit (item_id) {
    },
    handleRemove (item_id, index) {
    },
    handleAttrs (type_id = 0) {
      this.$router.push({
        name: 'nav_attributes',
        query: {
          type_id: type_id
        }
      })
    },
    handleAdd () {
    }
  }
}
</script>
