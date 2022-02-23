import {useEffect, useState} from 'react';
import {Emitter, EventConstants} from '../StrapiHelpers/util';

export default function Alphabet({children}) {
  const {CHANGE_LETTER, SET_LETTER, OPEN_SOMEWHERE} = EventConstants;
  const [openSomeWhere, setOpenSomewhere] = useState(false);
  useEffect(() => {
    Emitter.on(CHANGE_LETTER, (semanticKey) => {
      setLetter(semanticKey, SET_LETTER);
      setOpenSomewhere(false);
    });
    Emitter.on(OPEN_SOMEWHERE, () => {
      setOpenSomewhere(true);
    });
  });
  return (
    <section
      className={`alphabet-section grid justify-between lg:grid-cols-alpha-4 md:grid-cols-alpha-3 gutter gap-4
      ${openSomeWhere ? 'open-somewhere' : ''}`}
    >
      {children}
    </section>
  );
}
const setLetter = (semanticKey, SET_LETTER) => {
  Emitter.emit(SET_LETTER, semanticKey);
};
