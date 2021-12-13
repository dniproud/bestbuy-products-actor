const Apify = require('apify');

/**
 * @param {proxy} proxy Input
 * @returns proxyConfiguration: Apify.createProxyConfiguation()
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
