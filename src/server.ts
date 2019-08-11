import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as cors from 'cors';
import { Request, Response, NextFunction } from "express";
import UserController from "./controller/User";
import HobbyController from "./controller/Hobby";

// server class

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        //Set up mongoose
        const MONGO_URI = 'mongodb://localhost/user_hobbies';
        mongoose.connect(MONGO_URI || process.env.MONGO_URI, {  }, (err: any) => {
            if(!err) {
                console.log('Mongo DB is connected');
            }
        });

        // config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(cors());
    }

    private middleware(req: Request, res: Response, next: NextFunction): void {       
        if(req.headers.authorization === 'dXNlcjpob2JiaWVz') {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();
        this.app.use('/', this.middleware);
        this.app.use('/api/user', UserController);
        this.app.use('/api/hobby', HobbyController);
    }
}

export default new Server().app;