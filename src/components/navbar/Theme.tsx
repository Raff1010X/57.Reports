// Theme icon in Navbar.tsx
import IconMoon from '@/assets/icons/IconMoon';
import IconSun from '@/assets/icons/IconSun';
import { useEffect, useState } from 'react';

interface Theme {
    handleClick: () => void;
}

export default function Theme(props: Theme) {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined' && theme === '') {
            let localStorageTheme = localStorage.getItem('report-theme');
            if (localStorageTheme === null) localStorageTheme = 'light';
            setTheme(localStorageTheme)
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && theme !== '') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('report-theme', theme);
        }
    }, [theme]);

    function handleThemeChange() {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
        props.handleClick();
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
