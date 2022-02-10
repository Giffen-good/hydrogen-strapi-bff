export default function Heading({font_family, heading_elements, text}) {
  return (
    <section className={`heading text-center text-2xl gutter ${font_family}`}>
      <GetHeading heading_element={heading_elements} text={text} />
    </section>
  );
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
