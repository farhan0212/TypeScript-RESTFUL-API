"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
// membuat export function respon kepada user yaitu name, dan username
function toUserResponse(user) {
    return {
        name: user.name,
        username: user.username,
    };
}
exports.toUserResponse = toUserResponse;
