/**
 * Local dev server with the same clean URLs as vercel.json (no Vercel needed).
 * Run: node dev-server.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const ROOT = __dirname;
const PORT = 5501;

const PORTFOLIO_SLUGS = new Set([
    'carrkaiden1212', 'Antony_Hallick', 'Mason', 'Dudwig', '__nicow',
    'Leo_Sicolo', 'yescat', 'myfloweralla', 'FluffyChick458', 'toxiqxprime', 'isjalen'
]);

const PAGE_ROUTES = {
    '/': '/index.html',
    '/index': '/index.html',
    '/contact': '/contact.html',
    '/projects': '/projects.html'
};

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.pdf': 'application/pdf'
};

function resolvePath(pathname) {
    const portfolioMatch = pathname.match(/^\/portfolios\/([^/]+?)(?:\.html)?$/);
    if (portfolioMatch && PORTFOLIO_SLUGS.has(portfolioMatch[1])) {
        return { redirect: '/' + portfolioMatch[1] + '' };
    }

    if (PAGE_ROUTES[pathname]) {
        return { file: PAGE_ROUTES[pathname] };
    }

    const slug = pathname.replace(/^\//, '').replace(/\.html$/, '');
    if (slug && !slug.includes('.') && PORTFOLIO_SLUGS.has(slug)) {
        return { file: '/portfolios/' + slug + '.html' };
    }

    if (pathname.endsWith('/')) {
        return { file: pathname + 'index.html' };
    }

    if (!path.extname(pathname)) {
        const withHtml = pathname + '.html';
        const full = path.join(ROOT, withHtml);
        if (fs.existsSync(full)) {
            return { file: withHtml };
        }
    }

    return { file: pathname };
}

function sendFile(res, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(err.code === 'ENOENT' ? 404 : 500);
            res.end(err.code === 'ENOENT' ? 'Not Found' : 'Server Error');
            return;
        }
        res.writeHead(200, { 'Content-Type': type });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url);
    const pathname = parsed.pathname || '/';
    const resolved = resolvePath(pathname);

    if (resolved.redirect) {
        res.writeHead(301, { Location: resolved.redirect + (parsed.search || '') });
        res.end();
        return;
    }

    const rel = resolved.file;
    const safe = path.normalize(path.join(ROOT, rel));
    if (!safe.startsWith(ROOT)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    sendFile(res, safe);
});

server.listen(PORT, '127.0.0.1', () => {
    console.log('Dev server: http://127.0.0.1:' + PORT);
    console.log('Example: http://127.0.0.1:' + PORT + '/carrkaiden1212');
});
