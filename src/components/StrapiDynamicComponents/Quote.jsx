import QuotationMark from '../QuotationMark';
export default function Quote({quote}) {
  const lines = quote.split('\n');

  return (
    <section
      className={
        'quote text-justify sm:text-4xl xs:text-2xl md:text-6xl xl:text-8xl lg:text-7xl uppercase gutter'
      }
    >
      <div className={' text-center pb-14 mx-auto font-serif'}>
        <QuotationMark />
      </div>
      {lines.map((l, i) => {
        return (
          <h5
            className={`justify-between flex ${
              i !== 0 ? 'lg:pt-7 md:pt-4 sm:pt-2 xs:pt-1' : ''
            }`}
            key={i}
          >
            {l.split(' ').map((c, j) => {
              return <span key={j}>{c}</span>;
            })}
          </h5>
        );
      })}
    </section>
  );
}
