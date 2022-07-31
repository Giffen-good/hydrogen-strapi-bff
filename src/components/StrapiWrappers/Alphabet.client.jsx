import {useEffect, useState, useRef} from 'react';
import {Emitter, EventConstants} from '../StrapiHelpers/util';
import FreeLink from '../StrapiHelpers/FreeLink';
const isDone = [];
export default function Alphabet({children, letters}) {

  let timer;

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
    const [characterOpen, setCharacterOpen] = useState(null);
    const [entryHeight, setEntryHeight] = useState(0);
    const [heightSet, seHeightSet] = useState('auto')
    const mounted = useIsMounted();
    const entry = useRef(null);
    const inner = useRef(null);
    const { CHANGE_LETTER } = EventConstants;
    Emitter.on(CHANGE_LETTER, () => {
      if (characterOpen) {
        setCharacterOpen(null)
      }
    })
    const openLetter = (letter) => {
      if (characterOpen && characterOpen.key === letter.key) {
        setCharacterOpen(null)
      } else if (document.querySelector('.entries.open')){
        // console.log(letter.ref.current.offsetHeight)
        Emitter.emit(CHANGE_LETTER)
        console.log('change letter')
        letter.delayed = true;
        setCharacterOpen(letter)
      } else {
        setCharacterOpen(letter)
      }
    }
    useEffect(() => {
      if(entry.current){
        seHeightSet('auto');
        entry.current.style.position = 'inherit';
        inner.current.style.position = 'inherit';
        let height = entry.current.offsetHeight;
        let width  = entry.current.offsetWidth;
        setEntryHeight(height);
        console.log(height, entry);
        seHeightSet('0');
        entry.current.style.position = 'relative';
        inner.current.style.position = 'absolute';
      }
    }, [entry])

    return (
      <div className={`letter`}>
        <div
          onClick={() => {
            const letter = {
              ref:entry.current,
              key: semanticKey,
              targetHeight: entryHeight,
              height:0,
              delayed: false
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
          className={`entries absolute ${alphabetClasses(
            semanticKey + 1,
          )}  overflow-x-visible ${
            characterOpen && characterOpen.key == semanticKey ? 'open' : ''
          }  ${
            characterOpen &&
            characterOpen.key == semanticKey &&
            characterOpen.delayed
              ? 'delayed'
              : ''
          }`}
          style={{
            height:
              characterOpen && characterOpen.key == semanticKey
                ? `${characterOpen.targetHeight}px`
                : heightSet,
          }}
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
      className={`alphabet-section grid justify-between grid-cols-alpha-4 relative gap-4 gutter
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
  if ((k + 1) % 4 == 0 && k > 0) classes += 'second-to-end-piece ';
  return classes;
};
