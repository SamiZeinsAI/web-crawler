const { crawlPage } = require('./crawl.js')
function main(){
    if(process.argv.length != 3){
        console.log('error');
        return;
    }
    const baseURL = process.argv[2];
    console.log(`Crawler starting at baseURL: ${baseURL}`);
    crawlPage(baseURL,baseURL,{})
    .then(report =>{
        console.log(report);
    })
}

main()