import Markdown from 'markdown-to-jsx';

export default function RichTextBody({children, Width, text_alignment, body}) {
  return (
    <section
      className={`rich-text-body gutter ${getTextAlignment(
        text_alignment,
      )} ${getWidth(Width)}`}
    >
      {body ? <Markdown>{body}</Markdown> : <Markdown>{children}</Markdown>}
    </section>
  );
}
function getTextAlignment(text_alignment) {
  switch (text_alignment) {
    case 'left_aligned':
      return 'text-left';
    case 'centered':
      return 'text-center';
    case 'right_aligned':
      return 'text-right';
  }
}
function getWidth(width) {
  switch (width) {
    case 'narrow':
      return 'narrowest-gutter';
    case 'wide':
      return 'narrow-gutter';
  }
}
