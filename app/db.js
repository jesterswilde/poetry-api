const fs = require('fs'); 
const path = require('path'); 

const readAllAuthors = (srcpath) => {
  return fs.readdirSync(srcpath).filter((file) => {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
};

const readPoem = (author, title, cb) =>{
	console.log('reading', author, title); 
	fs.readFile("./collection/"+author+"/"+title+".json", (err, poemJSON) => {
		if(err){
			console.log(err);
		}else{
			let parsedPoem = JSON.parse(poemJSON);
			console.log(parsedPoem); 
			cb(parsedPoem, author, title); 
		}
	});
};

const readAuthorsPoems = (author, cb) => {
	fs.readdir('./collection/'+author, (err, poemTitles) => {
		let filteredTitles = poemTitles.map((title)=> title.substr(0, title.lastIndexOf('.')));
		cb(filteredTitles, author); 
	});
};

export {readAllAuthors, readAuthorsPoems, readPoem};	