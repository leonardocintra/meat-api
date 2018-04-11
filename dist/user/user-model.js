"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    {
        id: "1",
        name: 'Leonardo Cintra',
        email: 'leonardo.ncintra@outlook.com'
    },
    {
        id: "2",
        name: 'Juliana Cintra',
        email: 'juliana.ncintra@outlook.com'
    },
    {
        id: "3",
        name: 'Sara Cintra',
        email: 'sara.ncintra@outlook.com'
    },
    {
        id: "4",
        name: 'Daniel Cintra',
        email: 'daniel.ncintra@outlook.com'
    },
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
    static findById(id) {
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id === id);
            let user = undefined;
            if (filtered.length > 0) {
                user = filtered[0];
            }
            resolve(user);
        });
    }
}
exports.User = User;
