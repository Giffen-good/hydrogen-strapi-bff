import LayoutShopify from './LayoutShopify.server';
import Button from './Button.client';
import RecommendedProductsServer from './RecommendedProducts.server';
/**
 * A server component that defines the content to display when a page isn't found (404 error)
 */
function NotFoundHero() {
  return (
    <section className="py-10 header-offset">
      <div className="max-w-3xl text-center mx-4 md:mx-auto">
        <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
          We&#39;ve lost this page
        </h1>
        <p className="text-lg m-8 text-gray-500">
          We couldn’t find the page you’re looking for. Try checking the URL or
          heading back to the home page.
        </p>
        <Button
          className="w-full md:mx-auto md:w-96"
          url="/"
          label="Take me to the home page"
        />
      </div>
    </section>
  );
}

export default function NotFound({country = {isoCode: 'US'}}) {
  return (
    <LayoutShopify headerSettings={headerParams}>
      <NotFoundHero />
      <RecommendedProductsServer country={country} />
    </LayoutShopify>
  );
}
const headerParams = {
  backgroundTransparency: true,
  useNavigation: true,
  useSpecialLayout: false,
};
