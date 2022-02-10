import StrapiMedia from '../StrapiMedia';
import {getAttributes} from './componentImports';
export default function HeadlineCredit({credit_part}) {
  return (
    <section className="headline-credit flex flex-wrap justify-between max-w-3xl mx-auto gutter uppercase">
      {credit_part.map((c, i) => {
        return (
          <div key={i} className="text-center px-3">
            <h3 className="font-semibold text-xs">{c.Title}</h3>
            <h2>{c.Name}</h2>
            <div className={'flex justify-center'}>
              {c.link.map((cta, j) => {
                return (
                  <a
                    key={j}
                    href={cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <StrapiMedia
                      media={getAttributes(cta.icon)}
                      classes={'sm-icon mx-1'}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
