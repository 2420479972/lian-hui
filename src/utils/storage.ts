/**
 * 本地存储工具类
 * 提供localStorage和sessionStorage的统一操作接口
 */

// localStorage 操作类
export class LocalStorage {
  /**
   * 设置localStorage项
   * @param key 键名
   * @param value 值（会自动转为JSON字符串）
   */
  static setItem(key: string, value: any): void {
    if (value === undefined) {
      return;
    }
    localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  }

  /**
   * 获取localStorage项
   * @param key 键名
   * @returns 存储的值
   */
  static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * 获取并解析JSON格式的localStorage项
   * @param key 键名
   * @returns 解析后的对象，解析失败返回null
   */
  static getJSON<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (e) {
        console.error(`解析localStorage项 ${key} 失败:`, e);
        return null;
      }
    }
    return null;
  }

  /**
   * 移除localStorage项
   * @param key 键名
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * 清除所有localStorage项
   */
  static clear(): void {
    localStorage.clear();
  }
}

// sessionStorage 操作类
export class SessionStorage {
  /**
   * 设置sessionStorage项
   * @param key 键名
   * @param value 值（会自动转为JSON字符串）
   */
  static setItem(key: string, value: any): void {
    if (value === undefined) {
      return;
    }
    sessionStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  }

  /**
   * 获取sessionStorage项
   * @param key 键名
   * @returns 存储的值
   */
  static getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  /**
   * 获取并解析JSON格式的sessionStorage项
   * @param key 键名
   * @returns 解析后的对象，解析失败返回null
   */
  static getJSON<T>(key: string): T | null {
    const value = sessionStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (e) {
        console.error(`解析sessionStorage项 ${key} 失败:`, e);
        return null;
      }
    }
    return null;
  }

  /**
   * 移除sessionStorage项
   * @param key 键名
   */
  static removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * 清除所有sessionStorage项
   */
  static clear(): void {
    sessionStorage.clear();
  }
} 