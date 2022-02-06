// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
import {Router} from '@layer0/core';
// This file was added by layer0 init.
// You should commit this file to source control.
const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;

module.exports = new Router()
  .match('/assets/:path*', ({cache}) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
        forcePrivateCaching: true,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: ONE_DAY,
      },
    });
  })
  .match('/', ({cache}) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    });
  })
  .match('/collections/:path*', ({cache}) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    });
  })
  .match('/products/:path*', ({cache}) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
        forcePrivateCaching: true,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: ONE_DAY,
      },
    });
  })
  .match('/:path*', ({cache}) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    });
  })
  .fallback(({renderWithApp}) => renderWithApp());
