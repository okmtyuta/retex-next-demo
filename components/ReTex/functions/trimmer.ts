import { ContentType, Token, createToken } from './Token'
import { Matcher, alignMatcher, dollarMatcher } from './matcher'
import { ALIGN_REGEX, DOLLAR_REGEX } from './regExp'

export interface Trimmed {
  before: Token
  match: Token
  after: string
  // lastId?: number
}

export type Trimmer = (target: string, id: number) => Trimmed

export const generateTrimmer = (contentType: ContentType, matcher: Matcher, exceptRegExps: RegExp[]): Trimmer => {
  const trimmer = (target: string, id: number) => {
    const matched = matcher(target)

    if (matched.type === 'matched') {
      const { matchedString, index, afterIndex } = matched
      const stringBeforeMatch = target.slice(0, index)
      const stringAfterMatch = target.slice(afterIndex, target.length)

      return {
        before: createToken(id, stringBeforeMatch, 'text'),
        match: createToken(id + 1, matchedString, contentType),
        after: stringAfterMatch
      }
    }

    const isExistExcept = exceptRegExps.some((exceptRegExp) => {
      return target.match(exceptRegExp) != null
    })
    if (isExistExcept) {
      return {
        before: createToken(id, '', 'empty'),
        match: createToken(id + 1, '', 'empty'),
        after: target
      }
    }

    return {
      before: createToken(id, target, 'text'),
      match: createToken(id + 1, '', 'empty'),
      after: ''
    }
  }

  return trimmer
}

export const dollarTrimmer = generateTrimmer('math', dollarMatcher, [ALIGN_REGEX])
export const alignTrimmer = generateTrimmer('align', alignMatcher, [DOLLAR_REGEX])
