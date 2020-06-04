<style lang="less">
  @import './profile.less';
</style>
<template>
  <div>
    <Row>
      <Col span="10">
        <Card>
          <p slot="title">个人信息</p>
          <List border>
            <ListItem>
              <ListItemMeta title="用户名" :description="adminInfo.username" />
            </ListItem>
            <ListItem>
              <ListItemMeta title="昵称/别名" :description="adminInfo.nickname" />
            </ListItem>
            <ListItem>
              <ListItemMeta title="姓名" :description="adminInfo.name" />
            </ListItem>
            <ListItem>
              <ListItemMeta title="手机号" :description="adminInfo.mobile" />
            </ListItem>
            <ListItem>
              <ListItemMeta title="电子邮箱" :description="adminInfo.email" />
            </ListItem>
            <ListItem>
              <ListItemMeta title="创建时间" :description="adminInfo.create_time" />
            </ListItem>
          </List>
        </Card>
      </Col>
      <Col span="14">
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'profile',
  data () {
    return {
      data: []
    }
  },
  computed: {
    adminInfo () {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
