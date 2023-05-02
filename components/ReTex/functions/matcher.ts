import { ALIGN_WITHOUT_DOLLAR_REGEX, DOLLAR_WITHOUT_ALIGN_REGEX } from "./regExp"

export interface BaseMatcherResult {
  type: 'matched' | 'unmatched'
}

export interface Matched extends BaseMatcherResult {
  type: 'matched'
  matchedString: string
  index: number
  afterIndex: number
}

export interface Unmatched extends BaseMatcherResult {
  type: 'unmatched'
}

export type MatcherResult = Matched | Unmatched

export type Matcher = (target: string) => MatcherResult

const generateMatcher = (regexp: RegExp, start: string, end: string): Matcher => {
  const matcher = (target: string): MatcherResult => {
    const matched = target.match(regexp)
    if (matched != null) {
      const type = 'matched'
      const matchedString = matched[1]
      const index = matched.index
      if (index != null) {
        const afterIndex = index + matchedString.length + start.length + end.length

        return {
          type,
          matchedString,
          index,
          afterIndex
        }
      }
    }
    return {
      type: 'unmatched'
    }
  }

  return matcher
}

export const dollarMatcher = generateMatcher(DOLLAR_WITHOUT_ALIGN_REGEX, '$', '$')
export const alignMatcher = generateMatcher(ALIGN_WITHOUT_DOLLAR_REGEX, '\\begin{align}', '\\end{align}')
