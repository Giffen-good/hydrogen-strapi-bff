import {getFont, getTextAlignment} from '../StrapiHelpers/util';

export default function Heading({
  font_family,
  heading_elements,
  text,
  font_size,
  width,
  text_alignment
}) {
  return (
    <section
      className={`heading t ${getTextAlignment(
        text_alignment,
      )} ${getFontSize(font_size)} ${getFont(font_family)} ${getWidth(width)}`}
    >
      <GetHeading heading_element={heading_elements} text={text} />
    </section>
  );
}

function getFontSize(font_size) {
  switch (font_size) {
    case 'text_xs':
      return 'text-xs';
    case 'text_sm':
      return 'text-sm';
    case 'text_lg':
      return 'text-lg';
    case 'text_xl':
      return 'text-xl';
    case 'text_2xl':
      return 'text-2xl';
    case 'text_3xl':
      return 'text-3xl';
    case 'text_4xl':
      return 'text-4xl';
    case 'text_5xl':
      return 'text-5xl';
    case 'text_6xl':
      return 'text-6xl';
    case 'text_7xl':
      return 'text-7xl';
    case 'text_8xl':
      return 'text-8xl';
  }
}

function GetHeading({heading_element, text}) {
  switch (heading_element) {
    case 'h1':
      return <h1>{text}</h1>;
    case 'h2':
      return <h2>{text}</h2>;
    case 'h3':
      return <h3>{text}</h3>;
    case 'h4':
      return <h4>{text}</h4>;
    case 'h5':
      return <h5>{text}</h5>;
    case 'h6':
      return <h6>{text}</h6>;
  }
}
function getWidth(width) {
  switch (width) {
    case 'narrow':
      return 'narrowest-gutter';
    case 'wide':
      return 'gutter'
    default:
      return 'narrower-gutter';
  }
}