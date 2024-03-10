import { Injectable } from '@nestjs/common';
import { AuthenticationClient, ManagementClient } from 'auth0';
import { randomUUID } from 'crypto';
import { env } from 'process';

@Injectable()
export class MembershipAuthService {

    async createMemberAccount(
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        cardNumber: string,
    ) {
        const auth0 = new ManagementClient({
            domain: `${process.env.AUTH0_DOMAIN}`,
            clientId: `${process.env.AUTH0_CLIENT_ID}`,
            clientSecret: `${env.AUTH0_CLIENT_SECRET}`,
        });
        const ac = new AuthenticationClient({
            domain: `${process.env.AUTH0_DOMAIN}`,
            clientId: `${process.env.AUTH0_CLIENT_ID}`,
            clientSecret: `${env.AUTH0_CLIENT_SECRET}`,
        });


        auth0.users.create
            ({
                email: email,
                email_verified: true,
                connection: 'Username-Password-Authentication',
                given_name: firstName,
                family_name: lastName,
                name: `${firstName} ${lastName}`,
                nickname: cardNumber,
                password: randomUUID().toLowerCase()
            }).then((response) => {
                auth0.users.assignRoles({ id: response.data.user_id }, { roles: ['rol_O7ECfVqSsjsvUO9E'] })
            });
    }
}