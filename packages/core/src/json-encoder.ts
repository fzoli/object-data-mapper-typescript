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

export function encodeObject<T>(object: T, type?: Constructor<T>): any {
  const obj = {}
  // @ts-ignore
  const metas = extractMeta(object, type)
  for (let i in metas) {
    const meta = metas[i]
    const args = (meta.args) ? meta.args : {}
    const field = (args.name) ? args.name : meta.propertyKey
    // @ts-ignore
    if (object.hasOwnProperty(meta.propertyKey)) {
      // @ts-ignore
      const typed = object[meta.propertyKey]
      const raw = (typed === null || typed === undefined) ? null : ((args.encoder) ? args.encoder(typed) : typed)
      const safe = (raw !== null && raw !== undefined) ? raw : ((args.defaultEncodedValue) ? args.defaultEncodedValue() : null)
      if (safe !== null && safe !== undefined) {
        // @ts-ignore
        obj[field] = safe
      }
    } else {
      const safe = ((args.defaultEncodedValue) ? args.defaultEncodedValue() : null)
      if (safe !== null && safe !== undefined) {
        // @ts-ignore
        obj[field] = safe
      }
    }
  }
  return obj
}
