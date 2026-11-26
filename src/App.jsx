import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider'
import AcessibilidadeProvider from './contexts/AcessibilidadeProvider'
import TemaProvider from './contexts/TemaProvider'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TemaProvider>
          <AcessibilidadeProvider>
            <AppRoutes />
          </AcessibilidadeProvider>
        </TemaProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
