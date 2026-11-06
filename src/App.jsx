import { BrowserRouter } from 'react-router-dom'
import AcessibilidadeProvider from './contexts/AcessibilidadeProvider'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AcessibilidadeProvider>
        <AppRoutes />
      </AcessibilidadeProvider>
    </BrowserRouter>
  )
}

export default App
