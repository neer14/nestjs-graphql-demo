import { Injectable, Inject } from '@nestjs/common';
import { Card, GatewayEnum } from './payments.entity';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from '../utils/constants';

@Injectable()
export class PaymentsService {
    constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) { }

    storePaymentCards(customer_id: String, gateway: GatewayEnum): Promise<Card[]> {
        return this[gateway].customers
            .listSources(customer_id, {
              object: 'card',
              limit: 10,
            })
            .then((cards: { data: Stripe.CustomerSource[] }) => {
              const resCards: Card[] = [];
              cards.data?.forEach((card: Stripe.Card) => {
                resCards.push({
                  gateway,
                  id: card.id,
                  expMonth: card.exp_month,
                  expYear: card.exp_year,
                  last4: card.last4,
                  name: card.name,
                });
              });
              return resCards;
            });
    }
}
