<template>
  <div v-if="isVisible" class="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
    <div class="glass-effect rounded-xl p-6 w-80 max-w-full">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-white">{{ $t('datepicker.title') }}</h3>
        <button @click="isVisible = false" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="grid grid-cols-7 gap-1 mb-4">
        <div v-for="day in $t('datepicker.weekdays')" :key="day" class="text-center text-sm text-gray-400">{{ day }}</div>
      </div>
      <div class="grid grid-cols-7 gap-1 mb-4">
        <div v-for="(day, index) in calendarDays" :key="index"
            :class="getDayClass(day)"
            @click="day.value && selectDate(day.date)">
          {{ day.value || '' }}
        </div>
      </div>
      <div class="flex justify-between">
        <button @click="prevMonth" class="px-3 py-1 text-sm text-white hover:text-primary">
          <i class="fas fa-chevron-left"></i> {{ $t('datepicker.prev') }}
        </button>
        <div class="text-white font-medium">{{ currentYearMonth }}</div>
        <button @click="nextMonth" class="px-3 py-1 text-sm text-white hover:text-primary">
          {{ $t('datepicker.next') }} <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <button @click="isVisible = false" class="px-4 py-2 text-sm text-white bg-darkLight rounded-md hover:bg-opacity-80">
          {{ $t('common.cancel') }}
        </button>
        <button @click="confirm" class="px-4 py-2 text-sm text-white bg-primary rounded-md hover:bg-opacity-90 !rounded-button">
          {{ $t('common.confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  show:{
    type:Boolean,
    default:false
  }
});

const emit = defineEmits(['update:modelValue', 'change','update:show']);


const isVisible = computed({
  get(){
    return props.show
  },
  set(value){
    emit('update:show',value)
  }
})

const currentDate = ref(new Date());
const selectedDate = ref<Date | null>(null);

// 根据传入的值初始化选中日期
onMounted(() => {
  updateSelectedDate();
});

// 监听modelValue变化
watch(() => props.modelValue, () => {
  updateSelectedDate();
}, { immediate: true });

// 提取更新选中日期的函数
function updateSelectedDate() {
  if (props.modelValue) {
    const [year, month, day] = props.modelValue.split('-').map(Number);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      selectedDate.value = new Date(year, month - 1, day);
      // 同时更新当前显示的月份为选中日期的月份
      currentDate.value = new Date(year, month - 1, 1);
    }
  }
}

const currentYearMonth = computed(() => {
  return `${currentDate.value.getFullYear()}年 ${currentDate.value.getMonth() + 1}月`;
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  
  // 填充月初的空白
  for (let i = 0; i < firstDay; i++) {
    days.push({ value: null, date: null });
  }
  
  // 添加当月日期
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push({ value: day, date });
  }
  
  return days;
});

function getDayClass(day: { value: number | null, date: Date | null }) {
  if (!day.value || !day.date) return 'h-8';
  
  const isToday = day.date.toDateString() === new Date().toDateString();
  const isSelected = selectedDate.value && day.date.toDateString() === selectedDate.value.toDateString();
  
  return [
    'text-center', 'py-1', 'rounded-full', 'cursor-pointer',
    isToday ? 'bg-primary/20 text-primary' : '',
    isSelected ? 'bg-primary text-white' : 'text-white hover:bg-darkLight'
  ].filter(Boolean).join(' ');
}

function selectDate(date: Date) {
  if (!date) return;
  selectedDate.value = date;
}

function prevMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  currentDate.value = newDate;
}

function nextMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  currentDate.value = newDate;
}

function formatDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function confirm() {
  if (selectedDate.value) {
    const formattedDate = formatDate(selectedDate.value);
    emit('update:modelValue', formattedDate);
    emit('change', formattedDate);
    isVisible.value = false;
  }
}
</script>

<style lang="scss" scoped>
.glass-effect {
  background: rgba(18, 18, 20, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 240, 255, 0.2);
}

.input-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
}
</style>
