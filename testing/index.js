"use strict";
exports.ButtonClickEvents = {
    left: { button: 0 },
    right: { button: 2 }
};
function click(el, eventObj) {
    if (eventObj === void 0) { eventObj = exports.ButtonClickEvents.left; }
    if (el instanceof HTMLElement) {
        el.click();
    }
    else {
        el.triggerEventHandler('click', eventObj);
    }
}
exports.click = click;
//# sourceMappingURL=index.js.map