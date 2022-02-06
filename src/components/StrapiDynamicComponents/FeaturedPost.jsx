export default function FeaturedPost({
  bg_color,
  bold_title,
  button_link,
  button_text,
  drop_cap,
  excerpt,
  justified_text,
  title,
}) {
  return (
    <section
      className={
        'Article Info Section flex sm:flex-wrap flex-no-wrap text-white'
      }
      style={{backgroundColor: bg_color}}
    >
      <div className={'flex-1 flex'}>
        <span className={'font-serif dropcap'}>{drop_cap}</span>
        <hgroup className={'text-center uppercase'}>
          <h3 className={'font-serif text-6xl '}>{title}</h3>
          <h2 className={'font-semibold text-7xl'}>{bold_title}</h2>
        </hgroup>
      </div>
      <div className={'flex-1'}></div>
    </section>
  );
}
