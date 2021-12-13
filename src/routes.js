const Apify = require('apify');

const { utils: { log } } = Apify;

/**
 * @param  {Puppeteer.page} page
 */
async function pushData(page) {
    const products = await page.evaluate(() => {
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

        const items = [];
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
    return products;
}

/**
 * @param  {Array} products
 * @param  {Object} state
 */
function getRemainProductsCnt(products, state) {
    const { maxProductsCnt, currentProductsCnt } = state.saved;
    const remaining = Math.min(maxProductsCnt - currentProductsCnt, products.length);
    state.saved.currentProductsCnt += remaining;
    return maxProductsCnt > 0 ? remaining : products.length;
}

/**
 * @param  {Request} {request
 * @param  {Page} page
 * @param  {{requestQueue}}} crawler
 * @param  {Object} state
 */
exports.handleList = async ({ request, page, crawler: { requestQueue } }, state) => {
    log.info('Page opened.', { url: request.url });
    // extract the products data from the current page and store them into the default storage
    const products = await pushData(page);
    const remaining = getRemainProductsCnt(products, state);
    Apify.pushData(products.slice(0, remaining));
    if (remaining === 0 || remaining < products.length) {
        log.info('Reached the maximum products.');
    } else {
        // get the next url
        const nextUrl = await page.$eval('a.sku-list-page-next', (option) => option.href);
        if (nextUrl) {
            requestQueue.addRequest({
                url: nextUrl,
            });
        }
    }
};
