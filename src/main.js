const Apify = require('apify');
const { handleList } = require('./routes');
const { proxyConfig } = require('./config');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const { startUrls, proxy } = await Apify.getInput();
    const requestList = await Apify.openRequestList('start-urls', startUrls);
    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await proxyConfig(proxy);

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        requestQueue,
        proxyConfiguration,
        useSessionPool: true,
        persistCookiesPerSession: true,
        launchContext: {
            useChrome: true,
        },
        handlePageFunction: async (context) => {
            return handleList(context);
        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});
