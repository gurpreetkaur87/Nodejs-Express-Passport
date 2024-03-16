import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import {VerifyCallback} from 'passport-oauth2';
import { findOrCreate} from "../../controllers/userController";
import 'dotenv/config';
import { Request } from "express"; 

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
      }
    }
  }

var GITHUB_clientID: string = process.env.GITHUB_CLIENT_ID;
var GITHUB_clientSecret: string = process.env.GITHUB_CLIENT_SECRET;
var CALL_BACK_URL = "http://localhost:8000/auth/github/callback";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: GITHUB_clientID,
        clientSecret: GITHUB_clientSecret,
        callbackURL: CALL_BACK_URL,
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 FIXED 😊*/
    async(req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        const user = findOrCreate(profile);
        if(user){
            done(null, user);
        }else{
            done(null, undefined, {error: "some error"});
        }
    }
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;