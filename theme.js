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

    var topNav = document.querySelector('.top-nav');
    var menuToggleButton = document.getElementById('menu-toggle');
    var navLinks = document.getElementById('top-nav-links');

    if (topNav && menuToggleButton && navLinks) {
        function closeMobileMenu() {
            topNav.classList.remove('top-nav--open');
            menuToggleButton.setAttribute('aria-expanded', 'false');
            var icon = menuToggleButton.querySelector('i');
            if (icon) {
                icon.className = 'fa fa-bars';
            }
        }

        function toggleMobileMenu() {
            var isOpen = topNav.classList.toggle('top-nav--open');
            menuToggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            var icon = menuToggleButton.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa fa-times' : 'fa fa-bars';
            }
        }

        menuToggleButton.addEventListener('click', toggleMobileMenu);

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.matchMedia('(max-width: 900px)').matches) {
                    closeMobileMenu();
                }
            });
        });

        document.addEventListener('click', function (event) {
            if (!window.matchMedia('(max-width: 900px)').matches) {
                return;
            }

            if (!topNav.contains(event.target)) {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) {
                closeMobileMenu();
            }
        });
    }
})();
