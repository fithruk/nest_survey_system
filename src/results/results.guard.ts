import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { keys } from "../keys/keys";
import jwt from "jsonwebtoken";

@Injectable()
export class ResultsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      return false;
    }

    try {
      const data = jwt.decode(token, { complete: true }) as {
        [key: string]: any;
      };
      if (data.payload.exp > Math.floor(Date.now() / 1000)) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}

@Injectable()
export class ResultsGuardAdmin implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      return false;
    }

    try {
      const data = jwt.decode(token, { complete: true }) as {
        [key: string]: any;
      };

      if (
        data.payload.exp > Math.floor(Date.now() / 1000) &&
        data.payload.role === "admin"
      ) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}
