const fs = require('fs');
const path = require('path');

const portfolios = [
    { file: 'carrkaiden1212.html', name: 'Kaiden Carr', title: 'Full Stack Developer' },
    { file: 'Antony_Hallick.html', name: 'Antony Hallick', title: 'Professional with Diverse Industry Experience' },
    { file: 'Mason.html', name: 'Mason', title: 'Discord Design Expert' },
    { file: 'Dudwig.html', name: 'Dudwig', title: 'Design Specialist' },
    { file: '__nicow.html', name: '__nicow', title: 'Design Specialist' },
    { file: 'Leo_Sicolo.html', name: 'Leo Sicolo', title: 'IT Professional & 3D Printing Enthusiast' },
    { file: 'yescat.html', name: 'yescat', title: 'Design Specialist' },
    { file: 'myfloweralla.html', name: 'myfloweralla', title: 'Designer & Creative Experimenter' },
    { file: 'FluffyChick458.html', name: 'FluffyChick458', title: 'Server Owner & Community Manager' },
    { file: 'toxiqxprime.html', name: 'denji', title: 'Video & Gameplay Editor' }
];

function escapeAttr(value) {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

const dir = path.join(__dirname, '..', 'portfolios');

portfolios.forEach(({ file, name, title }) => {
    const pageTitle = escapeAttr(`${name} - ${title}`);
    const p = path.join(dir, file);
    let html = fs.readFileSync(p, 'utf8');
    html = html.replace(
        /<meta property="og:title" content="[^"]*">/,
        `<meta property="og:title" content="${pageTitle}">`
    );
    html = html.replace(
        /<meta name="twitter:title" content="[^"]*">/,
        `<meta name="twitter:title" content="${pageTitle}">`
    );
    fs.writeFileSync(p, html, 'utf8');
    console.log('ok:', file, pageTitle);
});

const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
const indexTitle = escapeAttr('best-portfolios - Developer Portfolios');
indexHtml = indexHtml.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${indexTitle}">`);
indexHtml = indexHtml.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${indexTitle}">`);
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('ok: index.html');
