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

import { decodeObject, encodeObject, JsonField } from '@object-data-mapper/core';

export type Identity = number

export class User {

    @JsonField()
    readonly id!: Identity

    @JsonField({
        name: 'person_name'
    })
    readonly personName!: string

    @JsonField()
    readonly level?: number

}

const json = "{\"id\":1,\"person_name\":\"Person\"}"
const raw = JSON.parse(json)
const user = decodeObject(raw, User)
console.log(raw)
console.log('id:', user.id, ', personName:', user.personName, ', level:', user.level)
const encoded = encodeObject(user)
console.log(encoded)
console.log('passed:', json === JSON.stringify(encoded))
