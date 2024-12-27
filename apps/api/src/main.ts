import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.use(
        helmet({
            crossOriginEmbedderPolicy: false,
            contentSecurityPolicy: {
                directives: {
                    imgSrc: [
                        `'self'`,
                        'data:',
                        'apollo-server-landing-page.cdn.apollographql.com',
                        'validator.swagger.io',
                    ],
                    styleSrc: [`'self'`, `'unsafe-inline'`],
                    scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
                    manifestSrc: [
                        `'self'`,
                        'apollo-server-landing-page.cdn.apollographql.com',
                    ],
                    frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
                },
            },
        }),
    );
    const config = new DocumentBuilder()
        .setTitle('PAH API')
        .setDescription('The PAH API description')
        .setVersion('1.0')
        .addTag('pah')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
