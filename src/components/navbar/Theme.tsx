// Theme icon in Navbar.tsx
"use client";

import IconMoon from '../../assets/icons/IconMoon';
import IconSun from '../../assets/icons/IconSun';
import { useEffect } from 'react';
import { useTheme } from "next-themes";

interface Theme {
    handleClick: () => void;
}

export default function Theme(props: Theme) {
    const { theme, setTheme } = useTheme()

    useEffect(() => {
    if (typeof window !== 'undefined' && theme === '') {
        let localStorageTheme = localStorage.getItem('report-theme');
        if (localStorageTheme === null) localStorageTheme = 'light';
        setTheme(localStorageTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && theme !== '') {
            document.documentElement.setAttribute('data-theme', theme as string);
            localStorage.setItem('report-theme', theme as string);
        }
    }, [theme]);


    const Icon = theme === 'light'
        ?
        <IconMoon
            width="2rem"
            height="2rem"
            className="link"
            onClick={handleThemeChange}
            data-testid="theme-icon"
        />
        :
        <IconSun
            width="2rem"
            height="2rem"
            className="link"
            onClick={handleThemeChange}
            data-testid="theme-icon"
        />;

    function handleThemeChange() {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
        props.handleClick();
    }

    return Icon;
}
