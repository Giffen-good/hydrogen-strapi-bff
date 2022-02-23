export default function CollectionRedirect({response}) {
  console.log('Collection Redirect');
  return new Response(null, {
    status: 301,
    headers: {Location: 'https://shopify.dev/custom-storefronts/hydrogen'},
  });
}
