/*
 * Copyright 2022 Zoltan Farkas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { List } from 'immutable';
import { Decimal } from 'decimal.js';
import * as moment from 'moment';

import { decodeObject, encodeObject, JsonField } from '@object-data-mapper/core';
import { decodeList, emptyArray, emptyList, encodeList } from '@object-data-mapper/immutable';
import { decimalDecoder, decimalEncoder } from '@object-data-mapper/decimal';
import { momentDecoder, momentEncoder } from '@object-data-mapper/moment';

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
        decoder: momentDecoder,
        encoder: momentEncoder
    })
    readonly creationTime!: moment.Moment

    @JsonField({
        defaultDecodedValue: emptyList,
        defaultEncodedValue: emptyArray,
        decoder: value => decodeList(value, item => decodeObject(item, Balance)),
        encoder: value => encodeList(value, item => encodeObject(item, Balance))
    })
    readonly balances!: List<Balance>

}

const json = "{\"id\":1,\"person_name\":\"Person\",\"creation_time\":\"2022-01-01T12:30:00.500Z\",\"balances\":[{\"amount\":\"15.123456\",\"currency_code\":\"EUR\"}]}"
const raw = JSON.parse(json)
const user = decodeObject(raw, User)
console.log(raw)
console.log('id:', user.id, ', personName:', user.personName, ', level:', user.level, ', creationTime:', user.creationTime, ', balances[0].currencyCode:', user.balances.get(0).currencyCode, ', balances[0].amount:', user.balances.get(0).amount)
const encoded = encodeObject(user)
console.log(encoded)
console.log('passed:', json === JSON.stringify(encoded))
