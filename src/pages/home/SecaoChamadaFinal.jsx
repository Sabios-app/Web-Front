import { MessageSquareText } from "lucide-react";
import BotaoLink from "../../components/BotaoLink";
import Revelar from "../../components/Revelar";

export default function SecaoChamadaFinal() {
  return (
    <section className="bg-verde-petroleo text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center lg:py-24">
        <Revelar className="flex flex-col items-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-dourado-claro">
            <MessageSquareText aria-hidden="true" size={26} />
          </span>
          <h2 className="mt-6 font-titulo text-4xl leading-tight sm:text-5xl">
            Grandes decisões começam com uma boa conversa.
          </h2>
          <p className="mt-4 text-xl text-white/85">
            Encontre hoje quem pode ajudar o seu negócio a dar o próximo passo.
          </p>
        </Revelar>
        <BotaoLink href="/especialistas" variante="dourado" className="mt-8">
          Encontrar meu especialista
        </BotaoLink>
      </div>
    </section>
  );
}
