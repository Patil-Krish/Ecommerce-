/**
 * Native Node.js Static Web Server for Akira Perfume website
 * 
 * Features:
 * - Serves HTML, CSS, JavaScript, and dynamic assets (PNG, JPG, SVG, Logos).
 * - Runs locally on port 3000 (http://localhost:3000).
 * - Automatically opens the default browser once the server starts.
 * - Zero external dependencies.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const PUBLIC_DIR = __dirname; // Current directory

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    // 1. Resolve requested path
    let reqPath = req.url.split('?')[0]; // Strip query strings
    if (reqPath === '/') {
        reqPath = '/index.html';
    }

    const filePath = path.join(PUBLIC_DIR, reqPath);

    // Security check: Make sure requested file is inside PUBLIC_DIR
    const relative = path.relative(PUBLIC_DIR, filePath);
    const isSafe = relative && !relative.startsWith('..') && !path.isAbsolute(relative);
    if (!isSafe && reqPath !== '/index.html') {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    // 2. Check if file exists
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        // 3. Resolve Content Type
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // 4. Serve File
        res.writeHead(200, { 'Content-Type': contentType });
        const stream = fs.createReadStream(filePath);
        stream.on('error', (streamErr) => {
            console.error('Stream read error:', streamErr);
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
        });
        stream.pipe(res);
    });
});

server.listen(PORT, () => {
    const localUrl = `http://localhost:${PORT}`;
    console.log(`\n==================================================`);
    console.log(` Akira Perfumes Server is running!`);
    console.log(` Local Address: ${localUrl}`);
    console.log(` Serving directory: ${PUBLIC_DIR}`);
    console.log(`==================================================\n`);

    // Automatically open browser in Windows
    const openCmd = `start ${localUrl}`;
    console.log(`Launching web browser: ${openCmd}...`);
    
    exec(openCmd, (execErr) => {
        if (execErr) {
            console.error('Failed to open browser automatically:', execErr.message);
            console.log(`Please manually navigate to ${localUrl} in your browser.`);
        } else {
            console.log('Browser opened successfully!');
        }
    });
});
