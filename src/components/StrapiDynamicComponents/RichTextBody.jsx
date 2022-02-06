import Markdown from 'markdown-to-jsx';

export default function RichTextBody({body}) {
  return (
    <section className={'rich-text-body gutter'}>
      <Markdown>{body}</Markdown>
    </section>
  );
}
