import {useEffect, useState, useRef} from 'react';
import {Emitter, EventConstants} from '../StrapiHelpers/util';
import FreeLink from '../StrapiHelpers/FreeLink';
const isDone = [];
export default function Alphabet({children, letters}) {
  const [characterOpen, setCharacterOpen] = useState(null);
  const [lettersBin, setLetters] = useState([])
  
  let timer;

 
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
    
    useEffect(() => {console.log(characterOpen)},[characterOpen])
  // }
  // useInterval(() => {
  //   // Your custom logic here
  //   changeHeight(offsetHeight);
  // }, isRunning ? delay : null);

  useEffect(() => {
    if (lettersBin.length === 26) buildStylesSheet(lettersBin)
  }, [lettersBin])
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
    const [m, setM] = useState(false)
    const mounted = useIsMounted();
    const entry = useRef(null);
    const inner = useRef(null);

    useEffect(() => {
      if(entry.current && !isDone.includes(semanticKey)){
        let height = entry.current.offsetHeight;
        let width  = entry.current.offsetWidth;
        setEntryHeight(height);
        const letter = {
          ref:entry.current,
          key: semanticKey,
          height: height
        }
        seHeightSet('0') 
        
        setLetters((lettersBin) => [...lettersBin, letter])
        isDone.push(semanticKey)

    }
    }, [entry])

    return (
      <div className={`letter`}>
        <div
          onClick={() => {
            const letter = {
                ref:entry.current,
                key: semanticKey
            }
            console.log('changeLetter(entry) ')
            setCharacterOpen(letter)
          }}
          className={
            'uppercase font-serif cursor-pointer text-8xl '
          }
        >
          {letter} 
        </div>
          <div 
          id={`letter-${semanticKey}`}
          className={`entries invisible absolute  ${alphabetClasses(semanticKey+1)}  overflow-x-visible ${(characterOpen && characterOpen.key == semanticKey) ? 'open' : ''}`}
          ref={entry}>
                <div ref={inner} className={`inner-let`}>
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

function buildStylesSheet(letters) {
  const style = document.createElement('style');
  console.log(letters)
style.type = 'text/css';
let styles = '.entries {position:relative; visibility:initial;height:0;overflow:initial;opacity:0;}.inner-let {position:absolute;}\n';

for (let i = 0; i < 26;i++) {
  styles += `#letter-${i}.open {
    height:${letters[i].height}px
  }\n`
}
// console.log(styles)
style.innerHTML = styles
document.getElementsByTagName('head')[0].appendChild(style);
}
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
