import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { SharedModule } from '@shared/shared';
import { MainModule } from './modules/main/main.module';

@Module({
    imports: [
        SharedModule.forRoot(),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 60,
            },
        ]),
        MainModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
