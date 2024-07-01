import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/router';
import { store } from './store/appStore';
import { Provider as StoreProvider } from 'react-redux';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@packages/shared';

export function AppProvider() {
  return (
    <React.StrictMode>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      </StoreProvider>
    </React.StrictMode>
  );
}
