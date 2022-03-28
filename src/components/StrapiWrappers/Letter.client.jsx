import {Emitter, EventConstants} from '../StrapiHelpers/util';
import {useEffect, useState, useRef} from 'react';
import FreeLink from '../StrapiHelpers/FreeLink';
export default function Letter({children, letter, semanticKey, entries, k}) {
  const [isOpen, setOpenState] = useState(false);
  const [entryHeight, setEntryHeight] = useState(0);
  const [isClosing, setIsClosing] = useState(false)
  const entry = useRef();
  const {CHANGE_LETTER, SET_LETTER, OPEN_SOMEWHERE, CLOSE_LETTER,} = EventConstants;
  useEffect(() => {
    Emitter.on(SET_LETTER, (data) => {
      changeLetter(data, semanticKey, setOpenState, isOpen, OPEN_SOMEWHERE);
    });
    Emitter.on(CLOSE_LETTER, () => {
      if (isOpen) {
        closeLetter();
      }
    })
    setEntryHeight(entry.clientHeight)
    console.log(entry.clientHeight)
  }, []);
  const closeLetter = () => {
    timer = !timer && setInterval(() => {
      setOpenState(isOpen => isOpen-1)
    }, 100)
    
    if (isOpen === 0) {
      clearInterval(timer)
      Emitt
    }
  }
  
  useEffect(() => {
    closeLetter()
    
    return () => clearInterval(timer)
  }, [isOpen])
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
        {letter} : ({isOpen})
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
const closeLetter = (isOpen, setOpenState) => {
  
}
const changeLetter = (
  data,
  semanticKey,
  setOpenState,
  isOpen,
  OPEN_SOMEWHERE,
) => {
  if (data === semanticKey) {
    if (isOpen) Emitter.emit(OPEN_SOMEWHERE, true);
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
