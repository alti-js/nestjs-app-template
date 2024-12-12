import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    app.connectMicroservice({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: config.get('kafka.clientId'),
                brokers: config.get('kafka.brokers'),
                retry: {
                    retries: config.get('kafka.retryCount'),
                },
            },
            consumer: {
                groupId: config.get('kafka.consumer.groupId'),
            },
        },
    });
    await app.startAllMicroservices();
    await app.listen(config.get('app.port'));
}
bootstrap();
