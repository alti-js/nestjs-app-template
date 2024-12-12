import { Module } from '@nestjs/common';
import { ConsumerController } from './controllers/consumer/consumer.controller';
import { ConsumerService } from './services/consumer/consumer.service';

@Module({
    controllers: [ConsumerController],
    providers: [ConsumerService],
})
export class ConsumerModule {}
