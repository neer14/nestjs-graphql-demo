import { Field, Int, ID, registerEnumType, ObjectType } from '@nestjs/graphql';

export enum GatewayEnum {
  STRIPE = 'stripe',
  CHECKOUT = 'checkout',
}

registerEnumType(GatewayEnum, {
  name: 'GatewayEnum',
});

export const gatewayEnumResolver: Record<keyof typeof GatewayEnum, any> = {
  STRIPE: 'stripe',
  CHECKOUT: 'checkout',
};

@ObjectType()
export class Card {
  @Field(() => GatewayEnum)
  gateway: GatewayEnum;

  @Field(() => ID)
  id: string;

  @Field(() => Int)
  expMonth: number;

  @Field(() => Int)
  expYear: number;

  @Field()
  last4: string;

  @Field()
  name: string;

  @Field()
  type: string;
}
