<style lang="less">
  @import './list.less';
</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">会员列表</p>
          <Table :columns="columns" :data="memberList.data">
            <template slot-scope="{ row }" slot="avatar">
              <Avatar :src="row.avatar" shape="square" size="large" />
            </template>
            <template slot-scope="{ row }" slot="mobile">
              <strong>{{ row.mobile }}</strong>
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
          <Page :total="memberList.total" :page-size="memberList.per_page" show-elevator show-total @on-change="handlePage" />
        </template>
      </div>
    </Row>
  </div>
</template>

<script>
import { getUserList } from '@/api/member'
export default {
  name: 'member_list',
  data () {
    return {
      columns: [{
        title: '编号',
        key: 'user_id',
        width: 100,
        sortable: true
      },
      {
        title: '头像',
        key: 'avatar',
        slot: 'avatar',
        width: 150
      },
      {
        title: '手机号',
        key: 'mobile',
        slot: 'mobile',
        sortable: true
      },
      {
        title: '昵称',
        key: 'nickname'
      },
      {
        title: '姓名',
        key: 'name',
        sortable: true
      },
      {
        title: '性别',
        key: 'sex'
      },
      {
        title: '状态',
        key: 'status'
      },
      {
        title: '注册时间',
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
      memberList: {}
    }
  },
  mounted () {
    this.loadMemberList()
  },
  methods: {
    loadMemberList () {
      let that = this
      let param = { page: that.curr_page }
      getUserList(param).then(res => {
        const data = res.data
        if (data.code === 0) {
          that.memberList = data.result
        } else {
          that.$Message.error(result.message)
        }
      })
    },
    handlePage (p) {
      this.curr_page = p
      this.loadMemberList()
    },
    show (index) {
      let data = this.memberList.data
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${data[index].name}<br>Nickname：${data[index].nickname}<br>Mobile${data[index].mobile}`
      })
    },
    remove (index) {
      this.$Modal.confirm({
        title: '是否删除当前会员记录',
        onOk: () => {
          this.memberList.data.splice(index, 1)
        }
      })
    },
    openMedia () {
      // 想要获取一个最接近 1280x720 的相机分辨率
      let constraints = { audio: true, video: { width: 1280, height: 720 } }

      navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        this.$refs.video.srcObject = mediaStream
        this.$refs.video.play()
      }).catch((err) => {
        console.log(err.name + '：' + err.message)
      })
    }
  }
}
</script>

<style>
</style>
