import {Link} from '@shopify/hydrogen/client';
export default function Button({url, label, classes}) {
  return (
    <Link to={url} className={classes}>
      <button
        className={
          'font-semibold text-xs px-10 py-2.5 border uppercase border-current rounded-3xl'
        }
      >
        {label}
      </button>
    </Link>
  );
}
