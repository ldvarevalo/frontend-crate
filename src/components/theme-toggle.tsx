import { useEffect, useState, type FunctionComponent } from 'react'

/**
 * Types
 */

type ThemeMode = 'light' | 'dark' | 'auto'

/**
 * Constants
 */

const THEME_LABELS: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
}

const MODE_SEQUENCE: ThemeMode[] = ['light', 'dark', 'auto']

/**
 * Helpers
 */

const getNextMode = (current: ThemeMode): ThemeMode => {
  const index = MODE_SEQUENCE.indexOf(current)
  const nextIndex = (index + 1) % MODE_SEQUENCE.length
  return MODE_SEQUENCE[nextIndex]
}

const getInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'auto'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored
  }

  return 'auto'
}

const getResolvedTheme = (mode: ThemeMode): ThemeMode => {
  if (mode !== 'auto') {
    return mode
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const applyThemeMode = (mode: ThemeMode): void => {
  const resolved = getResolvedTheme(mode)

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', mode)
  }

  document.documentElement.style.colorScheme = resolved
}

/**
 * ThemeToggle
 */

export const ThemeToggle: FunctionComponent = () => {
  const [mode, setMode] = useState<ThemeMode>('auto')

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  useEffect(() => {
    if (mode !== 'auto') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const onChange = (): void => {
      applyThemeMode('auto')
    }

    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [mode])

  const toggleMode = (): void => {
    const nextMode = getNextMode(mode)

    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  const getLabel = (): string => {
    if (mode === 'auto') {
      return 'Theme mode: auto (system). Click to switch to light mode.'
    }
    return `Theme mode: ${mode}. Click to switch mode.`
  }

  const label = getLabel()

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {THEME_LABELS[mode]}
    </button>
  )
}
