import {Link} from '@shopify/hydrogen/client';
export default function FreeLink({url, classes, children}) {
  const isExternal = url
    ? url.indexOf('://') > 0 || url.indexOf('//') === 0
    : false;
  if (url == null)
    return <span className={`null-url ${classes}`}>{children}</span>;
  if (isExternal) {
    return (
      <a
        rel="noopener noreferrer"
        href={url}
        target="_blank"
        className={classes}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link to={url} className={classes}>
        {children}
      </Link>
    );
  }
}
