import * as chai from 'chai';
import { decodeObject, encodeObject } from '@object-data-mapper/core';
import { User, CurrencyCode } from './usage.model';

const expect = chai.expect;

describe('Object mapper library', () => {

    it('should map things correctly' , () => {
        const json = "{\"id\":1,\"person_name\":\"Person\",\"creation_time\":\"2022-01-01T12:30:00.500Z\",\"balances\":[{\"amount\":\"15.123456\",\"currency_code\":\"EUR\"}]}"
        const raw = JSON.parse(json)
        expect(raw).to.deep.equal({id: 1, person_name: 'Person', creation_time: '2022-01-01T12:30:00.500Z', balances: [{amount: '15.123456', currency_code: 'EUR'}]})

        const user = decodeObject(raw, User)
        expect(user.id).to.equal(1)
        expect(user.personName).to.equal("Person")
        expect(user.level).to.undefined
        expect(user.creationTime.toISOString()).to.equal("2022-01-01T12:30:00.500Z")
        expect(user.balances.size).to.equal(1)
        expect(user.balances.get(0).currencyCode).to.equal(CurrencyCode.EUR)
        expect(user.balances.get(0).amount.toNumber()).to.equal(15.123456)

        const encoded = encodeObject(user)
        expect(encoded).to.deep.equal(raw)

        expect(JSON.stringify(encoded)).to.equal(json);
    });

});
