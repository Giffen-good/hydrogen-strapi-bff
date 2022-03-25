import Letter from '../StrapiWrappers/Letter.client';
import RichTextBody from '../StrapiDynamicComponents/RichTextBody';
import Alphabet from '../StrapiWrappers/Alphabet.client';
export default function AlphabetPage({description, accordion}) {
  return (
    <>
      <RichTextBody>{description}</RichTextBody>
      <Alphabet>
        {accordion.map((item, k) => {
          return (
            <Letter k={k} letter={item.letter} entries={item.entry} key={k} semanticKey={k}>
            </Letter>
          );
        })}
      </Alphabet>
    </>
  );
}
