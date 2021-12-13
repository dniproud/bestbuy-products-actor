const Apify = require('apify');

const { utils: { log } } = Apify;

/**
 * @param {page} Page Context
 */
async function pushData(page) {
    const products = await page.evaluate(() => {
        const items = [];
        const getPrice = (element) => {
            return element ? parseFloat(element.innerText.replace(/[^\d.]/g, '')) : null;
        };
        const getRating = (element) => {
            return element ? parseFloat(element.innerText.replace(/^.* ([\d.]+) out of 5.*$/, '$1')) : null;
        };
        const category = [];
        document.querySelectorAll('.crumb-list-item a').forEach((crumb, j) => {
            if (j > 0) category.push(crumb.innerText);
        });

        document.querySelectorAll('.sku-item-list .sku-item').forEach((item) => {
            const itemId = item.getAttribute('data-sku-id');
            const itemName = item.querySelector('.sku-title h4.sku-header').innerText;
            const itemUrl = item.querySelector('.sku-header a').href;
            const itemImg = item.querySelector('img.product-image,.primary-image-grid img').src;
            const currentPrice = getPrice(
                item.querySelector('.priceView-customer-price span:first-child'),
            );
            const originalPrice = getPrice(
                item.querySelector('.pricing-price__regular-price'),
            );
            const sale = getPrice(
                item.querySelector('.pricing-price__savings'),
            );
            const inStock = item.querySelectorAll('button[data-button-state="ADD_TO_CART"]').length > 0;
            const rating = getRating(
                item.querySelector('.c-ratings-reviews p.visually-hidden'),
            );
            items.push({
                itemId,
                itemName,
                itemUrl,
                itemImg,
                currency: 'USD',
                currentPrice,
                originalPrice,
                sale,
                rating,
                inStock,
                category,
            });
        });

        return items;
    });
    log.debug('products:', products);
    Apify.pushData(products);
}

/**
 * @param {request} Request Context
 * @param {page} Page Context
 * @param {crawler} crawler Context
 * @param {requestQueue} RequestQueue Crawler
 */
exports.handleList = async ({ request, page, crawler: { requestQueue } }) => {
    log.info('Page opened.', { url: request.url });
    await pushData(page);
    const pageUrls = await page.$$eval('.page-item a', (options) => (
        options.map((option) => option.href)
    ));
    log.debug('Length of pages', { pageCount: pageUrls.length });
    if (pageUrls) {
        pageUrls.map((url) => {
            requestQueue.addRequest({
                url,
            });
        });
    }
};
