import {
  defineConfig,
  CookieSessionStorage,
  PerformanceMetricsServerAnalyticsConnector} from '@shopify/hydrogen/config';


export default defineConfig({
  shopify: {
    storeDomain: 'black-fashion-fair.myshopify.com',
    storefrontToken: 'bf39d966488839b2e2b1c121e458a7e3',
    storefrontApiVersion: '2022-07',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [PerformanceMetricsServerAnalyticsConnector],
});
