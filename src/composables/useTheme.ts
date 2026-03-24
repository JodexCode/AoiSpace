import { reactive, watch, computed } from 'vue'
import { lightTheme, darkTheme } from '../config'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'blog-theme'

const state = reactive<{ mode: ThemeMode; themeVars: typeof lightTheme }>({
  mode: (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'light',
  themeVars: lightTheme
})

function applyTheme() {
  const theme = state.mode === 'light' ? lightTheme : darkTheme
  state.themeVars = theme
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
  localStorage.setItem(STORAGE_KEY, state.mode)
}

export function useTheme() {
  function toggleTheme() {
    state.mode = state.mode === 'light' ? 'dark' : 'light'
    applyTheme()
  }

  function setTheme(mode: ThemeMode) {
    state.mode = mode
    applyTheme()
  }

  watch(
    () => state.mode,
    () => applyTheme(),
    { immediate: true }
  )

  const mode = computed(() => state.mode)

  return {
    mode,
    themeVars: state.themeVars,
    toggleTheme,
    setTheme
  }
}