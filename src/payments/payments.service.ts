import { Injectable } from '@nestjs/common';
import { Card, GatewayEnum } from './payments.entity';

@Injectable()
export class PaymentsService {
    storePaymentCards(customer_id: String, gateway: GatewayEnum): Promise<Card[]> {
        return Promise.resolve([{
            gateway,
            id: "card_1KWw9mEHP86UrlT0uW3ig2L3",
            expMonth: 12,
            expYear: 2023,
            last4: 4242,
            name: "Test"
        }])
    }
}
