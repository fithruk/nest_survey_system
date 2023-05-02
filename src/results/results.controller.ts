import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ResultsService } from "./results.service";
import { ResultsDto } from "./dto/results.dto";
import { PermissionDto } from "./dto/permission.dto";
import { ResultsGuard, ResultsGuardAdmin } from "./results.guard";
import { TestNameDto } from "./dto/test-name.dto";

@Controller("/api")
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @Post("/results/permission")
  @UseGuards(ResultsGuard)
  getPermission(@Body() permissionDto: PermissionDto) {
    return this.resultsService.getPermission(permissionDto);
  }

  @Post("/results/add")
  addResults(@Body() resulstDto: ResultsDto) {
    this.resultsService.addResults(resulstDto);
  }

  @Get("/results/adminData")
  @UseGuards(ResultsGuardAdmin)
  checkIsAdmin() {
    return true;
  }

  @Post("/results/adminData")
  @UseGuards(ResultsGuardAdmin)
  getAllResults(@Body() testNameDto: TestNameDto) {
    return this.resultsService.getResults(testNameDto);
  }
}
