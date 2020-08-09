const fs = require('fs');
const http = require('http');
const url = require('url');
const addDataToTemplate = require('./modules/addDataToTemplate');

// console.log(fs);
const hello = 'hello!!!';
console.log(hello);

const fileRead = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(fileRead);

const newTextToAdd = `new text added`;
const textOut = `${fileRead} ${newTextToAdd} \nCreated on: ${Date.now()}`;

console.log(textOut);

fs.writeFileSync('./txt/output.txt', textOut);


// ASYNC

// console.log('ASYNC');
// fs.readFile('./txt/start.txt', 'utf-8', (error, asyncFileRead) => {
//     fs.readFile(`./txt/${asyncFileRead}.txt`, 'utf-8', (error, data2) => {
//         // console.log(`async result ${data2}`);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (error, dataToAppend) => {
//             console.log(`async result ${data2}`);
//             const toWrite = `${data2} \n${dataToAppend}`;
//             fs.writeFile(`./txt/full_text.txt`, toWrite, (err, result) => {
//                 console.log(result);
//             });
//         });
//     });
// });

//SERVER

const overviewTemplate = fs.readFileSync('./templates/template_overview.html', 'utf-8');
const productTemplate = fs.readFileSync('./templates/template_product.html', 'utf-8');
const cardTemplate = fs.readFileSync('./templates/template_card.html', 'utf-8');
const productsData = JSON.parse(fs.readFileSync('./dev-data/data.json', 'utf-8'));

const createProductCard = (templateToFill, cardData, addDataMethod) => {
   return addDataMethod(templateToFill, cardData);
};

const createCards = () => {
    return productsData.map((productData) => createProductCard(cardTemplate, productData, addDataToTemplate));
};

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    // OVERVIEW
    if(pathname === '/' || pathname === '/overview')  {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const productCards = createCards();
        const filledOverviewTemplate = overviewTemplate.replace(/{%PRODUCT_CARDS%}/g, productCards.join(''));
        res.end(filledOverviewTemplate);
    // PRODUCT
    } else if(pathname === '/product') {
        const { id } = url.parse(req.url, true).query;
        const productDataForId = productsData.find((product) => product.id === parseInt(id, 10) );
        const builtProductTemplate = addDataToTemplate(productTemplate, productDataForId);
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(builtProductTemplate);
    // API
    } else if(pathname === '/api') {
        fs.readFile('./dev-data/data.json', 'utf-8', (err, data) => {
            const productData = JSON.parse(data);
            res.writeHead(200, { 'Content-type': 'application/json' });

            res.end(data);
        });

    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
