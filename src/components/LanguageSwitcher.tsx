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
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Ensure Google translate element is initialized on mount if the script already loaded
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // If the select exists but not initialized, this useEffect doesn't need to do anything
    }
  }, [])

  const loadTranslateScript = useCallback(() => {
    if (scriptLoaded) return Promise.resolve()
    return new Promise<void>((resolve) => {
      const existing = document.querySelector('script[data-google-translate]') as HTMLScriptElement | null
      if (existing) {
        setScriptLoaded(true)
        resolve()
        return
      }
      ;(window as any).googleTranslateElementInit = function () {
        try {
          // @ts-ignore
          new (window as any).google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false,
            includedLanguages: 'en,vi'
          }, 'google_translate_element')
        } catch {}
        setScriptLoaded(true)
        resolve()
      }
      const s = document.createElement('script')
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      s.async = true
      s.defer = true
      s.setAttribute('data-google-translate', 'true')
      document.body.appendChild(s)
      const mount = document.getElementById('google_translate_element')
      if (!mount) {
        const div = document.createElement('div')
        div.id = 'google_translate_element'
        div.style.position = 'fixed'
        div.style.left = '-9999px'
        div.style.top = '-9999px'
        document.body.appendChild(div)
      }
    })
  }, [scriptLoaded])

  const applyLanguage = useCallback(async (code: LanguageCode) => {
    if (!scriptLoaded) {
      await loadTranslateScript()
    }
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
  }, [scriptLoaded, loadTranslateScript])

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


