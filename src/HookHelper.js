import HookManager from './Manager';


class Prepare {
    constructor(hook){
        this.hook = hook
    }
    do(callback){
        this.hook.setCallback(callback);
        return HookManager.addWithHook(this.hook);
    }  
    destroy(){
        const groupName = this.hook.getGroupName();
        const namespace = this.hook.getNamespace();
        return HookManager.destroy(groupName, namespace);
    }
}

class PrepareActionCallback extends Prepare {
    dispatch(...args) {
        const groupName = this.hook.getGroupName();
        return HookManager.trigger(groupName, ...args);
    }
}
class PrepareFilterCallback extends Prepare {
    apply(subject, ...args) {
        const groupName = this.hook.getGroupName();
        return HookManager.applyFilter(groupName, subject, ...args);
    }
}


export {
    PrepareActionCallback,
    PrepareFilterCallback
};