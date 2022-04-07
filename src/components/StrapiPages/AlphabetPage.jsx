import Letter from '../StrapiWrappers/Letter.client';
import RichTextBody from '../StrapiDynamicComponents/RichTextBody';
import Alphabet from '../StrapiWrappers/Alphabet.client';
export default function AlphabetPage({description, accordion}) {
  return (
    <section className={'narrowest-gutter'}>
      <RichTextBody noGutter={true}>{description}</RichTextBody>
      <Alphabet letters={accordion}>
      </Alphabet>
    </section>
  );
}
