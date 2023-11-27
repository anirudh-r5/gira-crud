import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config, schema } from './config/postgresConfig';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { IssuesModule } from './modules/issues/issues.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: schema,
      expandVariables: true,
    }),
    PrismaModule,
    UsersModule,
    ProjectsModule,
    IssuesModule,
    CommentsModule,
  ],
})
export class AppModule {}
