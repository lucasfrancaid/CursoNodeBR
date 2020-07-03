const http = require('http');

const PORT = 3333;

http.createServer((request, response) => {
    response.end('Hello Node!')
})
.listen(PORT, () => console.log(`Listening on port ${PORT}!`))