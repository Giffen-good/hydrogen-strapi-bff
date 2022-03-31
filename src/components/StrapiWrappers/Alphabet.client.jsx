import {useEffect, useState, useRef} from 'react';
import {Emitter, EventConstants} from '../StrapiHelpers/util';
import FreeLink from '../StrapiHelpers/FreeLink';
const isDone = [];
export default function Alphabet({children, letters}) {
  const [characterOpen, setCharacterOpen] = useState(null);
  const [currentLetter, setCurrentLetter] = useState(null)
  const [currentCharacter, setCurrentCharacter] = useState(null)
  const [offsetHeight, setOffsetHeight] = useState(0)
  const [nextCharacter, setNextCharacter] = useState(null);
  const [closingAnimationInProgress, setClosingAnimationInProgress] = useState(false);
  const [openAnimationInProgress, setOpenAnimationInProgess] = useState(false)
  const [opening, setOpening] = useState(0);
  const { SET_LETTER } = EventConstants;
  const [isMounted, setIsMounted] = useState(false)
  const [isRunning, setIsRunning] = useState(true);

  let timer;

  // useEffect(() => {
  //   if (closingAnimationInProgress) closeLetter()
  //   if (openAnimationInProgress) openLetter();
  //   return () => clearInterval(timer)
  // }, [opening])
  
  // const closeLetter = (entryHeight) => {
  //   setClosingAnimationInProgress(true);
  //   if (opening === 0) {
  //     clearInterval(timer)
  //     setClosingAnimationInProgress(false);
  //     Emitter.emit(SET_LETTER, entryHeight);
  //   }
  //   timer = !timer && setInterval(() => {
      
  //     setOpening(opening => opening-1)
  //   }, 100)
    
    
  // }
  // useInterval(() => {
  //   // Your custom logic here
  //   changeHeight(offsetHeight);
  // }, isRunning ? delay : null);

  useEffect(() => {
    console.log('use EFFECT')
    if (characterOpen === null) return
  }, [characterOpen])
 
  const closeLetter = () => {
    setCharacterOpen(null)
  }

  const openLetter = (letter) => {
    console.log(letter)
    if (characterOpen && characterOpen.key === letter.key) {
      setCharacterOpen(null)
    } else {
      setCharacterOpen(letter)
      // console.log(letter.ref.current.offsetHeight)
    }

  }
const changeHeight = (letter, open) => {

}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
  const Letter = ({ letter, semanticKey, entries}) => {
    const [entryHeight, setEntryHeight] = useState(0);
    const [heightSet, seHeightSet] = useState('auto')
    const mounted = useIsMounted();
    const entry = useRef(null);
    const inner = useRef(null);

    useEffect(() => {
      if(entry.current){
        let height = entry.current.offsetHeight;
        let width  = entry.current.offsetWidth;
        setEntryHeight(height);
        console.log('ENTRY EFFECT')
        seHeightSet('0')
        entry.current.style.position = 'relative';
        inner.current.style.position = 'absolute';
    }
    }, [entry])

    return (
      <div className={`letter`}>
        <div
          onClick={() => {
            console.log('changeLetter(entry)')
            const letter = {
              ref:entry.current,
              key: semanticKey,
              targetHeight: entryHeight,
              height:0
            }
            openLetter(letter)
          }}
          className={
            'uppercase font-serif cursor-pointer text-8xl '
          }
        >
          {letter}
        </div>
          <div 
          className={`entries absolute ${alphabetClasses(semanticKey+1)}  overflow-x-visible ${(characterOpen && characterOpen.key == semanticKey) ? 'open' : ''}`}
          style={{
            height: (characterOpen && characterOpen.key == semanticKey) ? `${characterOpen.targetHeight}px` : heightSet}}
          ref={entry}>
                <div ref={inner} className={` `}>
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
      </div>
    );
  }
  return (
    <section
      className={`alphabet-section grid justify-between grid-cols-alpha-4  gutter gap-4
      `}
    >
      {letters.map((item, k) => {
        return (
          <Letter letter={item.letter} entries={item.entry} key={k} semanticKey={k}  />
        );
      })}
    </section>

  );
}
// const setLetter = (semanticKey, SET_LETTER) => {
//   Emitter.emit(SET_LETTER, semanticKey);
// };


const useIsMounted = () =>  {
  // component is certainly mounted from the beginning
  const componentIsMounted = useRef(true)
  useEffect(() => {
  // when non-SSR + (ComponentDidMount or ComponentDidUpdate):
  // do nothing.
  // when non-SSR + ComponentWillUnmount:
    return () => { componentIsMounted.current = false }
  }, [])
  return componentIsMounted
}

const alphabetClasses = (k) => {
  let classes = '';
  if (k % 4 == 0 && k > 0) classes += 'lg:text-right end-piece ';
  if (k % 3 == 0 && k > 0) classes += 'md:text-right ';
  return classes;
};
