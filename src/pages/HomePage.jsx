import MainLayout from '../layouts/MainLayout'
import SecaoChamadaFinal from './home/SecaoChamadaFinal'
import SecaoComoFunciona from './home/SecaoComoFunciona'
import SecaoEspecialistas from './home/SecaoEspecialistas'
import SecaoInicio from './home/SecaoInicio'
import SecaoParaMentores from './home/SecaoParaMentores'

export default function HomePage() {
  return (
    <MainLayout>
      <SecaoInicio />
      <SecaoComoFunciona />
      <SecaoEspecialistas />
      <SecaoParaMentores />
      <SecaoChamadaFinal />
    </MainLayout>
  )
}
