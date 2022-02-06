export default function HeadlineWDate({Heading, date}) {
  const dob = new Date(date);
  const dobArr = dob.toDateString().split(' ');
  const dobFormat = dobArr[2] + ' ' + dobArr[1] + ' ' + dobArr[3];
  return (
    <section className="gutter text-center">
      <h1 className="text-5xl font-serif text-xs">{Heading}</h1>
      <h4 className={'font-semibold pt-3'}>{dobFormat}</h4>
    </section>
  );
}
