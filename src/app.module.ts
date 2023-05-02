import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TestQuestionsModule } from "./test-questions/test-questions.module";
import { ResultsModule } from "./results/results.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://deathrow:deathrow@cluster0.bjji3qx.mongodb.net/test"
    ),
    AuthModule,
    TestQuestionsModule,
    ResultsModule,
  ],
})
export class AppModule {}
