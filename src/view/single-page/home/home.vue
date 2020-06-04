<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <strong>服务器系统信息：</strong>
          <br><br>
          <List border size="large">
            <ListItem><strong>服务器系统：</strong>{{system_info.sys_type}}</ListItem>
            <ListItem><strong>服务器时间：</strong>{{system_info.sys_time}}</ListItem>
            <ListItem><strong>PHP版本：</strong>v {{system_info.php_ver}}</ListItem>
            <ListItem><strong>MySQL版本：</strong>v {{system_info.db_ver}}</ListItem>
          </List>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartBar } from '_c/charts'
import Example from './example.vue'
import { getSystemInfo } from '@/api/common'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      },
      system_info: {
        sys_type: '',
        php_ver: '',
        db_ver: '',
        sys_time: ''
      }
    }
  },
  mounted () {
    this.getSystemInfo()
  },
  methods: {
    getSystemInfo () {
      getSystemInfo().then((res) => {
        let data = res.data
        if (data.code === 0) {
          this.system_info = data.result
        }
      })
    }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
