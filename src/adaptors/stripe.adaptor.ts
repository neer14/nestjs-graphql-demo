import { Module, DynamicModule, Provider } from '@nestjs/common';
import { Stripe } from 'stripe';
import { Card, GatewayEnum } from '../payments/payments.entity';

@Module({})
export class StripeAdaptor {

    private stripe: Stripe;

    /**
     * Creates an instance of StripeAdapter.
     *
     * @memberof StripeAdapter
     */
    public constructor() {

        this.stripe = new Stripe(process.env.STRIPE_KEY, {
            apiVersion: '2020-08-27'
        });
    }

    /**
     * List user card based on store
     *
     * @param {Store} store
     * @return {*}  {(Promise<Card[]>)}
     * @memberof StripeAdapter
     */
    public listCards(customerId: string): Promise<Card[]> {
        if (!customerId) return Promise.resolve([]);
        return this.stripe.customers
            .listSources(customerId, {
                object: 'card',
                limit: 10,
            })
            .then((cards: { data: Stripe.CustomerSource[] }) => {
                const resCards: Card[] = [];
                cards.data?.forEach((card: Stripe.Card) => {
                    console.log(JSON.stringify(card))
                    resCards.push({
                        gateway: GatewayEnum.STRIPE,
                        id: card.id,
                        expMonth: card.exp_month,
                        expYear: card.exp_year,
                        last4: card.last4,
                        name: card.name,
                        type: card.brand
                    });
                });
                return resCards;
            });
    }
}
