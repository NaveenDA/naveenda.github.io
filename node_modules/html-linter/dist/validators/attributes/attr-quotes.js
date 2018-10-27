"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttrQuotes = /** @class */ (function () {
    function AttrQuotes() {
    }
    AttrQuotes.validate = function (attr, quotes) {
        var quoteVal = quotes === 'single' ? "'" : "\"";
        var split = attr.split('=');
        var attrQuotes = split[1].replace(/\s/g, '').charAt(0);
        return attrQuotes === quoteVal;
    };
    return AttrQuotes;
}());
exports.AttrQuotes = AttrQuotes;
