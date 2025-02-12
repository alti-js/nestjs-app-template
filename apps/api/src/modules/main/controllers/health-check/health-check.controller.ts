import { ResponseMessage } from '@alti-js/nestjs-common';
import { Controller, Get } from '@nestjs/common';

@Controller('v1/health-check')
export class HealthCheckController {
    @Get()
    @ResponseMessage('Health check')
    async healthCheck() {
        return {
            status: 'ok',
        };
    }
}
