import Markdown from 'markdown-to-jsx';
import {getFont, getTextAlignment} from '../StrapiHelpers/util';

export default function RichTextBody({children, Width, text_alignment, body, noGutter, noPadding, drop_text, drop_text_style}) {
  return (
    <section
      className={`rich-text-body ${!noGutter ? 'gutter' : ''} ${!noPadding ? '' : 'flush pb-0'} ${getTextAlignment(
        text_alignment,
      )} ${getWidth(Width)}`}
    >
      <span className={`${getFont(drop_text_style)}`}>{drop_text}</span>
      {body ? <Markdown>{body}</Markdown> : <Markdown>{children}</Markdown>}
    </section>
  );
}

function getWidth(width) {
  switch (width) {
    case 'narrow':
      return 'narrowest-gutter';
    case 'wide':
      return '';
  }
}
