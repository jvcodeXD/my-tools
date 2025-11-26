'use client';

import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useThemeStore } from '@/store/themeStore';
import { useMemo } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: mode } = useThemeStore();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#2563eb' : '#60a5fa', // Azul más suave en oscuro
            light: '#3b82f6',
            dark: '#1d4ed8',
          },
          ...(mode === 'light'
            ? {
                // Tema claro - Limpio y moderno
                background: {
                  default: '#f8fafc',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#0f172a',
                  secondary: '#475569',
                },
                divider: '#e2e8f0',
              }
            : {
                // Tema oscuro - Estilo Claude
                background: {
                  default: '#0d0d0d',      // Negro profundo
                  paper: '#1a1a1a',        // Gris muy oscuro
                },
                text: {
                  primary: '#ececec',      // Blanco suave
                  secondary: '#8e8e8e',    // Gris medio
                },
                divider: '#2d2d2d',        // Divisor sutil
                action: {
                  hover: 'rgba(255, 255, 255, 0.05)',
                  selected: 'rgba(255, 255, 255, 0.08)',
                },
              }),
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' 
                  ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
                  : '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none', // Quitar gradientes de MUI por defecto
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none', // Sin mayúsculas automáticas
                fontWeight: 500,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}