/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { ReactElement, ReactNode } from 'react'
import { RouterContextProvider, createRouter } from '@tanstack/react-router'
import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  screen,
} from '@testing-library/react'
import type { RenderOptions, RenderHookOptions } from '@testing-library/react'
import { vi } from 'vitest'
import { routeTree } from '#/routeTree.gen'

/**
 * Router
 */

const router = createRouter({
    routeTree
})

/**
 * Render with Router
 */

const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, {
    wrapper: (props: { children: ReactNode }) => (
      <RouterContextProvider router={router}>
        {props.children}
      </RouterContextProvider>
    ),
    ...options,
  })

const renderHook = <T,>(
  callback: () => T,
  options?: Omit<RenderHookOptions<T>, 'wrapper'>
) => rtlRenderHook(callback, {
    wrapper: (props: { children: ReactNode }) => (
      <RouterContextProvider router={router}>
        {props.children}
      </RouterContextProvider>
    ),
    ...options,
  })

const mockFn = vi.fn()

export { render, renderHook, mockFn, screen }
export type { ReactNode }