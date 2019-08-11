import { Router, Request, Response } from "express";
import { UserService } from "../service/UserService";

class UserController {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public CreateUser(req: Request, res: Response) {
        try {
            if(!req.body.name) {
                return res.status(400).send('Invalid body parameter');
            }
            let user = { 
                Name: String(req.body.name)
            };
            UserService.getInstance().addUser(user)
            .then((doc: any) => {
                return res.status(200).send(doc);
            }).catch((err: any) => {
                res.status(500).send(err);
            });    
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public GetUsers(req: Request, res: Response) {
        try {
            UserService.getInstance().getUsers()
            .then((docs: any) => {
                return res.status(200).send(docs);
            }).catch((err: any) => {
                res.status(500).send(err);
            }); 
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public GetUser(req: Request, res: Response) {
        try {
            if(req.params.id) {
                UserService.getInstance().getUser(req.params.id)
                .then((doc: any) => {
                    return res.status(200).send(doc);
                }).catch((err: any) => {
                    res.status(500).send(err);
                });    
            } else {
                res.status(400).send('Invalid request id');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    routes() {
        this.router.post('/', this.CreateUser);
        this.router.get('/', this.GetUsers);
        this.router.get('/:id', this.GetUser);
    }
}

//export
const userController = new UserController();
userController.routes();

export default userController.router;