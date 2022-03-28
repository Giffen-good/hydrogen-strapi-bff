import Letter from '../StrapiWrappers/Letter.client';
import RichTextBody from '../StrapiDynamicComponents/RichTextBody';
import Alphabet from '../StrapiWrappers/Alphabet.client';
export default function AlphabetPage({description, accordion}) {
  return (
    <>
      <RichTextBody>{description}</RichTextBody>
      <Alphabet letters={accordion}>
      </Alphabet>
    </>
  );
}
