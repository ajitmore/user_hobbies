import { Router, Request, Response } from "express";
import { HobbyService } from "../service/HobbyService";

class HobbyController {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public CreateHobby(req: Request, res: Response) {
        try {
            if(!req.body.name || !req.body.passionlevel || !req.body.year || !req.params.userId) {
                return res.status(400).send('Invalid body parameter');
            }
    
            let hobby = { 
                Name: String(req.body.name),
                PassionLevel: String(req.body.passionlevel),
                Year: String(req.body.year),
            };
            
            HobbyService.getInstance().addHobby(hobby, req.params.userId)
            .then((doc: any) => {
                return res.status(200).send(doc);
            }).catch((err: any) => {
                res.status(500).send(err);
            });    
        } catch (error) {
            res.status(500).send(error);   
        }        
    }

    public deleteHobby(req: Request, res: Response) {
        try {
            if(!req.params.id || !req.params.userId) {
                return res.status(400).send('Invalid request')
            }
            HobbyService.getInstance().deleteHobbies(req.params.id, req.params.userId)
            .then((doc: any) => {
                return res.status(200).send(doc);
            }).catch((err: any) => {
                return res.status(400).send(err);
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    routes() {
        this.router.post('/:userId', this.CreateHobby);
        this.router.delete('/:id/:userId', this.deleteHobby)
    }
}

//export
const hobbyController = new HobbyController();
hobbyController.routes();

export default hobbyController.router;