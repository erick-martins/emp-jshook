import Filters from '../src/Filters';
import HookManager from '../src/Manager';

const getObjectClass = (obj) => {
    if (obj && obj.constructor && obj.constructor.toString()) {
        if(obj.constructor.name) {
            return obj.constructor.name;
        }
        var str = obj.constructor.toString();
        if(str.charAt(0) == '['){
            var arr = str.match(/\[\w+\s*(\w+)\]/);
        } else {
            var arr = str.match(/function\s*(\w+)/);
        }
        if (arr && arr.length == 2) {
            return arr[1];
        }
      }
      return undefined; 
};

Filters.listFilters().map( filterName => {
    describe(`Filter: ${filterName} test`, () => {
        const sampleGroup = 'jest';
        const prepare = Filters[filterName].call(sampleGroup);

        const sampleData = [1,2,3];
        const expectedData = [1,2,3,4];
        let filteredData = [];

        const className = getObjectClass(prepare);

        const fn = jest.fn(data => {
            return Array.isArray(data) ? data.concat(4) : data;
        });

        it('should prepare be an instance of PrepareFilterCallback', () => {
            expect(className).toBe('PrepareFilterCallback');
        });
        it('prepare should have a "do" method', () => {
            expect(prepare.do).toBeDefined();
        });
        it('prepare should have a "apply" method', () => {
            expect(prepare.apply).toBeDefined();
        });
        it('prepare should have a hook defined', () => {
            expect(prepare.hook).toBeDefined();
        });
        it('should array [1, 2, 3] be filtered to [1, 2, 3, 4]', () => {
            
            prepare.do(fn);
            prepare.apply('sampleData');
            filteredData = HookManager.applyFilter(filterName, sampleData);
            HookManager.applyFilter('another_group');
            expect(filteredData).toEqual(expectedData);


        });
        it('hook should be called twice', () => {
            expect(fn).toHaveBeenCalledTimes(2);
        });


    });
});