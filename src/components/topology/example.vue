<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '线路流量利用率',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {
            color: '#fff'
          } },
          data: [80, 90, 60, 90, 60, 90, 60, 70]
        },
        {
          name: '端口流量利用率',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {
            color: '#fff'
          } },
          data: [90, 60, 80, 90, 60, 90, 60, 70]
        },
        {
          name: '端口使用率',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {
            color: '#fff'
          } },
          data: [60, 80, 90, 90, 60, 90, 60, 70]
        },
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
