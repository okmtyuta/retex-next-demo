import { dollarMatcher } from './matcher'

describe('matcher', () => {
  it('dollar matcher', () => {
    const target = '正規分布$N(\\mu, \\sigma^2)$の期待値は$\\mu$であり，分散は$\\sigma^2$である。'
    const matched = dollarMatcher(target)
    const expected = {
      type: 'matched',
      matchedString: 'N(\\mu, \\sigma^2)',
      index: 4,
      afterIndex: 22
    }
    expect(matched).toEqual(expected)
  })

  it('dollar matcher does not match with align', () => {
    const target =
      '\\begin{align}f(x) = \\frac{1}{\\sqrt{2\\pi} e^{-x^2/2}\\end{align}は正規分布$N(0, 1)$の確率密度関数として知られている。'
    const matched = dollarMatcher(target)
    expect(matched.type).toEqual('unmatched')
  })
})
