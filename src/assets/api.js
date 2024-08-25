export function fetchData() {
    const apiKey = 'ZVRJBA9SOU7QJPMP';
    const symbol = 'AAPL'; 
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const timeSeries = data['Time Series (Daily)'];
            return Object.keys(timeSeries).map(date => ({
                Date: date,
                Open: +timeSeries[date]['1. open'],
                High: +timeSeries[date]['2. high'],
                Low: +timeSeries[date]['3. low'],
                Close: +timeSeries[date]['4. close'],
                Volume: +timeSeries[date]['5. volume'],
            }));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            return []; // Return an empty array on error
        });
}
