const NodeCache = require("node-cache");
const nodecache = new NodeCache();
const setNodeCache = (key, val) => {
    let oldCache = []
    const isOldDataExist = nodecache.has(key);
    if (isOldDataExist) {
        oldCache = nodecache.get(key)
    }

    nodecache.set(key, [...oldCache, val])
}
module.exports = { nodecache, setNodeCache }