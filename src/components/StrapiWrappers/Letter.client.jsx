import {Emitter, EventConstants} from '../StrapiHelpers/util';
import {useEffect, useState} from 'react';
export default function Letter({children, letter, semanticKey}) {
  const [isOpen, setOpenState] = useState(false);
  const {CHANGE_LETTER, SET_LETTER, OPEN_SOMEWHERE} = EventConstants;
  useEffect(() => {
    Emitter.on(SET_LETTER, (data) => {
      changeLetter(data, semanticKey, setOpenState, isOpen, OPEN_SOMEWHERE);
    });
  }, []);

  return (
    <div className={`letter  ${isOpen ? 'open' : 'closed'}`}>
      <div
        onClick={() => {
          Emitter.emit(CHANGE_LETTER, semanticKey);
        }}
        className={
          'uppercase font-serif cursor-pointer lg:text-8xl md:text-7xl'
        }
      >
        {letter}
      </div>
      {children}
    </div>
  );
}

const changeLetter = (
  data,
  semanticKey,
  setOpenState,
  isOpen,
  OPEN_SOMEWHERE,
) => {
  if (data === semanticKey) {
    setOpenState((isOpen) => !isOpen);
    // if (isOpen) Emitter.emit(OPEN_SOMEWHERE, true);
  } else {
    setOpenState(false);
  }
};
