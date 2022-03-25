import {Emitter, EventConstants} from '../StrapiHelpers/util';
import {useEffect, useState, useRef} from 'react';
import FreeLink from '../StrapiHelpers/FreeLink';
export default function Letter({children, letter, semanticKey, entries, k}) {
  const [isOpen, setOpenState] = useState(false);
  const [entryHeight, setEntryHeight] = useState(0)
  const entry = useRef();
  const {CHANGE_LETTER, SET_LETTER, OPEN_SOMEWHERE} = EventConstants;
  useEffect(() => {
    Emitter.on(SET_LETTER, (data) => {
      changeLetter(data, semanticKey, setOpenState, isOpen, OPEN_SOMEWHERE);
    });
    console.log(entry.clientHeight)
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
      <div className={'entries grid grid-cols-2 overflow-x-visible'} ref={entry}>
                {entries.map((entry, n) => {
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
const alphabetClasses = (k) => {
  let classes = '';
  if (k % 4 == 0 && k > 0) classes += 'lg:text-right ';
  if (k % 3 == 0 && k > 0) classes += 'md:text-right ';
  return classes;
};
