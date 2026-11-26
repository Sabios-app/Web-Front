export function parseRetryAfterSeconds(headers, nowMs = Date.now()) {
  if (!headers) return null

  const rawValue =
    typeof headers.get === 'function'
      ? headers.get('retry-after') ?? headers.get('Retry-After')
      : headers['retry-after'] ?? headers['Retry-After']

  if (rawValue === undefined || rawValue === null) return null

  const trimmed = String(rawValue).trim()
  if (!trimmed) return null

  if (/^\d+$/.test(trimmed)) {
    return Math.max(1, Number(trimmed))
  }

  const parsedDate = Date.parse(trimmed)
  if (!Number.isNaN(parsedDate)) {
    return Math.max(1, Math.ceil((parsedDate - nowMs) / 1000))
  }

  return null
}

export function formatarTempoEspera(segundos) {
  if (!Number.isFinite(segundos) || segundos <= 0) {
    return 'alguns instantes'
  }

  const total = Math.ceil(segundos)
  const minutos = Math.floor(total / 60)
  const restanteSegundos = total % 60

  if (minutos === 0) {
    return `${total} ${total === 1 ? 'segundo' : 'segundos'}`
  }

  if (restanteSegundos === 0) {
    return `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`
  }

  return `${minutos} min e ${restanteSegundos} s`
}

export function parseApiError(
  error,
  defaultMessage = 'Não foi possível concluir a operação. Tente novamente.',
) {
  const response = error?.response
  const data = response?.data
  const status = typeof data?.status === 'number' ? data.status : response?.status ?? null
  const code = typeof data?.code === 'string' ? data.code : null

  const rawErrors = Array.isArray(data?.errors) ? data.errors : []
  const errors = rawErrors
    .filter((item) => item && item.field && item.message)
    .map((item) => ({
      field: String(item.field),
      message: String(item.message),
    }))

  const fieldErrors = {}
  for (const item of errors) {
    if (!fieldErrors[item.field]) {
      fieldErrors[item.field] = item.message
    }
  }

  const retryAfterSeconds =
    status === 429 ? parseRetryAfterSeconds(response?.headers) : null

  let message =
    typeof data?.message === 'string' && data.message.trim()
      ? data.message.trim()
      : ''

  if (!message) {
    if (status === 429) {
      message = retryAfterSeconds
        ? `Muitas tentativas. Aguarde ${formatarTempoEspera(retryAfterSeconds)} para tentar novamente.`
        : 'Muitas tentativas. Aguarde alguns instantes antes de tentar novamente.'
    } else if (!response) {
      message = 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.'
    } else {
      message = defaultMessage
    }
  }

  return {
    status,
    code,
    message,
    errors,
    fieldErrors,
    retryAfterSeconds,
  }
}

export function extrairErrosDeCampo(
  parsedError,
  aliases = {},
  camposConhecidos = null,
) {
  if (!parsedError) {
    return { errosCampos: {}, mensagemGeral: '' }
  }

  if (parsedError.status === 400 && parsedError.errors.length > 0) {
    const errosCampos = {}
    const extras = []
    const conhecidos = camposConhecidos ? new Set(camposConhecidos) : null

    for (const item of parsedError.errors) {
      const campoDestino = aliases[item.field] ?? item.field
      if (!conhecidos || conhecidos.has(campoDestino)) {
        if (!errosCampos[campoDestino]) {
          errosCampos[campoDestino] = item.message
        }
      } else {
        extras.push(item.message)
      }
    }

    return {
      errosCampos,
      mensagemGeral: extras.join(' '),
    }
  }

  return {
    errosCampos: {},
    mensagemGeral: parsedError.message,
  }
}
