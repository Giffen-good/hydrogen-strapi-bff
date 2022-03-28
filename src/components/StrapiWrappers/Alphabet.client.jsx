import {useEffect, useState, useRef} from 'react';
import {Emitter, EventConstants} from '../StrapiHelpers/util';
import FreeLink from '../StrapiHelpers/FreeLink';
export default function Alphabet({children, letters}) {
  const [characterOpen, isCharacterOpen] = useState(null);
  const [nextCharacter, setNextCharacter] = useState(null);
  const [closingAnimationInProgress, setClosingAnimationInProgress] = useState(false);
  const [openAnimationInProgress, setOpenAnimationInProgess] = useState(false)
  const [opening, setOpening] = useState(0);
  const { SET_LETTER } = EventConstants;
  const [isMounted, setIsMounted] = useState(false)
  let timer;
  useEffect(() => {
    if (closingAnimationInProgress) closeLetter()
    if (openAnimationInProgress) openLetter();
    return () => clearInterval(timer)
  }, [opening])
  
  const closeLetter = (entryHeight) => {
    setClosingAnimationInProgress(true);
    if (opening === 0) {
      clearInterval(timer)
      setClosingAnimationInProgress(false);
      Emitter.emit(SET_LETTER, entryHeight);
    }
    timer = !timer && setInterval(() => {
      
      setOpening(opening => opening-1)
    }, 100)
    
    
  }
  const openLetter = (entryHeight) => {
    if (opening === entryHeight) {
      setOpenAnimationInProgess(false);

    }

    setOpenAnimationInProgess(true);
    timer = !timer && setInterval(() => {
      setOpening(opening => opening+1)
    }, 100)
  }

  Emitter.on(SET_LETTER, (entryHeight) => {
    console.log(nextCharacter)
    if (nextCharacter) {
      isCharacterOpen(nextCharacter);
      setNextCharacter(null);
      openLetter(entryHeight);

    }
  })

  const Letter = ({ letter, semanticKey, entries }) => {
    const [entryHeight, setEntryHeight] = useState(0);
    const entry = useRef();
    useEffect(() => {
      setEntryHeight(entry.clientHeight);
      
    }, [])
    useEffect(() => {
      console.log({isMounted})
      if (!isMounted) {
        setIsMounted(true)
      } else {
        console.log('closeLetter(entryHeight)');
        console.log(nextCharacter)
        closeLetter(entryHeight)
      }
    }, [nextCharacter])
    return (
      <div className={`letter`}>
        <div
          onClick={() => {
            if (characterOpen === semanticKey) {
              setNextCharacter(null)
              console.log('setNextCharacter(null)');
              closeLetter();
            } else {
              setNextCharacter(semanticKey)
            }
          }}
          className={
            'uppercase font-serif cursor-pointer lg:text-8xl md:text-7xl'
          }
        >
          {letter} : ({semanticKey === characterOpen ? opening : '0'})
        </div>
          <div className={'entries grid grid-cols-2 overflow-x-visible'} ref={entry}>
                  {entries.map((entry, n) => {
                    return (
                      <div
                        key={n}
                        className={`alphabet-entries lg:text-left`}
                      >
                        <FreeLink url={entry.url}>
                          {entry.name}
                        </FreeLink>
                      </div>
                    );
                  })}
            </div>
      </div>
    );
  }
  return (
    <section
      className={`alphabet-section grid justify-between lg:grid-cols-alpha-4 md:grid-cols-alpha-3 gutter gap-4
      `}
    >
      {letters.map((item, k) => {
        return (
          <Letter letter={item.letter} entries={item.entry} key={k} semanticKey={k} />
        );
      })}
    </section>
  );
}
// const setLetter = (semanticKey, SET_LETTER) => {
//   Emitter.emit(SET_LETTER, semanticKey);
// };


