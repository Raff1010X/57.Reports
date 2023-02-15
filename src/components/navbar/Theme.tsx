// Theme icon in Navbar.tsx
import IconMoon from '@/assets/icons/IconMoon';
import IconSun from '@/assets/icons/IconSun';
import { useEffect, useState } from 'react';

export default function Theme() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    function handleThemeChange() {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return (
        <>
            {theme === 'dark' && (
                <IconSun
                    width="2rem"
                    height="2rem"
                    className="link"
                    onClick={handleThemeChange}
                />
            )}

            {theme === 'light' && (
                <IconMoon
                    width="2rem"
                    height="2rem"
                    className="link"
                    onClick={handleThemeChange}
                />
            )}
        </>
    );
}
