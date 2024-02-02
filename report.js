function printReport(pages){
    console.log("---\nPrinting report\n---")
    let sortable = [];
    for (var url in pages) {
        sortable.push([url, pages[url]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    for(var pair of sortable){
        console.log(`Fount ${pair[1]} internal links to ${pair[0]}`);
    }
}
module.exports = {
    printReport
}