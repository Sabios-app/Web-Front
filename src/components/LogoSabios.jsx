// Símbolo do Sábios desenhado em SVG: muda de cor junto com o texto (currentColor),
// então funciona no modo de alto contraste e em fundo claro ou escuro.
const TRACO_FOLHA =
  'M119,191 C101,165 99,130 118,108 C128,96 140,85 152,73 C153,90 156,108 168,122 C178,133 184,140 182,150 C179,172 162,196 134,204 C124,207 114,209 106,211 L115,223 L219,223'

const TRACO_CHAMA =
  'M181,120 L180.8,121.9 L180.7,123.9 L180.6,126 L180.6,128.1 L180.6,130.3 L180.8,132.5 L181.5,134.4 L182.3,136.4 L183.1,138.4 L184,140.3 L184.8,142.3 L185.7,144.2 L186.5,146 L187.3,147.4 L188.4,150.7 L189.3,154.4 L190.1,158.4 L190.7,162.6 L191.1,166.9 L191.3,171.4 L191.3,175.9 L191,180.4 L190.6,184.9 L190,189.2 L189.2,193.4 L188.1,197.3 L186.9,200.9 L185.3,204.4 L184,207.3 L182.6,210.3 L181,213.3 L179.3,216.4 L177.5,219.4 L175.6,222.5 L173.9,225.7 L172.3,229.1 L170.6,232.3 L168.9,235.6 L167.2,238.8 L165.4,241.9 L163.7,245 L162,248 L164.6,245.7 L167.2,243.3 L169.8,240.8 L172.4,238.2 L175,235.4 L177.6,232.6 L180.1,229.8 L182.4,226.8 L184.4,223.6 L186.2,220.3 L188,217.1 L189.7,213.9 L191.3,210.7 L192.7,207.6 L194.3,203.9 L195.8,199.6 L197,195.2 L197.9,190.6 L198.6,185.8 L199,181 L199.2,176.1 L199.2,171.2 L199,166.4 L198.6,161.6 L198,157 L197.1,152.6 L196,148.5 L194.7,144.6 L193.7,142.5 L192.9,140.8 L192.1,139 L191.3,137.2 L190.5,135.3 L189.7,133.4 L189,131.6 L188.3,129.7 L187.1,128 L185.7,126.4 L184.5,124.8 L183.2,123.2 L182.1,121.6 Z'

export function SimboloSabios({ className = '' }) {
  return (
    <svg viewBox="95 65 130 194" className={className} aria-hidden="true" focusable="false">
      <path d={TRACO_FOLHA} fill="none" stroke="currentColor" strokeWidth="8" strokeMiterlimit="10" />
      <path d={TRACO_CHAMA} fill="currentColor" />
    </svg>
  )
}

/**
 * Logo principal: símbolo dourado no círculo verde + nome "sábios".
 * Use `claro` quando o logo estiver sobre fundo escuro.
 */
export default function LogoSabios({ claro = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-verde-petroleo">
        <SimboloSabios className="h-[72%] text-dourado-claro" />
      </span>
      <span
        className={`font-titulo text-[1.75rem] font-semibold tracking-tight ${claro ? 'text-white' : 'text-verde-titulo'}`}
      >
        sábios
      </span>
    </span>
  )
}
