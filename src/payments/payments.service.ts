import { Injectable, Inject } from '@nestjs/common';
import { Card, GatewayEnum } from './payments.entity';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from '../utils/constants';

@Injectable()
export class PaymentsService {
    constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) { }

    storePaymentCards(customer_id: String, gateway: GatewayEnum): Promise<Card[]> {
        return this[gateway].listCards(customer_id);
    }
}
