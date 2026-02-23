// i18n client-side engine
// Reads translations from window.__SENSHIN_I18N__ and applies to DOM via data-i18n attributes

(function () {
    const STORAGE_KEY = "senshin_lang";
    const DEFAULT_LANG = "es";

    function getLang() {
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    }

    function setLang(lang) {
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
        applyTranslations(lang);
        updateSwitcher(lang);
    }

    function applyTranslations(lang) {
        const t = window.__SENSHIN_I18N__?.[lang];
        if (!t) return;

        // Apply text translations
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (t[key] !== undefined) {
                el.textContent = t[key];
            }
        });

        // Apply placeholder translations
        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (t[key] !== undefined) {
                el.placeholder = t[key];
            }
        });

        // Apply aria-label translations
        document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
            const key = el.getAttribute("data-i18n-aria");
            if (t[key] !== undefined) {
                el.setAttribute("aria-label", t[key]);
            }
        });
    }

    function updateSwitcher(lang) {
        document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
            const btnLang = btn.getAttribute("data-lang-btn");
            btn.classList.toggle("lang-active", btnLang === lang);
        });
    }

    // Initialize on DOMContentLoaded
    document.addEventListener("DOMContentLoaded", () => {
        const lang = getLang();
        document.documentElement.lang = lang;
        applyTranslations(lang);
        updateSwitcher(lang);

        // Bind switcher buttons
        document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const newLang = btn.getAttribute("data-lang-btn");
                setLang(newLang);
            });
        });
    });

    // Expose setLang globally
    window.__senshinSetLang = setLang;
})();
