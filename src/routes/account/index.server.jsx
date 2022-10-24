import {useSession, CacheNone} from '@shopify/hydrogen';

import AccountDetails from '../../components/account/AccountDetails.server';

export default function Account({response}) {
  response.cache(CacheNone());

  const {customerAccessToken} = useSession();

  if (customerAccessToken && customerAccessToken !== '') {
    return <AccountDetails customerAccessToken={customerAccessToken} />;
  } else {
    return response.redirect('/account/login');
  }
}
