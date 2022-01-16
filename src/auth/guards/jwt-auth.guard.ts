/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor()
    {
        console.log("jwt guard")
        super()
    }
   
    
      handleRequest(err, user, info) {
        console.log("handle requ")

        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        return user;
      }
}
