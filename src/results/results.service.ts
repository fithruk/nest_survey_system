import { Injectable } from "@nestjs/common";
import { Result } from "./schemas/result.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ResultsDto } from "./dto/results.dto";
import { PermissionDto } from "./dto/permission.dto";
import { TestNameDto } from "./dto/test-name.dto";

@Injectable()
export class ResultsService {
  constructor(@InjectModel(Result.name) private resultModel: Model<Result>) {}

  async addResults(resultsDto: ResultsDto) {
    const newResult = new this.resultModel(resultsDto);
    await newResult.save();
  }

  async getPermission(permissionDto: PermissionDto) {
    const candidate = await this.resultModel.findOne({
      email: permissionDto.email,
      testName: permissionDto.testName,
    });

    if (candidate) {
      return false;
    } else {
      return true;
    }
  }

  async getResults(testNameDto: TestNameDto) {
    return await this.resultModel.find({ testName: testNameDto.testName });
  }
}
