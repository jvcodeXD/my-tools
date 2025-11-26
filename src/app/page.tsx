'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/layout/Sidebar';
import Encryption from '@/tools/Encryption/Encryption';

export default function Home() {
  const [currentTool, setCurrentTool] = useState('encryption');

  const renderTool = () => {
    switch (currentTool) {
      case 'encryption':
        return <Encryption />;
      default:
        return <Encryption />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar currentTool={currentTool} onSelectTool={setCurrentTool} />
      
      <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f8fafc', minHeight: '100vh' }}>
        {renderTool()}
      </Box>
    </Box>
  );
}