const fs = require('fs'); 
const path = require('path');
const app = require('express')();
const port = process.env.PORT || 8000; 


import {isCached, getCachedPoem, cachePoem} from './cache.js';
import {readAllAuthors, readAuthorsPoems, readPoem} from './db.js';


let allAuthors = readAllAuthors('./collection'); 
let getPoem = (author, title, cb) => {
	if(isCached(author, title)){
		cb(getCachedPoem(author, title));
	}else{
		readPoem(author, title, (poem) =>{
			cb(poem);
			cachePoem(poem, author, title); 
		});
	}
};


app.get('/author', (req, res) =>{
	res.send(allAuthors);
});

app.get('/author/:authorName', (req, res) =>{
	readAuthorsPoems(req.params.authorName, (poemTitles, author) => {
		res.send(poemTitles);
	});
});

// app.get('/author/:authorName/poem/', (req, res) =>{
// 	res.send('all '+ req.params.authorName + "'s poems"); 
// });

app.get('/author/:authorName/poem/:poemTitle/', (req, res) =>{
	getPoem(req.params.authorName, req.params.poemTitle, (poem) =>{
		res.send(poem); 
	});
});


app.listen(port);