import { Field, Int, ID, registerEnumType, ObjectType } from '@nestjs/graphql';

export enum GatewayEnum {
  STRIPE = 'stripe',
  CHECKOUT = 'checkout'
}

registerEnumType(GatewayEnum, {
  name: 'GatewayEnum',
});

export const gatewayEnumResolver: Record<keyof typeof GatewayEnum, any> = {
  STRIPE: 'stripe',
  CHECKOUT: 'checkout'
};

@ObjectType()
export class Card {
  @Field(type => GatewayEnum)
  gateway: GatewayEnum;

  @Field(type => ID)
  id: string;

  @Field(type => Int)
  expMonth: number;

  @Field(type => Int)
  expYear: number;

  @Field()
  last4: string;

  @Field()
  name: string;
}