/**
 * 防抖
 * @param fn
 * @param delay 默认 300ms
 */
export function debounce(fn: (...args: any[]) => any, delay: number = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
