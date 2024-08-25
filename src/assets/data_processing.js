export function processData(rawData) {
    return rawData.map(d => {
        d.Date = new Date(d.Date);
        return d;
    });
}