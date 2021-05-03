const fs = require('fs');

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

module.exports = {
    'get_user': () => {
        let fn = f_names[Math.floor(Math.random() * f_names.length)].toLowerCase();
        let ln = l_names[Math.floor(Math.random() * l_names.length)].toLowerCase();
        let em = emails[Math.floor(Math.random() * emails.length)];

        let user = {
            'username': fn[0] + ln,
            'email': fn + '.' + ln + Math.floor(Math.random() * 9999) + '@' + em,
            'password': ''
        }

        for(let i = 0; i < Math.round(Math.random() * 2) + 2; i++)
        {
            user.password = user.password + words[Math.floor(Math.random() * words.length)] + ' ';
        }

        user.password = masquerade(user.password + Math.round(Math.random() * 9999));

        return user;
    }
}