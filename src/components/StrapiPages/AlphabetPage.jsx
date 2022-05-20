import Letter from '../StrapiWrappers/Letter.client';
import RichTextBody from '../StrapiDynamicComponents/RichTextBody';
import Alphabet from '../StrapiWrappers/Alphabet.client';
export default function AlphabetPage({description, accordion}) {
  return (
    <section className={'narrowest-gutter'}>
        <div className={'heading t text-center   text-8xl font-semibold narrower-gutter'}>
            <h1>LIBRARY</h1>
        </div>
      <RichTextBody noGutter={true}>{description}</RichTextBody>
      <Alphabet letters={accordion}>
      </Alphabet>
    </section>
  );
}
