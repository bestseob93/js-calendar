export function qs (selector, scope) {
  return (scope || document).querySelector(selector)
}

export function qsa (selector, scope) {
  return (scope || document).querySelectorAll(selector)
}

export function $on (target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture)
}

export function $delegate (target, selector, type, handler) {
  function dispatchEvent (event) {
    const targetElement = event.target
    const potentialElements = qsa(selector, target)
    const hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0

    if (hasMatch) {
      handler.call(targetElement, event)
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/Events/blur
  var useCapture = type === 'blur' || type === 'focus'

  $on(target, type, dispatchEvent, useCapture)
}

export function compareToSort (a, b) {
  if (a.period < b.period) {
    return 1
  }
  if (a.period > b.period) {
    return -1
  }

  return 0
}

/**
 * generate Random hex
 * @return {string} example: #ffffff
 */
export function generateRandomColor () {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}` // 백그라운드에 사용할 랜덤 컬러

  if (color.length < 7) {
    generateRandomColor()
  }

  return color
}

/**
 * escape html
 * @param {string} s plain html
 */
export function htmlEscape (s) {
  return (s + '').replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#039;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br />')
}
