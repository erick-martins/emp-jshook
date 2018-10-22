import HookManager from './Manager';

class PrepareActionCallback {
    constructor(hook){
        this.hook = hook
    }
    do(callback){
        this.hook.setCallback(callback);
        return HookManager.addWithHook(this.hook);
    }  
    dispatch(...args) {
        const groupName = this.hook.getGroupName();
        return HookManager.trigger(groupName, ...args);
    }
    destroy(){
        const groupName = this.hook.getGroupName();
        const namespace = this.hook.getNamespace();
        return HookManager.destroy(groupName, namespace);
    }
}
class PrepareFilterCallback {
    constructor(hook){
        this.hook = hook
    }
    do(callback){
        this.hook.setCallback(callback);
        return HookManager.addWithHook(this.hook);
    } 
    apply(subject, ...args) {
        const groupName = this.hook.getGroupName();
        return HookManager.applyFilter(groupName, subject, ...args);
    }

    destroy(){
        const groupName = this.hook.getGroupName();
        const namespace = this.hook.getNamespace();
        return HookManager.destroy(groupName, namespace);
    }
}


export {
    PrepareActionCallback,
    PrepareFilterCallback
};