import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationsController } from "./applications.controller";
import { Application } from "./applications.entity";
import { ApplicationsService } from "./applications.service";
import { Module } from "@nestjs/common";
import { JobsModule } from "src/jobs/jobs.module";

@Module({
   imports: [
    TypeOrmModule.forFeature([Application]),
    JobsModule,
  ],
  providers: [ApplicationsService],
  controllers: [ApplicationsController],
})
export class ApplicationModule {}
