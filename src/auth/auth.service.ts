import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { UserDto } from "./dto/user.dto";
import { User } from "./schemas/user.schema";
import { Role, UserRole } from "./schemas/role.schema";
import { keys } from "src/keys/keys";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>
  ) {}
  async register(userDto: UserDto) {
    const candidate = await this.userModel.findOne({ email: userDto.email });

    if (!candidate) {
      const hashPassword = await bcryptjs.hash(userDto.password, 10);
      const newCandidate = {
        ...userDto,
        password: hashPassword,
        role: UserRole.USER,
      };
      const newUser = new this.userModel(newCandidate);
      await newUser.save();
      const role = new this.roleModel({
        userId: newUser._id,
        role: UserRole.USER,
      });
      await role.save();
    } else {
      return { msg: "error" };
    }
  }

  async login(userDto: UserDto) {
    const candidate = await this.userModel.findOne({ email: userDto.email });
    if (candidate) {
      const isSame = await bcryptjs.compare(
        userDto.password,
        candidate.password
      );
      if (isSame) {
        const role = await this.roleModel.findOne({ userId: candidate._id });

        const JWTtoken = jwt.sign(
          {
            name: candidate.name,
            id: candidate._id,
            role: role.role,
            email: candidate.email,
          },
          keys.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
        return { msg: "Succes", token: JWTtoken };
      }
    } else {
      return { msg: "error" };
    }
  }
}
