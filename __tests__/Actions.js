import Actions from '../src/Actions';
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

Actions.listActions().map( actionName => {
    describe(`Action: ${actionName} test`, () => {
        const sampleGroup = 'jest';
        const prepare = Actions[actionName].call(sampleGroup);


        const className = getObjectClass(prepare);

        it('should prepare be an instance of PrepareActionCallback', () => {
            expect(className).toBe('PrepareActionCallback');
        });
        it('prepare should have a "do" method', () => {
            expect(prepare.do).toBeDefined();
        });
        it('prepare should have a "dispatch" method', () => {
            expect(prepare.dispatch).toBeDefined();
        });
        it('prepare should have a hook defined', () => {
            expect(prepare.hook).toBeDefined();
        });
        it('hook should be called twice', () => {
            const fn = jest.fn();
            prepare.do(fn);

            prepare.dispatch('sampleData');
            HookManager.trigger(actionName);
            HookManager.trigger('another_group');

            expect(fn).toHaveBeenCalledTimes(2);

        });


    });
});