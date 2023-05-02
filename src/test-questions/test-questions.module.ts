import { Module } from "@nestjs/common";
import { TestQuestionsController } from "./test-questions.controller";
import { TestQuestionsService } from "./test-questions.service";
import { Test, TestSchema } from "./schemas/test.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]),
  ],
  controllers: [TestQuestionsController],
  providers: [TestQuestionsService],
})
export class TestQuestionsModule {}
