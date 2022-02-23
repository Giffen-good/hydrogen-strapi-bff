import Letter from '../StrapiWrappers/Letter.client';
import RichTextBody from '../StrapiDynamicComponents/RichTextBody';
import FreeLink from '../StrapiHelpers/FreeLink';
import Alphabet from '../StrapiWrappers/Alphabet.client';
export default function AlphabetPage({description, accordion}) {
  return (
    <>
      <RichTextBody>{description}</RichTextBody>
      <Alphabet>
        {accordion.map((item, k) => {
          return (
            <Letter letter={item.letter} key={k} semanticKey={k}>
              <div className={'entries overflow-x-visible'}>
                {item.entry.map((entry, n) => {
                  return (
                    <div
                      className={`alphabet-entries lg:text-left ${alphabetClasses(
                        k + 1,
                      )}`}
                    >
                      <FreeLink url={entry.url} key={n}>
                        {entry.name}
                      </FreeLink>
                    </div>
                  );
                })}
              </div>
            </Letter>
          );
        })}
      </Alphabet>
    </>
  );
}
const alphabetClasses = (k) => {
  let classes = '';
  if (k % 4 == 0 && k > 0) classes += 'lg:text-right ';
  if (k % 3 == 0 && k > 0) classes += 'md:text-right ';
  return classes;
};
