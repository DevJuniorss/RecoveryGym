import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = process.env.PORT ?? 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(app.get(HttpAdapterHost)));
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Soficit API')
    .setDescription(
      'Essa api tem o objetivo de gerenciar todo um sistema de academias',
    )
    .setVersion('1.0')
    .addTag('socifit')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(port);
}

bootstrap().then(
  () => {
    Logger.log(`Server is running in http://localhost:${port}/`);
    Logger.log(`Swagger is running in http://localhost:${port}/docs`);
  },
  (err) => Logger.error(err),
);
