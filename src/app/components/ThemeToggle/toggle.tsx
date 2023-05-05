'use client';

import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import cookies from 'js-cookie';

export default function ThemeToggle () {

  function setTheme(theme: 'dark' | 'light') {
    setIsDarkTheme(theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    cookies.set('theme', theme);
  }

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setTheme((cookies.get('theme') || 'light') as 'light' | 'dark');
  });

  return (
    <>
      <IconButton
        aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
        onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
      >
        {isDarkTheme ? (
          <LightModeIcon htmlColor='rgba(255, 255, 255, .6)' />
        ) : (
          <DarkModeIcon />
        )}
      </IconButton>
    </>
  )
}