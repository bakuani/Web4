const http = require('http');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom/server');

require('@babel/register')({
    presets: [
        ['@babel/preset-env', { modules: 'auto' }],
        '@babel/preset-react'
    ],
    extensions: ['.js', '.jsx'],
    ignore: [/node_modules/, /\.css$/]
});

const App = require('./src/App.jsx').default;

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/styles.css') {
        const cssPath = path.join(__dirname, 'src', 'styles.css');
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
        return;
    }

    if (req.url === '/index.js') {
        const jsPath = path.join(__dirname, 'dist', 'index.js');
        fs.readFile(jsPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
        return;
    }

    const context = {};
    const appElement = React.createElement(
        ReactRouterDOM.StaticRouter,
        { location: req.url, context: context },
        React.createElement(App, null)
    );

    const appString = ReactDOMServer.renderToString(appElement);

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>SSR App</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div id="root">${appString}</div>
        <script src="/index.js"></script>
      </body>
    </html>
  `;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});

server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});