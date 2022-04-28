import { Module, DynamicModule, Provider } from '@nestjs/common';
import { STRIPE_CLIENT } from '../utils/constants';
import { StripeAdaptor } from '../adaptors/stripe.adaptor';

@Module({})
export class StripeModule {
    static forRoot(): DynamicModule {
        const stripe = new StripeAdaptor();
        const stripeProvider: Provider = {
            provide: STRIPE_CLIENT,
            useValue: stripe
        }
        return {
            module: StripeModule,
            providers: [stripeProvider],
            exports: [stripeProvider],
            global: true
        }
    }
}
