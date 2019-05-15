async function _getFetch ( params ) {
    //const url = 'http://localhost:3000/jaser-api/'
    const url = 'https://dry-earth-43609.herokuapp.com/jaser-api/'
    
    try {
        return await fetch(url + params).then(response => response.ok ? response.json() : false)
    } catch (err) {
        console.error (err)
    }
}

module.exports = { _getFetch }