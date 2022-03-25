export default function JustifiedText({children}) {
    const justified_text = children;
    return (
            <div
            className={
            'w-full max-w-xs xl:pb-0 grow-0 uppercase flex-auto text-sm w-60 xl:order-2 order-1'
            }
        >
            {justified_text &&
            justified_text.split('\n').map((line, k) => {
                return (
                <h3 className={`flex justify-between`} key={k}>
                    {line.split(' ').map((word, idx) => {
                    return <WordSplit word={word} key={idx} />;
                    })}
                </h3>
                );
            })}
        </div>
    )
}
const WordSplit = ({word}) => {
    if (word.split('--').length) {
      return <span>{word.split('--').join(' ')}</span>;
    } else {
      return <span>{word}</span>;
    }
  };