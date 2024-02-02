const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')
function main(){
    const testSite = 'https://wagslane.dev'
    if(process.argv.length != 3){
        console.log('error');
        return;
    }
    const baseURL = process.argv[2];
    console.log(`Crawler starting at baseURL: ${baseURL}`);
    crawlPage(baseURL,baseURL,{})
    .then(report =>{
        printReport(report);
    })
}

main()