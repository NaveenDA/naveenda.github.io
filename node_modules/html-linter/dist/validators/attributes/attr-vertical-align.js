"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttrVerticalAlign = /** @class */ (function () {
    function AttrVerticalAlign() {
    }
    AttrVerticalAlign.getIndentation = function (line) {
        var tagRegex = /<[a-zA-Z0-9-]+\s/;
        if (tagRegex.test(line)) {
            var tagStartIdx = line.search(tagRegex);
            var tagEndIdx = line.indexOf(' ', tagStartIdx);
            if (tagEndIdx !== -1) {
                var tag = line.substring(tagStartIdx + 1, tagEndIdx);
                if (line.indexOf(">") === -1) {
                    return tagEndIdx + line.substring(tagEndIdx).search(/\S/);
                }
                else {
                    return -1;
                }
            }
        }
    };
    return AttrVerticalAlign;
}());
exports.AttrVerticalAlign = AttrVerticalAlign;
