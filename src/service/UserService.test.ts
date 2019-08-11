import * as mongoose from 'mongoose';
import { expect } from "chai";
import { UserService } from "./UserService";

describe('User service', () => {
    const MONGO_URI = 'mongodb://localhost/user_hobbies_test';
    let userId: any;
    before('connection initialization', (done) => {
        mongoose.connect(MONGO_URI, { })
        .then(() => {
            done();
        });
    });

    it('add user without detail', (done) => {
        UserService.getInstance().addUser({}).catch(() => { done(); })
    });

    it('add user with mandatory detail', (done) => {
        let user = {
            Name: 'TestUser'
        };
        UserService.getInstance().addUser(user).then((data) => { 
            userId = data.id;
            done(); 
        })
    });

    it('Get user by userid', () => {
        UserService.getInstance().getUser(userId).then((data) => {
            expect(data.id).to.equal(userId);
        });
    });

    after('Dropping test db and closing connection', (done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});