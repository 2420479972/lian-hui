import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * 复制文本到剪贴板的钩子函数
 * @returns 复制函数
 */
export function useCopy() {
  const { t } = useI18n()
  const isCopied = ref(false)

  /**
   * 复制文本到剪贴板
   * @param text 要复制的文本
   * @returns 是否复制成功
   */
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      isCopied.value = true
      
      // 显示复制成功提示
      // Snackbar.success(t('common.copySuccess'))
      
      // 2秒后重置状态
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
      
      return true
    } catch (error) {
      console.error('复制失败:', error)
      // Snackbar.error(t('common.copyFailed'))
      return false
    }
  }

  return {
    isCopied,
    copyToClipboard
  }
}