'use client';

import React from 'react';
import Header from '../src/Header/Header';
import '../src/App.css'; // Importing old global CSS to keep things working during transition
import { AppProvider } from './Context';

export default function ClientLayout({ children }) {
  return (
    <AppProvider>
      <Header />
      {children}
    </AppProvider>
  );
}
