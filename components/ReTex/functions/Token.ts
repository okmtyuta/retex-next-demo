export type ContentType = 'text' | 'math' | 'align' | 'empty'

export interface Token {
  id: number
  content: string
  contentType: ContentType
  err: boolean
}

export const createToken = (id: number, content: string, contentType: ContentType, err?: boolean): Token => {
  return {
    id,
    content,
    contentType,
    err: err ?? false
  }
}
