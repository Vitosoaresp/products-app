import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle("Products API")
    .setVersion("1.0")
    .setDescription("The products API description")
    .addTag("Product")
    .addTag("User")
    .addTag("Auth")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(Number(process.env.PORT) ?? 3333);
}
bootstrap();
