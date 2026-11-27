import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Botao from "../components/Botao";
import CampoTexto from "../components/CampoTexto";
import AlertaFormulario from "../components/feedback/AlertaFormulario";
import AuthLayout from "../layouts/AuthLayout";
import { authService } from "../services/sabiosServices";
import { extrairErrosDeCampo, parseApiError } from "../utils/apiError";

const TAMANHO_MINIMO = 6;

const classeBotaoLink =
  "inline-flex min-h-14 w-full items-center justify-center rounded-full bg-verde-petroleo px-6 text-lg font-bold text-white transition-colors hover:bg-verde-hover";

export default function RedefinirSenhaPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [errosCampos, setErrosCampos] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [concluido, setConcluido] = useState(false);

  function limparErroCampo(campo) {
    if (errosCampos[campo]) {
      setErrosCampos((atual) => ({ ...atual, [campo]: "" }));
    }
  }

  async function enviar(event) {
    event.preventDefault();
    setErro("");

    // Validação local, antes de chamar o back
    const novosErros = {};
    if (novaSenha.length < TAMANHO_MINIMO) {
      novosErros.newPassword = `A senha precisa ter pelo menos ${TAMANHO_MINIMO} caracteres.`;
    }
    if (confirmacao !== novaSenha) {
      novosErros.confirmacao = "As senhas não são iguais.";
    }
    if (Object.keys(novosErros).length > 0) {
      setErrosCampos(novosErros);
      return;
    }

    setErrosCampos({});
    setCarregando(true);

    try {
      await authService.resetPassword(token, novaSenha);
      setConcluido(true);
    } catch (err) {
      const parsed = parseApiError(
        err,
        "Não foi possível redefinir a senha agora. Tente novamente.",
      );
      const { errosCampos: campos, mensagemGeral } = extrairErrosDeCampo(
        parsed,
        {},
        ["newPassword"],
      );
      setErrosCampos(campos);
      setErro(mensagemGeral);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <Link
          to="/login"
          className="text-sm font-bold text-dourado-texto underline-offset-4 hover:underline"
        >
          ← Voltar para entrar
        </Link>
        <h1 className="mt-8 font-titulo text-4xl text-verde-titulo">
          Crie uma nova senha
        </h1>

        {!token ? (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900"
          >
            <strong>Link inválido.</strong>
            <p className="mt-1">
              Este link de recuperação está incompleto. Peça um novo para
              continuar.
            </p>
            <Link
              to="/recuperar-senha"
              className="mt-3 inline-block font-bold underline underline-offset-4"
            >
              Pedir novo link
            </Link>
          </div>
        ) : concluido ? (
          <div className="mt-8 space-y-5">
            <div
              role="status"
              className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900"
            >
              <strong>Senha alterada com sucesso.</strong>
              <p className="mt-1">
                Agora você já pode entrar com a nova senha.
              </p>
            </div>
            <Link to="/login" className={classeBotaoLink}>
              Ir para o login
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-3 text-texto-secundario">
              Escolha uma senha com pelo menos {TAMANHO_MINIMO} caracteres.
            </p>

            <AlertaFormulario tipo="erro">{erro}</AlertaFormulario>

            <form onSubmit={enviar} className="mt-8 space-y-5">
              <CampoTexto
                id="nova-senha"
                rotulo="Nova senha"
                type="password"
                placeholder="••••••••"
                valor={novaSenha}
                aoMudar={(event) => {
                  setNovaSenha(event.target.value);
                  limparErroCampo("newPassword");
                }}
                erro={errosCampos.newPassword}
                obrigatorio
              />
              <CampoTexto
                id="confirmar-senha"
                rotulo="Repita a nova senha"
                type="password"
                placeholder="••••••••"
                valor={confirmacao}
                aoMudar={(event) => {
                  setConfirmacao(event.target.value);
                  limparErroCampo("confirmacao");
                }}
                erro={errosCampos.confirmacao}
                obrigatorio
              />
              <Botao type="submit" desabilitado={carregando}>
                {carregando ? "Salvando..." : "Salvar nova senha"}
              </Botao>
            </form>

            <p className="mt-6 text-sm text-texto-secundario">
              Link vencido ou já usado?{" "}
              <Link
                to="/recuperar-senha"
                className="font-bold text-dourado-texto underline-offset-4 hover:underline"
              >
                Peça um novo
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
