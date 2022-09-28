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

import { Constructor, extractMeta } from './json-field.internal';

export function decodeNullableObject<T>(object: any, type: Constructor<T>): T | null {
  if (object === null || object === undefined) {
    return null
  }
  return decodeObject(object, type)
}

export function decodeObject<T>(object: any, type: Constructor<T>): T {
  const obj = new type()
  const metas = extractMeta(obj)
  for (let i in metas) {
    const meta = metas[i]
    const args = (meta.args) ? meta.args : {}
    const field = (args.name) ? args.name : meta.propertyKey
    // @ts-ignore
    if (object.hasOwnProperty(field)) {
      // @ts-ignore
      const raw = object[field]
      const parsed = (raw === null || raw === undefined) ? null : ((args.decoder) ? args.decoder(raw) : raw)
      const safe = (parsed !== null && parsed !== undefined) ? parsed : ((args.defaultDecodedValue) ? args.defaultDecodedValue() : null)
      if (safe !== null && safe !== undefined) {
        Object.defineProperty(obj, meta.propertyKey, {
          value: safe
        })
      }
    } else {
      const safe = ((args.defaultDecodedValue) ? args.defaultDecodedValue() : null)
      if (safe !== null && safe !== undefined) {
        Object.defineProperty(obj, meta.propertyKey, {
          value: safe
        })
      }
    }
  }
  return obj
}
