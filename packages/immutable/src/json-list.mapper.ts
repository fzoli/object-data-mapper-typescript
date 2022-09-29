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
import { JsonValue, JsonValueDecoder, JsonValueEncoder } from '@object-data-mapper/core';

export function decodeNullableList<T>(value: JsonValue | null, itemDecoder: JsonValueDecoder): List<T> {
  if (value === null || value === undefined) {
    return emptyList()
  }
  return decodeList(value, itemDecoder)
}

export function decodeList<T>(value: JsonValue, itemDecoder: JsonValueDecoder): List<T> {
  const array = value as Array<JsonValue>
  if (array.length === 0) {
    return emptyList()
  }
  return List.of(...array.map(item => itemDecoder(item)))
}

export function encodeList<T>(value: List<T>, itemEncoder: JsonValueEncoder): JsonValue {
  if (value.isEmpty()) {
    return emptyArray()
  }
  return value.toArray().map(item => itemEncoder(item))
}

const EMPTY_LIST: List<unknown> = List.of()

export function emptyList<T>(): List<T> {
  // @ts-ignore
  return EMPTY_LIST
}

const EMPTY_ARRAY: Array<unknown> = []
Object.freeze(EMPTY_ARRAY)

export function emptyArray<T>(): Array<T> {
  // @ts-ignore
  return EMPTY_ARRAY
}
