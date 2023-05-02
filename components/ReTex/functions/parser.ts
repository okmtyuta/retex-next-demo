import { Token } from './Token'
import { alignTrimmer, dollarTrimmer } from './trimmer'

export const parser = (text: string) => {
  let processing = text
  const tokens: Token[] = []
  let id = 0
  while (processing.length > 0) {
    const res = dollarTrimmer(processing, id)
    id += 2
    tokens.push(res.before)
    tokens.push(res.match)
    processing = res.after

    const align = alignTrimmer(processing, id)
    id += 2
    tokens.push(align.before)
    tokens.push(align.match)
    processing = align.after
  }

  return tokens
    .sort((a, b) => a.id - b.id)
    .filter((token) => {
      return token.contentType !== 'empty'
    })
    .map((token, index) => {
      return {
        ...token,
        id: index
      }
    })
}
