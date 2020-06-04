<style lang="less">
  @import './list.less';
</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">商家列表</p>
          <Table :columns="columns" :data="list.data">
            <template slot-scope="{ row }" slot="merchant_name">
              <strong>{{ row.merchant_name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="emporium">
              {{ row.emporium.store_name }}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row.store_id)">编辑</Button>
                <Button type="error" size="small" @click="handleRemove(row.store_id, index)">删除</Button>
            </template>
          </Table>
          <br>
          <Button type="primary" size="large" @click="handleAdd()"><Icon type="md-add"></Icon> 新增商家</Button>
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
import { getMerchantList } from '@/api/emporium'
export default {
  name: 'merchant_list',
  data () {
    return {
      columns: [{
        title: 'ID',
        key: 'merchant_id',
        width: 100,
        sortable: true
      },
      {
        title: '商家名称',
        key: 'merchant_name',
        slot: 'merchant_name',
        sortable: true
      },
      {
        title: '帐号',
        key: 'username'
      },
      {
        title: '所属商场',
        slot: 'emporium'
      },
      {
        title: '联系人',
        key: 'contacts'
      },
      {
        title: '联系电话',
        key: 'telephone'
      },
      {
        title: '排序',
        key: 'sort',
        sortable: true
      },
      {
        title: '状态',
        key: 'status'
      },
      {
        title: '入驻时间',
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
      getMerchantList(param).then(res => {
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
    handleEdit (article_id) {
    },
    handleRemove (article_id, index) {
      let that = this
      that.$Modal.confirm({
        title: '是否删除当前商家记录',
        onOk: () => {
          removeArticle(article_id).then((res) => {
            let data = res.data
            if (data.code === 0) {
              that.list.data.splice(index, 1)
              that.$Message.success('删除商家记录成功！')
            } else {
              that.$Message.error(data.message)
            }
          })
        }
      })
    },
    handleAdd () {
    }
  }
}
</script>

<style>
</style>
