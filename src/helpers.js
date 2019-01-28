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
