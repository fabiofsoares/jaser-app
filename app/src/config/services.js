function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return this._addIndex(array);
}

function addIndex(array) {
    for(let i = 0; i < array.length; i++){
        array[i].index = i + 1;
    }
    return array;
}

module.exports = { shuffleArray, addIndex }