import { Resolver, Query, Args } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { Card,GatewayEnum } from './payments.entity';

@Resolver(of => Card)
export class PaymentsResolver {
    constructor(private paymentsService: PaymentsService) { }

    @Query(returns => [Card])
    cards(@Args('customer_id', { type: () => String }) customer_id: String,@Args('gateway', { type: () => GatewayEnum }) gateway: GatewayEnum): Promise<Card[]> {
        return this.paymentsService.storePaymentCards(customer_id,gateway );
    }
}
