/**
 * live-server middleware: same clean URLs as vercel.json rewrites.
 * Usage: npx live-server --port=5501 --host=127.0.0.1 --no-browser --middleware=./dev-middleware.js
 */
const url = require('url');

const PORTFOLIO_SLUGS = new Set([
    'carrkaiden1212',
    'Antony_Hallick',
    'Mason',
    'Dudwig',
    '__nicow',
    'Leo_Sicolo',
    'yescat',
    'myfloweralla',
    'FluffyChick458',
    'toxiqxprime',
    'isjalen'
]);

const PAGE_ROUTES = {
    contact: '/contact.html',
    projects: '/projects.html'
};

module.exports = function () {
    return function (req, res, next) {
        const parsed = url.parse(req.url);
        let path = parsed.pathname || '/';
        const query = parsed.search || '';

        const portfolioMatch = path.match(/^\/portfolios\/([^/]+?)(?:\.html)?$/);
        if (portfolioMatch && PORTFOLIO_SLUGS.has(portfolioMatch[1])) {
            res.writeHead(301, { Location: '/' + portfolioMatch[1] + query });
            res.end();
            return;
        }

        if (PAGE_ROUTES[path.slice(1)]) {
            req.url = PAGE_ROUTES[path.slice(1)] + query;
            return next();
        }

        const slug = path.replace(/^\//, '').replace(/\.html$/, '');
        if (slug && !slug.includes('.') && PORTFOLIO_SLUGS.has(slug)) {
            req.url = '/portfolios/' + slug + '.html' + query;
        }

        next();
    };
};
