import AlphabetPage from '../StrapiPages/AlphabetPage';
export default function BuildStrapiPage({data, slug, children}) {
  return (
    <StructuredPage data={data} slug={slug}>
      {children}
    </StructuredPage>
  );
}
function StructuredPage({data, slug, children}) {
  if (slug == 'pages' || slug == 'root') return <>{children}</>;
  if (slug == 'alphabet') return <AlphabetPage {...data} />;
}
