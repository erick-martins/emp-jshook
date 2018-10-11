import HookManager from './Manager';
import Hook from './Hook';

const prepareHook = (group, namespace) => {
    let hook = new Hook(group, namespace);
    return {
        do: callback => {
            hook.callback = callback
            return HookManager.__addWithHook(hook);
        }   
    }
};

export {
    prepareHook
};