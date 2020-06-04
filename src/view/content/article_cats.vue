<style lang="less">
  @import './list.less';
</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">文章分类</p>
          <Table :columns="columns" :data="list.data">
            <template slot-scope="{ row }" slot="category_name">
              <strong>{{ row.category_name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
          </Table>
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
import { getCategoryList } from '@/api/content'
export default {
  name: 'category_list',
  data () {
    return {
      columns: [{
        title: 'ID',
        key: 'category_id',
        width: 100,
        sortable: true
      },
      {
        title: '分类名称',
        key: 'category_name',
        slot: 'category_name',
        sortable: true
      },
      {
        title: '所属分类',
        key: 'category_name'
      },
      {
        title: '排序',
        key: 'sort'
      },
      {
        title: '类型',
        key: 'type'
      },
      {
        title: '创建时间',
        key: 'create_time',
        sortable: true
      }, {
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
      getCategoryList(param).then(res => {
        const data = res.data
        if (data.code == 0) {
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
    show (index) {
      that.$Message.info('开发中...')
    },
    remove (index) {
      this.$Modal.confirm({
        title: '是否删除当前分类',
        onOk: () => {
          this.list.data.splice(index, 1)
        }
      })
    }
  }
}
</script>

<style>
</style>
