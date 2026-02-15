(function () {
    var storageKey = 'portfolio-theme';
    var body = document.body;
    var toggleButton = document.getElementById('theme-toggle');

    if (!body || !toggleButton) {
        return;
    }

    function setIcon(isDark) {
        var icon = toggleButton.querySelector('i');
        if (!icon) {
            return;
        }
        icon.className = isDark ? 'fa fa-sun-o' : 'fa fa-moon-o';
        toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        toggleButton.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
    }

    function applyTheme(theme, save) {
        var isDark = theme === 'dark';
        body.classList.toggle('dark-mode', isDark);
        setIcon(isDark);

        if (save) {
            localStorage.setItem(storageKey, theme);
        }
    }

    var storedTheme = localStorage.getItem(storageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
        applyTheme(storedTheme, false);
    } else {
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light', false);
    }

    toggleButton.addEventListener('click', function () {
        var nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(nextTheme, true);
    });
})();
