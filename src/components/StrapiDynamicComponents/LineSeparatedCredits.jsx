export default function LineSeparatedCredits({credit}) {
  function LineSeparator({i}) {
    if (i === 0) return;
    return (
      <div className={'flex items-middle mx-2'}>
        <div className={'separator h-px w-12 border-b border-black'}></div>
      </div>
    );
  }
  return (
    <section
      className={
        'line-separated-credits uppercase flex justify-center items-center'
      }
    >
      {credit.map((c, i) => {
        return (
          <>
            <LineSeparator i={i} />
            <hgroup key={i} className={'credit'}>
              <h3 className={'font-semibold text-xs pr-1 inline-block'}>
                {c.Title}
              </h3>
              <h2 className={'pl-1 inline-block'}>{c.subtitle}</h2>
            </hgroup>
          </>
        );
      })}
    </section>
  );
}
