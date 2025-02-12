import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { SharedModule } from '@shared/shared';

@Module({
    imports: [
        SharedModule.forRoot(),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 60,
            },
        ]),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
