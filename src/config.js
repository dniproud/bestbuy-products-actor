const Apify = require('apify');

/**
 * @param  {Object} proxy
 * @return {ProxyConfiguration} proxyConfiguration
 */
exports.proxyConfig = async (proxy) => {
    let proxyConfiguration;
    if (proxy.useApifyProxy) {
        proxyConfiguration = await Apify.createProxyConfiguration({
            groups: proxy.apifyProxyGroups,
            countryCode: proxy.countryCode || 'US',
        });
    } else if (proxy.proxyUrls) {
        proxyConfiguration = await Apify.createProxyConfiguration({
            proxyUrls: proxy.proxyUrls,
        });
    }

    return proxyConfiguration;
};
