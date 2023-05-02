import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { UserDto } from "./dto/user.dto";

@Controller("/api")
export class AuthcontrollerController {
  constructor(private authService: AuthService) {}

  @Post("/users/register")
  register(@Body() userDto: UserDto) {
    this.authService.register(userDto);
  }

  @Post("/users/login")
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }
}
