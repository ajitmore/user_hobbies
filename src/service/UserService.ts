import { User } from "../model/User";

export class UserService {

    private static _instance: UserService;

    static getInstance(): UserService {
        if(!UserService._instance) {
            UserService._instance = new UserService();
        }
        return UserService._instance;
    }

    public addUser = (user: any): Promise<any> => {
        return new Promise<any>((success, reject) => {
            user = new User(user);
            user.save((err: any, doc: any) => {
                if(err) {
                    return reject({
                        type: err.name,
                        message: err.message
                    });
                }
                return success(doc);
            });
        });
    }
    
    public getUsers = (): Promise<any> => {
        return new Promise((success, reject) => {
            User.find((err: any, docs: any) => {
                if(err) {
                    return reject({
                        type: err.name,
                        message: err.message
                    });
                }
                return success(docs);
            });
        });
    }

    public getUser = (id: any): Promise<any> => {
        return new Promise((success, reject) => {
            User.findById(id).populate('Hobbies')
            .exec((err: any, doc: any) => {
                if(err) {
                    return reject({
                        type: err.name,
                        message: err.message
                    });
                }
                return success(doc);
            });
        });
    }

    public updateUser = (user: any): Promise<any> => {
        return new Promise((success, reject) => {
            User.updateOne( { _id: user.id}, user, (err: any, doc: any) => {
                if(err) return reject(err);
                if(doc) return success(doc);
            });
        });
    }

    public deleteUser = (id: any): Promise<any> => {
        return new Promise((success, reject) => {
            User.deleteOne( { _id: id}, (err: any) => {
                if(err) return reject(err);
                return success();
            });
        });
    }
}