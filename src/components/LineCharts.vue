<template>
<div ref="lineContent" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const lineContent = ref<HTMLDivElement>();
const chartsInstance = ref();
const initEcharts = ()=>{
  chartsInstance.value = echarts.init(lineContent.value);
  chartsInstance.value.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['参与人数', '质押总量', '平台代币'],
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
        name: '参与人数',
        type: 'line',
        data: [1200, 1350, 1500, 1650, 1800, 1950, 2100, 2250, 2400, 2550],
        itemStyle: {
          color: '#00E5FF'
        },
        smooth: true,
        showSymbol: true,
        lineStyle: {
          width: 3
        },
        label: {
          show: true,
          position: 'top',
          color: '#FFFFFF'
        }
      },
      {
        name: '质押总量',
        type: 'line',
        data: [3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000, 5250],
        itemStyle: {
          color: '#FF6384'
        },
        smooth: true,
        showSymbol: true,
        lineStyle: {
          width: 3
        },
        label: {
          show: true,
          position: 'top',
          color: '#FFFFFF'
        }
      },
      {
        name: '平台代币',
        type: 'line',
        data: [6000, 6250, 6500, 6750, 7000, 7250, 7500, 7750, 8000, 8250],
        itemStyle: {
          color: '#4BC0C0'
        },
        smooth: true,
        showSymbol: true,
        lineStyle: {
          width: 3
        },
        label: {
          show: true,
          position: 'top',
          color: '#FFFFFF'
        }
      }
    ]
  });
}
onMounted(()=>{
  initEcharts()
})


</script>

<style lang="scss" scoped>

</style>

