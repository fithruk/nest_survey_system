import { Injectable, Param } from "@nestjs/common";
import { TestDto } from "./dto/test.dto";
import { Test } from "./schemas/test.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SelectedTestDto } from "./dto/selected-test.dto";

@Injectable()
export class TestQuestionsService {
  constructor(@InjectModel(Test.name) private testModel: Model<Test>) {}
  async getAllTests() {
    return await this.testModel.find();
  }

  async addNewTest(testDto: TestDto) {
    const newTest = new this.testModel(testDto);
    await newTest.save();
  }

  async getSelectedTest(selectedTestDto: SelectedTestDto) {
    return await this.testModel.find({
      accordingToTest: selectedTestDto.testName,
    });
  }
}
