"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseZipCode = exports.parseCountry = exports.parseState = exports.parseCity = exports.parseAddress = exports.parsePhone = exports.parsePassword = exports.parseEmail = exports.parseName = exports.parseId = exports.parseInt = void 0;
const parseId = (id) => {
    if (!id)
        return null;
    const parsed = Number(id);
    if (Number.isNaN(parsed) || parsed <= 0)
        return null;
    return parsed;
};
exports.parseId = parseId;
const parseInt = (value) => {
    if (!value)
        return null;
    const parsed = Number(value);
    if (Number.isNaN(parsed) || parsed <= 0)
        return null;
    return parsed;
};
exports.parseInt = parseInt;
const parseName = (name) => {
    if (!name || name.trim().length === 0)
        return null;
    return name.trim();
};
exports.parseName = parseName;
const parseEmail = (email) => {
    if (!email || email.trim().length === 0)
        return null;
    return email.trim();
};
exports.parseEmail = parseEmail;
const parsePassword = (password) => {
    if (!password || password.trim().length === 0)
        return null;
    return password.trim();
};
exports.parsePassword = parsePassword;
const parsePhone = (phone) => {
    if (!phone || phone.trim().length === 0)
        return null;
    return phone.trim();
};
exports.parsePhone = parsePhone;
const parseAddress = (address) => {
    if (!address || address.trim().length === 0)
        return null;
    return address.trim();
};
exports.parseAddress = parseAddress;
const parseCity = (city) => {
    if (!city || city.trim().length === 0)
        return null;
    return city.trim();
};
exports.parseCity = parseCity;
const parseState = (state) => {
    if (!state || state.trim().length === 0)
        return null;
    return state.trim();
};
exports.parseState = parseState;
const parseCountry = (country) => {
    if (!country || country.trim().length === 0)
        return null;
    return country.trim();
};
exports.parseCountry = parseCountry;
const parseZipCode = (zipCode) => {
    if (!zipCode || zipCode.trim().length === 0)
        return null;
    return zipCode.trim();
};
exports.parseZipCode = parseZipCode;
//# sourceMappingURL=validateRequest.js.map