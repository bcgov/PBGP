import { ApplicationModule } from '../application/application.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../app.module';
import { UserModule } from '../user/user.module';

export const Documentation = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('TBCM API Documentation')
    .setDescription('API')
    .setVersion(`1.0.0`)
    .addBearerAuth()
    .build();

  const baseDocument = SwaggerModule.createDocument(app, options, {
    include: [AppModule, ApplicationModule, UserModule],
  });

  SwaggerModule.setup('api', app, baseDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      displayRequestDuration: true,
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
    },
  });
};
