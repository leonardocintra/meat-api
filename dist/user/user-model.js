"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    {
        name: 'Leonardo Cintra',
        email: 'leonardo.ncintra@outlook.com'
    },
    {
        name: 'Juliana Cintra',
        email: 'juliana.ncintra@outlook.com'
    },
    {
        name: 'Sara Cintra',
        email: 'sara.ncintra@outlook.com'
    },
    {
        name: 'Daniel Cintra',
        email: 'daniel.ncintra@outlook.com'
    },
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
}
exports.User = User;
