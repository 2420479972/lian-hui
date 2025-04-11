<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const chartRef = ref(null)

onMounted(() => {
  const myChart = echarts.init(chartRef.value)

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['代币总量', '已售数量'],
      textStyle: {
        color: '#FFFFFF'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['3/20', '3/21', '3/22', '3/23', '3/24', '3/25', '3/26', '3/27', '3/28', '3/29'],
      axisLine: {
        lineStyle: {
          color: '#4B5563'
        }
      },
      axisLabel: {
        color: '#9CA3AF'
      },
      splitLine: {
        lineStyle: {
          color: '#252525'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#4B5563'
        }
      },
      axisLabel: {
        color: '#9CA3AF'
      },
      splitLine: {
        lineStyle: {
          color: '#252525'
        }
      }
    },
    series: [
      {
        name: '代币总量',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000],
        itemStyle: {
          color: '#252525'
        }
      },
      {
        name: '已售数量',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [12000, 13500, 15000, 16500, 18000, 19500, 21000, 22500, 24000, 28500],
        itemStyle: {
          color: '#00E5FF'
        }
      }
    ]
  };

  myChart.setOption(option)
})
</script>

<style lang="scss" scoped>

</style>

