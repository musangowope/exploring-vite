import products from './products.csv'

const insertCsvToElement = (data: []) => {
    const element = document.querySelector('pre')
    if(element) {
        element.textContent = JSON.stringify(data)
    }
}

insertCsvToElement(products)

if(import.meta.hot) {
 import.meta.hot.on('csv-update', ({ url, data }) => {
     console.log(`[vite] hot updated: ${url}`)
     insertCsvToElement(data)
 })
}
