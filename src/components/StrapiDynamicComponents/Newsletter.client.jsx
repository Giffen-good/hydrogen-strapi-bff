export default function NewsletterClient({landingSection}) {
  if (landingSection) {
    return <LandingNewsletter />;
  } else {
    return <FooterNewsletter />;
  }
}
function LandingNewsletter() {
  return (
    <form className="uppercase font-semibold text-center pt-2 gutter ">
      <input
        type="text"
        className="placeholder-black focus:outline-none target:shadow-none block bg-transparent p-1 pl-0 border-b w-80  border-black	"
        placeholder="EMAIL"
      />
      <button type="submit" className="pt-4 font-semibold uppercase">
        Subscribe
      </button>
    </form>
  );
}
function FooterNewsletter() {
  return (
    <form className="uppercase font-sans pt-2">
      <input
        type="text"
        className="block bg-transparent p-1 pl-0 border-b w-64 border-black	"
        placeholder="EMAIL"
      />
      <button type="submit" className="pt-2 font-semibold uppercase">
        Subscribe
      </button>
    </form>
  );
}
