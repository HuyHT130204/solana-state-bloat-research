import { useCallback, useEffect, useState } from 'react'

type LanguageCode = 'en' | 'vi'

function setGoogleTranslateLanguage(targetLanguage: LanguageCode) {
  const iframe: HTMLIFrameElement | null = document.querySelector('iframe.goog-te-menu-frame')
  const select: HTMLSelectElement | null = document.querySelector('select.goog-te-combo')

  if (select) {
    select.value = targetLanguage
    const event = new Event('change')
    select.dispatchEvent(event)
    return true
  }

  if (iframe && iframe.contentWindow) {
    try {
      const innerSelect = iframe.contentWindow.document.querySelector('select.goog-te-combo') as HTMLSelectElement | null
      if (innerSelect) {
        innerSelect.value = targetLanguage
        const event = new Event('change')
        innerSelect.dispatchEvent(event)
        return true
      }
    } catch (_) {
      // cross-origin blocked; will fallback to select when available
    }
  }
  return false
}

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<LanguageCode>('en')

  // Ensure Google translate element is initialized on mount if the script already loaded
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // If the select exists but not initialized, this useEffect doesn't need to do anything
    }
  }, [])

  const applyLanguage = useCallback((code: LanguageCode) => {
    const applied = setGoogleTranslateLanguage(code)
    if (!applied) {
      // Retry a few times in case the script hasn't finished rendering
      let attempts = 0
      const id = setInterval(() => {
        attempts += 1
        if (setGoogleTranslateLanguage(code) || attempts >= 20) {
          clearInterval(id)
        }
      }, 250)
    }
  }, [])

  const handleToggle = () => {
    const next = lang === 'en' ? 'vi' : 'en'
    setLang(next)
    applyLanguage(next)
  }

  return (
    <button
      onClick={handleToggle}
      className="px-2 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label="Toggle language between English and Vietnamese"
    >
      {lang === 'en' ? 'ENG' : 'VIE'}
    </button>
  )
}


