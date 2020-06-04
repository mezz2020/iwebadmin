<style lang="less">
  @import '../../index.less';
</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">商品列表</p>
          <Table :columns="columns" :data="list.data">
            <template slot-scope="{ row }" slot="product_name">
              <strong>{{ row.product_name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="merchant_name">
              <span v-if="row.merchant">{{ row.merchant.merchant_name }}</span>
              <span v-else>-</span>
            </template>
            <template slot-scope="{ row }" slot="supplier_price">
              <i class="tbl-price">{{ row.supplier_price }}</i>
            </template>
            <template slot-scope="{ row }" slot="price">
              <i class="tbl-price">{{ row.price }}</i>
            </template>
            <template slot-scope="{ row }" slot="is_onsale">
              <Icon type="md-checkmark" size="20" v-if="row.is_onsale == 1"/>
              <Icon type="md-close" size="20" v-if="row.is_onsale == 0"/>
            </template>
            <template slot-scope="{ row }" slot="is_best">
              <Icon type="md-checkmark" size="20" v-if="row.is_best == 1"/>
              <Icon type="md-close" size="20" v-if="row.is_best == 0"/>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row.product_id)">编辑</Button>
                <Button type="error" size="small" @click="handleRemove(row.product_id, index)">删除</Button>
            </template>
          </Table>
          <br>
          <Button type="primary" size="large" @click="handleAdd()"><Icon type="md-add"></Icon> 新增商品</Button>
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
import { getProductList, removeProduct } from '@/api/product'
export default {
  name: 'emporium_list',
  data () {
    return {
      columns: [{
        title: '编号',
        key: 'product_id',
        width: 100,
        sortable: true
      },
      {
        title: '货号',
        key: 'product_sn',
        sortable: true
      },
      {
        title: '商品名称',
        slot: 'product_name',
        sortable: true
      },
      {
        title: '所属商家',
        slot: 'merchant_name',
        sortable: true
      },
      {
        title: '供货商价格',
        slot: 'supplier_price'
      },
      {
        title: '单价',
        slot: 'price'
      },
      {
        title: '是否上架',
        slot: 'is_onsale'
      },
      {
        title: '是否推荐',
        slot: 'is_best'
      },
      {
        title: '库存',
        key: 'stock'
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
      getProductList(param).then(res => {
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
    handleEdit (product_id) {
      this.$router.push({
        name: 'nav_product_edit',
        query: {
          product_id: product_id
        }
      })
    },
    handleRemove (product_id, index) {
      let that = this
      that.$Modal.confirm({
        title: '是否删除当前商品',
        onOk: () => {
          removeProduct(product_id).then((res) => {
            let data = res.data
            if (data.code === 0) {
              that.list.data.splice(index, 1)
              that.$Message.success('删除商品记录成功！')
            } else {
              that.$Message.error(data.message)
            }
          })
        }
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'nav_product_add'
      })
    }
  }
}
</script>

<style>
.tbl-price {
  color:#ed4014;
}
</style>
