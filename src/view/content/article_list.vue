<style lang="less">
  @import './list.less';
</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">文章列表</p>
          <Table :columns="columns" :data="list.data">
            <template slot-scope="{ row }" slot="title">
              <strong>{{ row.title }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row.article_id)">编辑</Button>
                <Button type="error" size="small" @click="handleRemove(row.article_id, index)">删除</Button>
            </template>
          </Table>
          <br>
          <Button type="primary" size="large" @click="handleAdd()"><Icon type="md-add"></Icon> 发布文章</Button>
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
import { getArticleList, removeArticle } from '@/api/content'
export default {
  name: 'article_list',
  data () {
    return {
      columns: [{
        title: 'ID',
        key: 'article_id',
        width: 100,
        sortable: true
      },
      {
        title: '文章标题',
        key: 'title',
        slot: 'title',
        sortable: true
      },
      {
        title: '所属分类',
        key: 'category_name'
      },
      {
        title: '作者/来源',
        key: 'author'
      },
      {
        title: '是否置顶',
        key: 'is_top'
      },
      {
        title: '是否推荐',
        key: 'is_best'
      },
      {
        title: '发布时间',
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
      getArticleList(param).then(res => {
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
      this.$router.push({
        name: 'nav_article_edit',
        query: {
          id: article_id
        }
      })
    },
    handleRemove (article_id, index) {
      let that = this
      that.$Modal.confirm({
        title: '是否删除当前文章记录',
        onOk: () => {
          removeArticle(article_id).then((res) => {
            let data = res.data
            if (data.code === 0) {
              that.list.data.splice(index, 1)
              that.$Message.success('删除文章记录成功！')
            } else {
              that.$Message.error(data.message)
            }
          })
        }
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'nav_article_add'
      })
    }
  }
}
</script>

<style>
</style>
