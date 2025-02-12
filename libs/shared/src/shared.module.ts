import { DynamicModule, Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { CommonModule } from '@alti-js/nestjs-common';

@Module({})
export class SharedModule {
    static forRoot(): DynamicModule {
        const commonModule: DynamicModule = CommonModule.forRoot();
        return {
            global: true,
            module: SharedModule,
            imports: [commonModule],
            providers: [SharedService],
            exports: [SharedService, commonModule],
        };
    }
}
