## What does Best Buy Products Scraper do?

Our free Best Buy product data scraper allows you to scrape product information from one of the most popular consumer electronics retailers: [bestbuy.com](https://www.bestbuy.com/)

Best Buy Products Scraper lets you extract data on: 

- Product categories
- Product names
- URLs
- Current prices
- Original prices
- Sales
- Ratings
- Availability

You can certainly use the official Best Buy API to download product information from Best Buy. But getting comprehensive data in machine-readable format is a little tricky, especially at scale, as there are limits to how much Best Buy product data you can get. Our Best Buy Products Scraper lets you overcome these limitations. 

## How much will it cost me to use?

Best Buy Products Scraper consumes 1 compute unit per 1,000 results. That means you will pay approx. 25 cents for 1,000 results.

## Input

- Insert the category URL from the 'Shop deals by category' section of the Best Buy website.

- Choose the maximum count of products to be scraped.

- Select a proxy option from the proxy box (recommended).

- Select the proxy country you want to us.

- Click *Run* and wait for the results to come in.

### Example

{"startUrls":[{"url":"https://www.bestbuy.com/site/promo/tv-deals"}],"proxy":{"useApifyProxy":true},"maxProducts":0}

## Output

- After the actor finishes its run, it will store the results in *Dataset*.

- Go to *Dataset*, and select the format you want from the export box.

### Example results

[{

"itemId": "6453312",

"itemName": "LG - 65\" Class C1 Series OLED 4K UHD Smart webOS TV",

"itemUrl": "https://www.bestbuy.com/site/lg-65-class-c1-series-oled-4k-uhd-smart-webos-tv/6453312.p?skuId=6453312",

"itemImg": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6453/6453312_sd.jpg;maxHeight=200;maxWidth=300",

"currency": "USD",

"currentPrice": 1799.99,

"originalPrice": 2099.99,

"sale": 300,

"rating": 4.8,

"inStock": true,

"category": []

},

{

"itemId": "6401726",

"itemName": "Samsung - 58\" Class 7 Series LED 4K UHD Smart Tizen TV",

"itemUrl": "https://www.bestbuy.com/site/samsung-58-class-7-series-led-4k-uhd-smart-tizen-tv/6401726.p?skuId=6401726",

"itemImg": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6401/6401726_sd.jpg;maxHeight=200;maxWidth=300",

"currency": "USD",

"currentPrice": 499.99,

"originalPrice": 569.99,

"sale": 70,

"rating": 4.5,

"inStock": true,

"category": []

},

{

"itemId": "6453620",

"itemName": "LG - 55” Class UP8000 Series LED 4K UHD Smart webOS TV",

"itemUrl": "https://www.bestbuy.com/site/lg-55-class-up8000-series-led-4k-uhd-smart-webos-tv/6453620.p?skuId=6453620",

"itemImg": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6453/6453620_sd.jpg;maxHeight=200;maxWidth=300",

"currency": "USD",

"currentPrice": 479.99,

"originalPrice": 599.99,

"sale": 120,

"rating": 4.6,

"inStock": true,

"category": []

},

## Notes

For more information on the Apify platform, Apify actors, and the Apify CLI, check out the links below.

-  [Apify SDK](https://sdk.apify.com/)

-  [Apify Actor documentation](https://docs.apify.com/actor)

-  [Apify CLI](https://docs.apify.com/cli)
