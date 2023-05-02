import { Katex } from './Katex'
import { parser } from './functions/parser'

interface Segment {
  id: number
  element: JSX.Element
}

interface RetexProps {
  text: string
}

export const Retex = (props: RetexProps) => {
  const tokens = parser(props.text)

  const segments: Segment[] = []

  for (const token of tokens) {
    if (token.contentType === 'text') {
      const style = token.err
        ? {
            color: 'red'
          }
        : {}

      segments.push({
        id: token.id,
        element: (
          <span
            onMouseOver={() => {
              console.log('INTERNAL ERR')
            }}
            style={style}
          >
            {token.content}
          </span>
        )
      })
      continue
    }

    if (token.contentType === 'math') {
      segments.push({
        id: token.id,
        element: <Katex err={token.err} equation={token.content} />
      })
    }

    if (token.contentType === 'align') {
      segments.push({
        id: token.id,
        element: <Katex err={token.err} equation={token.content} display={true} />
      })
    }
  }

  return (
    <>
      {segments.map((segment) => {
        return <span key={segment.id}>{segment.element}</span>
      })}
    </>
  )
}
