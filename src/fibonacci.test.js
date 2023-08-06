const sinon = require("sinon");
const assert = require("assert");
const Fibonacci = require('./fibonacci');

(async () => {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        // os generators retornam uma função que são os interators, que têm um método chamado (.next)
        // existem 3 formas de lers esses dados
        // usando as funções .next, for await ou rest/spread.
        for await(const item of fibonacci.execute(3)) {}

        const expectedCallCount = 4;
        assert.deepStrictEqual(spy.callCount, expectedCallCount);
    }
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        const [...results] = fibonacci.execute(5);
        // [0] input = 5, current = 0, next = 1
        // [1] input = 4, current = 1, next = 1
        // [2] input = 3, current = 1, next = 2
        // [3] input = 2, current = 2, next = 3
        // [4] input = 1, current = 3, next = 5
        // [5] input = 0 -> PARA A EXECUÇÃO

        const expectedResult = [0, 1, 1, 2, 3];
        assert.deepStrictEqual(results, expectedResult);

        const { args } = spy.getCall(2);
        const expectedArgs = Object.values({
            input: 3,
            current: 1,
            next: 2,
        });
        assert.deepStrictEqual(args, expectedArgs);
    }
})();
