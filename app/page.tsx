'use client'

import { Retex } from 'math-okmtyuta/components/ReTex/Retex'

export default function Home() {
  const script = String.raw`
  確率変数$X$が正規分布$N(\mu, \sigma^2)$に従うとする。この時$X$の一次積率$\alpha_1$は
  \begin{align}
    \alpha_1 = \int_{-\infty}^\infty x \frac{1}{2\pi} \exp\left( -\frac{(x-\mu)^2}{2\sigma^2} \right) dx
  \end{align}
  で与えられる。これを計算して期待値$\mu$を得る。
`
  return (
    <main>
      <div>以下のように数式が表示できる。</div>
      <Retex text={script} />
    </main>
  )
}
