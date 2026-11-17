import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider'
import AcessibilidadeProvider from './contexts/AcessibilidadeProvider'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AcessibilidadeProvider>
          <AppRoutes />
        </AcessibilidadeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
