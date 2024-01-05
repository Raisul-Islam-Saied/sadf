function nextIndex(current, index) {
    const indexOfCurrent = index.indexOf(current);
    if (indexOfCurrent === index.length) {
        return "not applicable"
    } else {
        return index[indexOfCurrent + 1]
    }
}
module.exports = { nextIndex }