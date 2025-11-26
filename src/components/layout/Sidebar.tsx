'use client';

import { Box, Typography, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface SidebarProps {
  currentTool: string;
  onSelectTool: (toolId: string) => void;
  open: boolean;
  onToggle: () => void;
}

export default function Sidebar({ currentTool, onSelectTool, open, onToggle }: SidebarProps) {
  const tools = [
    {
      id: 'encryption',
      name: 'Encriptación',
      description: 'Encripta y desencripta texto'
    }
  ];

  const sidebarContent = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        // Bordes redondeados solo en el lado derecho
        borderTopRightRadius: { xs: 0, md: 16 },
        borderBottomRightRadius: { xs: 0, md: 16 },
      }}
    >
      {/* Header con botón hamburguesa */}
      <Box sx={{ 
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            🛠️ Mis Herramientas
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            Utilidades de trabajo
          </Typography>
        </Box>
        <IconButton
          onClick={onToggle}
          size="small"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            px: 2, 
            color: 'text.secondary',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: 1,
            display: 'block',
            mb: 2
          }}
        >
          Herramientas
        </Typography>
        
        {tools.map((tool) => (
          <Box
            key={tool.id}
            onClick={() => {
              onSelectTool(tool.id);
              if (window.innerWidth < 900) {
                onToggle();
              }
            }}
            sx={{
              p: 2,
              mb: 1,
              borderRadius: 2,
              cursor: 'pointer',
              bgcolor: currentTool === tool.id ? 'primary.main' : 'transparent',
              color: currentTool === tool.id ? 'primary.contrastText' : 'text.primary',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: currentTool === tool.id ? 'primary.dark' : 'action.hover',
              },
            }}
          >
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
              🔐 {tool.name}
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.75rem', 
                opacity: currentTool === tool.id ? 0.9 : 0.7,
                mt: 0.5
              }}
            >
              {tool.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ 
        p: 2, 
        borderTop: 1,
        borderColor: 'divider',
        textAlign: 'center'
      }}>
        <Typography variant="caption" color="text.secondary">
          v1.0.0 • Next.js + MUI
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop */}
      <Box
        sx={{
          display: { xs: 'none', md: open ? 'block' : 'none' },
          width: 280,
          flexShrink: 0,
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile */}
      <Drawer
        anchor="left"
        open={open}
        onClose={onToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}