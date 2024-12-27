import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    public getHello(): string {
        return 'Hello';
    }
}
