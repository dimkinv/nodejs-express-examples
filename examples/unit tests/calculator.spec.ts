import { Calculator, User } from './calculator';
import * as chai from 'chai';
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should;

should();

describe('calculator', () => {
    let c: Calculator;
    beforeEach(()=>{
        c = new Calculator();
    })
    it('should create an instance of a calculator', () => {
        //given

        //when

        //then
        expect(c).to.be.instanceOf(Calculator);

    });
    it('should be able to add two numbers, 2 + 2 should be 4', () => {
        //given
        //when
        let result = c.plus(2, 2);

        //then
        expect(result).to.be.equal(4);
    });

});


describe('user', ()=>{
    it('should return full name for Yossi Cohen', ()=>{
        //given
        let u = new User('Yossi', 'Cohen');

        //when
        let result = u.getFullName();

        //then
        expect(result).to.be.equal('Yossi Cohen');

        result.should.be.equal('Yossi Cohen');
    });
})