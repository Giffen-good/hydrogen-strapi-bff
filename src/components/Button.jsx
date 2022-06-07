import {Link} from '@shopify/hydrogen/client';
import FreeLink from './StrapiHelpers/FreeLink'
export default function Button({url, label, classes}) {
  return (
    <FreeLink url={url} className={classes}>
      <button
        className={
          'font-semibold text-xs px-10 py-2.5 border uppercase border-current rounded-3xl'
        }
      >
        {label}
      </button>
    </FreeLink>
  );
}
