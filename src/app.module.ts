import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { gatewayEnumResolver } from './payments/payments.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StripeModule } from './gateways/stripe.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      resolvers: {
        GatewayEnum: gatewayEnumResolver,
      },
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // typePaths: ['**/*.graphql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/interfaces/graphql.ts'),
      // },
    }),
    PaymentsModule,
    StripeModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
