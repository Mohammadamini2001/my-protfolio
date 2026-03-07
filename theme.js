(function () {
    var storageKey = 'portfolio-theme';
    var body = document.body;
    var toggleButton = document.getElementById('theme-toggle');
    var menu = document.querySelector('.menu');
    var menuToggle = document.getElementById('menu-toggle');
    var menuPanel = document.getElementById('menu-panel');

    function closeMenu() {
        if (!menu || !menuToggle) {
            return;
        }
        menu.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        var icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = 'fa fa-bars';
        }
    }

    if (menu && menuToggle && menuPanel) {
        menuToggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            var icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa fa-times' : 'fa fa-bars';
            }
        });

        menuPanel.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) {
                closeMenu();
            }
        });
    }

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

    var transitionTimer;

    function applyTheme(theme, save, withTransition) {
        var isDark = theme === 'dark';

        if (withTransition) {
            body.classList.add('theme-transitioning');
            window.clearTimeout(transitionTimer);
            transitionTimer = window.setTimeout(function () {
                body.classList.remove('theme-transitioning');
            }, 420);
        }

        body.classList.toggle('dark-mode', isDark);
        setIcon(isDark);

        if (save) {
            localStorage.setItem(storageKey, theme);
        }
    }

    var storedTheme = localStorage.getItem(storageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
        applyTheme(storedTheme, false, false);
    } else {
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light', false, false);
    }

    toggleButton.addEventListener('click', function () {
        var nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(nextTheme, true, true);
    });
})();
