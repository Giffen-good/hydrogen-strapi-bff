import {Link} from '@shopify/hydrogen/client';
import HashLink from './HashLink.client'
export default function FreeLink({url, classes, children}) {
  const isExternal = url
    ? url.indexOf('://') > 0 || url.indexOf('//') === 0
    : false;
  if (url == null)
    return <span className={`null-url ${classes}`}>{children}</span>;
  const isHashLink = url.split('/')[url.split('/').length - 1].includes('#');
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
  } else if (isHashLink) {
    return (<a href={url} className={classes}>{children}</a>)
  } else {
    return (
      <Link to={url} className={classes}>
        {children}
      </Link>
    );
  }
}
