const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

let emails  = JSON.parse(fs.readFileSync('lists/emails.json'));
let words   = JSON.parse(fs.readFileSync('lists/words.json'));
let f_names = JSON.parse(fs.readFileSync('lists/first_names.json'));
let l_names = JSON.parse(fs.readFileSync('lists/last_names.json'));

function masquerade(input)
{
    if(Math.round(Math.random()))
        input = input.replaceAll(/[Ss]/g, '$');
    
    if(Math.round(Math.random()))
        input = input.replaceAll(/[Ii]/g, '!');

    if(Math.round(Math.random()))
        input = input.replaceAll(/[ ]/g, '_');
    else
        input = input.replaceAll(/[ ]/g, '-');

    if(Math.round(Math.random()))
        input = input.replaceAll(/[Aa]/g, '@');

    if(Math.round(Math.random()))
        input = input.replaceAll(/[Bb]/g, '8');

    if(Math.round(Math.random()))
        input = input.replaceAll(/[Oo]/g, '0');

    if(Math.round(Math.random()))
        input = input.replaceAll(/[Ee]/g, '3');

    if(Math.round(Math.random()))
        input = input.replaceAll(/[Tt]/g, '7');

    if(Math.round(Math.random()))
        input = input.replaceAll(/[Gg]/g, '9');

    return input;
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;

    let fn = f_names[Math.floor(Math.random() * f_names.length)].toLowerCase();
    let ln = l_names[Math.floor(Math.random() * l_names.length)].toLowerCase();
    let em = emails[Math.floor(Math.random() * emails.length)];

    let content = {
        'username': fn[0] + ln,
        'email': fn + '.' + ln + Math.floor(Math.random() * 9999) + '@' + em,
        'password': ''
    }

    for(let i = 0; i < Math.round(Math.random() * 2) + 2; i++)
    {
        content.password = content.password + words[Math.floor(Math.random() * words.length)] + ' ';
    }

    content.password = masquerade(content.password + Math.round(Math.random() * 9999));

    res.setHeader('username', content.username);
    res.setHeader('email', content.email);
    res.setHeader('password', content.password);

    res.end(JSON.stringify(content));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});