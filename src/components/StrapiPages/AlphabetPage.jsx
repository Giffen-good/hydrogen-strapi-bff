import RichTextBody from '../StrapiDynamicComponents/RichTextBody';
import Alphabet from '../StrapiWrappers/Alphabet.client';
export default function AlphabetPage({description, accordion}) {
  return (
    <section className={''}>
        <div className={'heading t text-center   text-8xl font-semibold narrower-gutter'}>
            <h1>LIBRARY</h1>
        </div>
      <div className={'narrowest-gutter'}> <RichTextBody noGutter={true}>{description}</RichTextBody></div>
      <Alphabet letters={accordion}>
      </Alphabet>
    </section>
  );
}
