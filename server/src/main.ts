import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger: ['error', 'warn', 'log'], cors: true,});
  const config = new DocumentBuilder()
    .setTitle('PLUG API')
    .setDescription('The PLUG API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1', app, document);
  await app.listen(3001);
}
bootstrap();
