const Apify = require('apify');
const { handleList } = require('./routes');
const { proxyConfig } = require('./config');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const { startUrls, proxy, maxProducts } = await Apify.getInput();
    const requestList = await Apify.openRequestList('start-urls', startUrls);
    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await proxyConfig(proxy);

    const state = await Apify.getValue('STATE') || { saved: { maxProductsCnt: maxProducts, currentProductsCnt: 0 } };
    Apify.events.on('persistState', async () => Apify.setValue('STATE', state));
    setInterval(() => log.info(`Current status: ${JSON.stringify(state.saved)}`), 20000);

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
            return handleList(context, state);
        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});
