import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [JwtStrategy,{ provide: 'APP_GUARD', useClass: JwtGuard }],
    exports: [PassportModule],
  })
export class AuthModule {}
