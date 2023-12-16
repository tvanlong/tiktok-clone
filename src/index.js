import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App'
import reportWebVitals from '~/reportWebVitals'
import GlobalStyles from '~/components/GlobalStyles'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/app.context'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '~/i18n/i18n'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
root.render(
  <BrowserRouter>
    <GlobalStyles>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <GoogleOAuthProvider clientId='532296773026-8e5r58fobcb6ggbu338ds30mevprubuf.apps.googleusercontent.com'>
            <App />
          </GoogleOAuthProvider>
        </AppProvider>
      </QueryClientProvider>
    </GlobalStyles>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
