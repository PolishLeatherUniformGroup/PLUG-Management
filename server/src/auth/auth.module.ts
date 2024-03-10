import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';
import { MembershipAuthService } from './auth.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, { provide: 'APP_GUARD', useClass: JwtGuard }, MembershipAuthService],
  exports: [PassportModule, MembershipAuthService],
})
export class AuthModule {}
