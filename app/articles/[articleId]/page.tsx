interface ArticleProps {
  params: {
    articleId: string
  }
}

const Article = (props: ArticleProps) => {
  const { articleId } = props.params
  return <div>{`this article id is: ${articleId}`}</div>
}

export default Article
