const http = require('http');
const fs = require('fs');

const rqListeners = (req, res) => {

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>my form</title></head>')
        res.write(`<body>
                    <form action='/message' method="POST">
                        <input name="message" type="text"  />
                        <button>Send</button>
                    </form>
                </body>`)
        res.write('</html>')
        return res.end()
    }
    console.log(req.url);
    // process.exit();
    if (req.url === '/message' && req.method === "POST") {

        // parse the buffer
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1]
            console.log(message);
            fs.writeFileSync('message.txt', message);
        })

        // write to file
        res.statusCode = 302;
        res.setHeader("Location", '/') //redirecting to main page
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>test page</title></head>')
    res.write('<body> <h1>hello world</h1> </body>')
    res.write('</html>')
    res.end()
}

const server = http.createServer(rqListeners)

server.listen(5000)