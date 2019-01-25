export const qs = (selector, scope) => {
  return (scope || document).querySelector(selector)
}

export const qsa = (selector, scope) => {
  return (scope || document).querySelectorAll(selector)
}

export const $on = (target, type, callback, useCapture) => {
  target.addEventListener(type, callback, !!useCapture)
}

export const $delegate = (target, selector, type, handler) => {
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
