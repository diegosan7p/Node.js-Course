const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // if (req.url === "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "index.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  // }

  // if (req.url === "/api/users") {
  //   const users = [
  //       {name: 'Bob Smith', age:40},
  //       {name: 'Diego Santana ', age:24},
  //   ];
  //   res.writeHead(200, { "Content-type": "application/json" });
  //   res.end(JSON.stringify(users))
  // }

  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

 // Extension of file
 let extname = path.extname(filePath);

 // Initial content type
 let contetType = 'text/html';

 // Check ext and set content type
 switch(extname) {
   case '.js':
     contetType = 'text/javascript';
     break;
   case '.css':
      contetType = 'text/css';
     break;
  case '.json':
        contetType = 'application/json';
     break;
  case '.png':
          contetType = 'image/png';
     break;
  case '.jpg':
      contetType = 'image/jpg';
     break;

 }

 // Read file
 fs.readFile(filePath, (err, content) =>{
   if(err){
     if(err.code == 'ENOENT') {
       // Page Not Found
       fs.readFile(path.join(__dirname, 'public', '404.html'), (err, contet)=>{
         res.writeHead(200, { 'Contet-Type': 'text/html'});
         res.end(content, 'utf8');
       })

     } else {
       // Some server error
       res.writeHead(500);
       res.end(`Server Error ${err.code}`);
     }
   } else {
     // Success
     res.writeHead(200, { 'Contet-Type': contetType});
     res.end(content, 'utf8');
   }
 })

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening in ${PORT}`));
