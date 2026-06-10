'use client';

import React from 'react';
import Header from '../src/Header/Header';
import { AppProvider } from './Context';

export default function ClientLayout({ children }) {
  return (
    <AppProvider>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen focus:outline-none">
        {children}
      </main>
    </AppProvider>
  );
}
