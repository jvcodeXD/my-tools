'use client';

import { Box, Typography } from '@mui/material';

interface SidebarProps {
  currentTool: string;
  onSelectTool: (toolId: string) => void;
}

export default function Sidebar({ currentTool, onSelectTool }: SidebarProps) {
  const tools = [
    {
      id: 'encryption',
      name: 'Encriptación',
      description: 'Encripta y desencripta texto'
    }
  ];

  return (
    <Box
      sx={{
        width: 280,
        minHeight: '100vh',
        bgcolor: '#1e293b',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, bgcolor: '#0f172a' }}>
        <Typography variant="h5" fontWeight="bold">
          🛠️ Mis Herramientas
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 1 }}>
          Utilidades de trabajo
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ p: 2 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            px: 2, 
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            fontWeight: 600,
            display: 'block',
            mb: 2
          }}
        >
          Herramientas
        </Typography>
        
        {tools.map((tool) => (
          <Box
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            sx={{
              p: 2,
              mb: 1,
              borderRadius: 2,
              cursor: 'pointer',
              bgcolor: currentTool === tool.id ? '#3b82f6' : 'transparent',
              '&:hover': {
                bgcolor: currentTool === tool.id ? '#2563eb' : 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
              🔐 {tool.name}
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.75rem', 
                color: currentTool === tool.id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
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
        mt: 'auto', 
        p: 2, 
        bgcolor: '#0f172a',
        textAlign: 'center'
      }}>
        <Typography variant="body2" color="rgba(255,255,255,0.5)">
          v1.0.0
        </Typography>
      </Box>
    </Box>
  );
}