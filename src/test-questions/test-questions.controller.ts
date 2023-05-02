import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { TestQuestionsService } from "./test-questions.service";
import { TestDto } from "./dto/test.dto";
import { SelectedTestDto } from "./dto/selected-test.dto";
import { TestquestionsGuard } from "./test-questions.guard";

@Controller("/api")
export class TestQuestionsController {
  constructor(private testService: TestQuestionsService) {}

  @Get("/tests/all")
  @UseGuards(TestquestionsGuard)
  getAllTests() {
    return this.testService.getAllTests();
  }

  @Post("/tests/add")
  addNewTest(@Body() testDto: TestDto) {
    return this.testService.addNewTest(testDto);
  }

  @Post("/tests/all")
  @UseGuards(TestquestionsGuard)
  getSelectedTest(@Body() selectedTestDto: SelectedTestDto) {
    return this.testService.getSelectedTest(selectedTestDto);
  }
}
