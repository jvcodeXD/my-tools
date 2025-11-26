'use client';

import { useState } from 'react';
import { Box, IconButton, Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '@/components/layout/Sidebar';
import Encryption from '@/tools/Encryption/Encryption';
import { useThemeStore } from '@/store/themeStore';

export default function Home() {
  const [currentTool, setCurrentTool] = useState('encryption');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useThemeStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderTool = () => {
    switch (currentTool) {
      case 'encryption':
        return <Encryption />;
      default:
        return <Encryption />;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar 
        currentTool={currentTool} 
        onSelectTool={setCurrentTool}
        open={sidebarOpen}
        onToggle={toggleSidebar}
      />
      
      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden', // Importante
        height: '100vh'     // Importante
      }}>
        {/* Top Bar */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0 // No se comprime
        }}>
          {/* Botón hamburguesa (solo visible cuando sidebar está cerrado) */}
          {!sidebarOpen && (
            <IconButton
              onClick={toggleSidebar}
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {sidebarOpen && <Box />}

          {/* Toggle de tema */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: 2,
            px: 2,
            py: 0.5,
            boxShadow: 1
          }}>
            <LightModeIcon sx={{ mr: 1, color: theme === 'light' ? 'primary.main' : 'text.secondary' }} />
            <Switch 
              checked={theme === 'dark'}
              onChange={toggleTheme}
              color="primary"
              size="small"
            />
            <DarkModeIcon sx={{ ml: 1, color: theme === 'dark' ? 'primary.main' : 'text.secondary' }} />
          </Box>
        </Box>

        {/* Content Area - CON SCROLL */}
        <Box sx={{ 
          flexGrow: 1,
          overflow: 'auto', // ← ESTO ES LO IMPORTANTE
          px: { xs: 2, md: 4 }, 
          pb: 4 
        }}>
          {renderTool()}
        </Box>
      </Box>
    </Box>
  );
}