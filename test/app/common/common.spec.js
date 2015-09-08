/*eslint-disable*/
var common = ne.dooray.calendar.common;
describe('module:common', function() {
    it('ratio()', function() {
        expect(common.ratio(10, 5, 2)).toBe(1);
        expect(common.ratio(20, 10, 5)).not.toBe(1);
        expect(common.ratio(20, 10, 5)).toBe(2.5);
    });

    it('nearest()', function() {
        expect(common.nearest(0.5, [0.3, 0.6, 0.9])).toBe(0.6);
        expect(common.nearest(13, [5, 9, 11, 12, 15])).toBe(12);
        expect(common.nearest(0.12, [0.5, 0.1, 0.11, 0.3])).toBe(0.11);
        expect(common.nearest(0.12, [0.5, 0.1, 0.11, 0.3])).not.toBe(0.5);
    });

    describe('pick2()', function() {
        it('pick2 can use return value by method chaining.', function() {
            var obj = {
                one: {
                    two: 'hello',
                    method: function() {return 'good';},
                    test: jasmine.createSpy('common')
                }
            };

            expect(common.pick2(obj, 'one', 'two').val()).toBe('hello');
            expect(common.pick2(obj, 'one', 'two').then(function(val) { return val + ' world'; })).toBe('hello world');
            expect(common.pick2(obj, 'one', 'two').then(function() { return this + ' world'; })).toBe('hello world');
            expect(common.pick2(obj, 'one').then('method')).toBe('good');
            expect(common.pick2(obj, 'def').then('good')).toBeUndefined();
        
            common.pick2(obj, 'one').then('test', 'number');
            expect(obj.one.test).toHaveBeenCalledWith('number');
        });

        it('then() is not invoke when supplid path\'s parameter is not exist.', function() {
            var obj = {
                one: {}
            };

            var spy = jasmine.createSpy('pick2:then');

            common.pick2(obj, 'two').then(spy);

            expect(spy).not.toHaveBeenCalled();
        });
    });
});
