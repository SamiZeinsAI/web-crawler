const { JSDOM } = require('jsdom')

function normalizeURL(url){
    const urlObject = new URL(url);
    let normalizedURL = urlObject.host + urlObject.pathname;
    if (normalizedURL.length > 0 && normalizedURL.slice(-1) === '/'){
        normalizedURL = normalizedURL.slice(0,-1);
    }
    return normalizedURL
}

function getURLsFromHTML(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');
    const urls = []
    for(let i = 0; i < links.length; i++){
        try{
            if(links[i].href.slice(0,1) === '/'){ 
                urls.push(new URL(links[i].href,baseURL).href);
            }else{
                urls.push(new URL(links[i].href).href);
            }
        }catch(err){
            console.log(`${err.message}: ${links[i].href}`);
        }
    }
    return urls;
}

async function crawlPage(baseURL, currentURL, pages){
    if(new URL(currentURL).hostname != new URL(baseURL).hostname){
        return pages
    }
    const normalizedURL = normalizeURL(currentURL);
    if (normalizedURL in pages){
        pages[normalizedURL] += 1
        return pages
    }
    pages[normalizedURL] = normalizedURL == normalizeURL(baseURL) ? 0 : 1;
    try{
        const resp = await fetch(currentURL);
        const contentType = resp.headers.get('content-type');
        if(resp.status >= 400){
            console.log(`Response error, status code: ${resp.status}`);
        }else if (!contentType.includes('text/html')){
            console.log(`Non-html response: ${contentType}`);
        }else{
            const urls = getURLsFromHTML(await resp.text(),baseURL);
            for(const url of urls){
                pages = await crawlPage(baseURL,url,pages)
            }
        }
    }catch(err){
        console.log(err.message);
    }

    return pages
}




module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}