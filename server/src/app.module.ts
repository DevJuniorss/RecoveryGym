//import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { AuthModule } from './modules/auth/auth.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { UserModule } from './modules/user/user.module';

//import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StudentModule } from './modules/student/student.module';
import { AnamnesisModule } from './modules/anamnesis/anamnesis.module';
import { FollowUpModule } from './modules/followup/followup.module';
import { NoticeModule } from './modules/notice/notice.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    NoticeModule,
    TeacherModule,
    StudentModule,
    FollowUpModule,
    AnamnesisModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
