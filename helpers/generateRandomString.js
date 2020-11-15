// generate random alphanumeric string according to length and char types
export function generateRandomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1)
        mask += 'abcdefgh';
    if (chars.indexOf('A') > -1)
        mask += 'ABCDEFGH';
    if (chars.indexOf('#') > -1)
        mask += '123456789';
    if (chars.indexOf('!') > -1)
        mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}