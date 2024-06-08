/** @jest-environment jsdom */
import { expect, jest, it } from '@jest/globals'
import { listenMediaOnce, observeOnce, idle } from '../../dist/strategies.js'

// mock for window.matchMedia
const matchMediaMock = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}))

// Mock for IntersectionObserver
const observeMock = jest.fn()
const unobserveMock = jest.fn()

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: observeMock,
  unobserve: unobserveMock,
}))

// mock for requestIdleCallback
const requestIdleCallbackMock = jest.fn()

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock,
  })
  Object.defineProperty(window, 'requestIdleCallback', {
    writable: true,
    value: requestIdleCallbackMock,
  })
})

describe('listenMediaOnce', () => {
  it('should execute the callback function when the media query matches', () => {
    const callback = jest.fn()
    const mediaQueryList = matchMediaMock('(min-width: 500px)')

    mediaQueryList.matches = true // simulate a matching media query

    listenMediaOnce('(min-width: 500px)', callback)
    expect(callback).toHaveBeenCalled()
  })
})

describe('observeOnce', () => {
  it('should observe an element and execute the callback when intersecting', () => {
    const callback = jest.fn()
    const element = document.createElement('div')

    observeOnce(element, callback)
    expect(observeMock).toHaveBeenCalledWith(element)
  })
})

describe('idle', () => {
  it('should execute the callback function when the browser is idle', () => {
    const callback = jest.fn()

    idle(callback)
    expect(requestIdleCallbackMock).toHaveBeenCalledWith(callback)
  })
})
