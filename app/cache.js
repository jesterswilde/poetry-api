let cache = {}; 

const isCached = (author, title) => {
	if(cache[author] === undefined || cache[author][title] === undefined){
		return false; 
	}
	return true; 
};

const getCachedPoem = (author, title) => {
	return cache[author][title];
};

const cachePoem = (poemJSON, author, title) => {
	cache[author] = cache[author] || {}; 
	cache[author][title] = poemJSON;
};

module.exports = {
	isCached: isCached,
	getCachedPoem: getCachedPoem,
	cachePoem: cachePoem
};
export {isCached, getCachedPoem, cachePoem}; 