const http = require('http');
const https = require('https');

hexo.extend.tag.register('github_include', function (args) {
    const path = args[0];
    if (!path) {
        throw new Error(`github_include requires a path`);
    }
    const lang = args[1] || '';
    const url = `https://raw.githubusercontent.com/${path}`;
    return httpGet(url)
        .then((code) => renderCode(code, lang));
}, { async: true });

function httpGet(url) {
    const client = url.startsWith('https') ? https : http;
    const options = {
        headers: {
            'User-Agent': 'Hexo'
        }
    }
    return new Promise((resolve, reject) => {
        const req = client.request(url, options, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 400) {
                reject(new Error(`Fetching ${url} returned status code ${res.statusCode} ${res.statusMessage}.`));
            }
            const chunks = [];
            res.on('error', (e) => reject(e));
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => {
                const allChunks = Buffer.concat(chunks).toString();
                resolve(allChunks);
            });
        });

        req.end();
    })
}

function renderCode(code, lang) {
    const markdown = `\`\`\`${lang}\n${code}\n\`\`\``;
    return hexo.render.render({
        text: markdown,
        engine: 'markdown'
    });
}