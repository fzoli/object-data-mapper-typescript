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

import { JsonFieldArgs } from './json-field.api';

export const METADATA_FIELD_KEY = '__jsonTransformerJsonObjectMetadataInformation__';

export type Constructor<T> = { new (): T }

export interface JsonFieldMetaData {
  propertyKey: string | symbol
  args?: JsonFieldArgs
}

export function extractMeta<T>(object: T, type?: Constructor<T>): JsonFieldMetaData[] {
  // @ts-ignore
  let metas = object[METADATA_FIELD_KEY] as JsonFieldMetaData[] | undefined
  if (!metas && type) {
    const emptyObject = new type()
    // @ts-ignore
    metas = emptyObject[METADATA_FIELD_KEY] as JsonFieldMetaData[] | undefined
  }
  if (!metas) {
    throw Error('Unmanaged type: ' + type + " " + object)
  }
  return metas
}
