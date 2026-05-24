const fs = require('fs');
const path = require('path');

const SITE = 'https://www.best-portfolios.com';

const portfolios = [
    { file: 'carrkaiden1212.html', name: 'Kaiden Carr', title: 'Full Stack Developer', bio: 'Passionate about building web applications with modern technologies.', image: '/assets/images/profile-kaiden-carr.png', url: '/carrkaiden1212' },
    { file: 'Antony_Hallick.html', name: 'Antony Hallick', title: 'Professional with Diverse Industry Experience', bio: 'Professional with extensive experience across multiple industries.', image: '/assets/images/profile-antony-hallick.png', url: '/Antony_Hallick' },
    { file: 'Mason.html', name: 'Mason', title: 'Discord Design Expert', bio: 'Discord design expert specializing in community, design, and content creation.', image: '/assets/images/profile-mason.png', url: '/Mason' },
    { file: 'Dudwig.html', name: 'Dudwig', title: 'Design Specialist', bio: 'Creative designer specializing in clothing design and Discord embeds.', image: '/assets/images/profile-dudwig.png', url: '/Dudwig' },
    { file: '__nicow.html', name: '__nicow', title: 'Design Specialist', bio: 'This is your about me', image: '/assets/images/__nicow.webp', url: '/__nicow' },
    { file: 'Leo_Sicolo.html', name: 'Leo Sicolo', title: 'IT Professional & 3D Printing Enthusiast', bio: 'Passionate about IT and 3D printing with relevant qualifications.', image: '/assets/images/profile-leo-sicolo.png', url: '/Leo_Sicolo' },
    { file: 'yescat.html', name: 'yescat', title: 'Design Specialist', bio: 'Design specialist with experience moderating servers and building Discord communities.', image: '/assets/images/profile-yescat.png', url: '/yescat' },
    { file: 'myfloweralla.html', name: 'myfloweralla', title: 'Designer & Creative Experimenter', bio: 'Designer experimenting with new creative possibilities.', image: '/assets/images/profile-myfloweralla.png', url: '/myfloweralla' },
    { file: 'FluffyChick458.html', name: 'FluffyChick458', title: 'Server Owner & Community Manager', bio: 'Experienced server owner and community manager for Discord communities.', image: '/assets/images/profile-fluffy.png', url: '/FluffyChick458' },
    { file: 'toxiqxprime.html', name: 'denji', title: 'Video & Gameplay Editor', bio: 'Anime edits, gaming montages, Minecraft server design, and Discord community management.', image: '/assets/images/denji.notfound.webp', url: '/toxiqxprime' },
    { file: 'isjalen.html', name: 'isjalen', title: 'Discord Embed Builder & Designer', bio: 'Discord embed builder, Roblox clothing creator, and ER:LC livery designer.', image: '/assets/images/profile-kaiden-carr.png', url: '/isjalen' }
];

function escapeAttr(value) {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function buildTags({ name, title, bio, image, url }) {
    const pageTitle = `${name} - ${title}`;
    const pageUrl = SITE + url;
    const imageUrl = SITE + image;
    return [
        `    <meta name="description" content="${escapeAttr(bio)}">`,
        '    <meta property="og:type" content="website">',
        '    <meta property="og:site_name" content="best-portfolios">',
        `    <meta property="og:url" content="${pageUrl}">`,
        `    <meta property="og:title" content="${escapeAttr(pageTitle)}">`,
        `    <meta property="og:description" content="${escapeAttr(bio)}">`,
        `    <meta property="og:image" content="${imageUrl}">`,
        '    <meta name="twitter:card" content="summary_large_image">',
        `    <meta name="twitter:title" content="${escapeAttr(pageTitle)}">`,
        `    <meta name="twitter:description" content="${escapeAttr(bio)}">`,
        `    <meta name="twitter:image" content="${imageUrl}">`
    ].join('\n');
}

const root = path.join(__dirname, '..');
const portfoliosDir = path.join(root, 'portfolios');

portfolios.forEach((entry) => {
    const filePath = path.join(portfoliosDir, entry.file);
    let html = fs.readFileSync(filePath, 'utf8');
    if (html.includes('property="og:title"')) {
        console.log('skip (already has OG):', entry.file);
        return;
    }
    const tags = buildTags(entry);
    html = html.replace(
        /(<meta name="viewport"[^>]*>)/,
        `$1\n${tags}`
    );
    fs.writeFileSync(filePath, html);
    console.log('updated:', entry.file);
});

const indexPath = path.join(root, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
if (!indexHtml.includes('property="og:title"')) {
    const indexTags = buildTags({
        name: 'best-portfolios',
        title: 'Developer Portfolios',
        bio: 'Explore portfolios from talented developers, designers, and creators.',
        image: '/assets/images/profile-kaiden-carr.png',
        url: '/'
    });
    indexHtml = indexHtml.replace(
        /(<meta name="viewport"[^>]*>)/,
        `$1\n${indexTags}`
    );
    fs.writeFileSync(indexPath, indexHtml);
    console.log('updated: index.html');
}
