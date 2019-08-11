import { Hobbies } from "../model/Hobbies";
import { User } from "../model/User";

export class HobbyService {

    private static _instance: HobbyService;

    static getInstance(): HobbyService {
        if(!HobbyService._instance) {
            HobbyService._instance = new HobbyService();
        }
        return HobbyService._instance;
    }

    public addHobby = (hobby: any, userId: any): Promise<any> => {
        return new Promise<any>((success, reject) => {
            hobby = new Hobbies(hobby);
            hobby.save((err: any, doc: any) => {
                if(err) {
                    return reject({
                        type: err.name,
                        message: err.message
                    });
                }
                if(doc) {
                    User.updateOne(
                        { _id: userId }, 
                        { $push: { Hobbies: doc.id }
                    }, (err: any, userDoc: any) => {
                        if(err) return reject(err);
                        if(userDoc) return success(userDoc);
                    });
                }
            });
        });
    }
    
    public getHobbies = (): Promise<any> => {
        return new Promise((success, reject) => {
            Hobbies.find((err: any, docs: any) => {
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

    public getHobby = (id: any): Promise<any> => {
        return new Promise((success, reject) => {
            Hobbies.findById(id).populate('Hobbies')
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

    public deleteHobbies = (id: any, userId: any): Promise<any> => {
        return new Promise<any>((success, reject) => {
            Hobbies.deleteOne( { _id: id }, (err: any) => {
                if(err) return reject(err);
                User.updateOne(
                    { _id: userId }, 
                    { $pull: { Hobbies: id }
                }, (err: any, docs: any) => {
                    if(err) return reject(err);
                    if(docs) return success(docs);
                });
            })
        });
    }
}