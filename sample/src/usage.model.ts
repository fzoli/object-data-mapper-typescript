import { List } from 'immutable';
import { Decimal } from 'decimal.js';
import { DateTime } from 'luxon';

import { decodeObject, encodeObject, JsonField } from '@object-data-mapper/core';
import { decodeList, emptyArray, emptyList, encodeList } from '@object-data-mapper/immutable';
import { decimalDecoder, decimalEncoder } from '@object-data-mapper/decimal';
import { dateTimeDecoder, dateTimeEncoder } from '@object-data-mapper/luxon';

export type Identity = number

export enum CurrencyCode {
    EUR = 'EUR',
    USD = 'USD',
}

export class Balance {

    @JsonField({
        decoder: decimalDecoder,
        encoder: decimalEncoder
    })
    readonly amount!: Decimal

    @JsonField({
        name: 'currency_code'
    })
    readonly currencyCode!: CurrencyCode

}

export class User {

    @JsonField()
    readonly id!: Identity

    @JsonField({
        name: 'person_name'
    })
    readonly personName!: string

    @JsonField()
    readonly level?: number

    @JsonField({
        name: 'creation_time',
        decoder: dateTimeDecoder,
        encoder: dateTimeEncoder
    })
    readonly creationTime!: DateTime

    @JsonField({
        defaultDecodedValue: emptyList,
        defaultEncodedValue: emptyArray,
        decoder: value => decodeList(value, item => decodeObject(item, Balance)),
        encoder: value => encodeList(value, item => encodeObject(item, Balance))
    })
    readonly balances!: List<Balance>

}
