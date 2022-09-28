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

import { JsonFieldMetaData, METADATA_FIELD_KEY } from './json-field.internal';
import { JsonFieldArgs } from './json-field.api';

export function JsonField(args?: JsonFieldArgs): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    let registry: JsonFieldMetaData[] = []
    if (target.hasOwnProperty(METADATA_FIELD_KEY)) {
      // @ts-ignore
      registry = target[METADATA_FIELD_KEY]
    } else {
      Object.defineProperty(target, METADATA_FIELD_KEY, {
        value: registry
      })
    }
    const meta: JsonFieldMetaData = {
      propertyKey: propertyKey,
      args: args,
    }
    registry.push(meta)
  }
}
