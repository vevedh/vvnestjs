import { NestFactory, FastifyAdapter} from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Herve de CHAVIGNY example')
    .setDescription('The Hervé de CHAVIGNY API description')
    .setVersion('1.0')
    .addTag('vvnestjs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
