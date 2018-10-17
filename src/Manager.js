import Hook from './Hook';

const HookManager = {};

HookManager._groupsList = [];

HookManager.__addWithHook = (hook) => {
    if(hook instanceof Hook && hook.isValid() ) {
        let groupName = hook.getGroupName();
        HookManager.__validateGroupName(groupName);
        HookManager._groupsList[groupName].push(hook);
    }
    return HookManager;
};
HookManager.__validateGroupName = (groupName) => {
    if( 'undefined' == typeof HookManager._groupsList[groupName])
        HookManager._groupsList[groupName] = [];
}


HookManager.on = (name, callback) => {
    name = (name || '').split('.');
    let groupName = name.shift();
    let namespace = group.join('.');
    
    let hook = new Hook(groupName, namespace, callback);
    HookManager.__addWithHook(callback);
    return HookManager;
};

HookManager.filter = (group, callback) => {
    name = (name || '').split('.');
    let groupName = name.shift();
    let namespace = group.join('.');
    
    let hook = new Hook(groupName, namespace, callback);
    HookManager.__addWithHook(callback);
    return HookManager;
};

HookManager.trigger = (groupName, ...args) => {
    if( 'undefined' == typeof HookManager._groupsList[groupName]) {
        HookManager._groupsList[groupName].map( hook => hook.dispatch(...args));
    }
    return null;
};
HookManager.applyFilter = (groupName, subject, ...args) => {
    if( 'undefined' !== typeof HookManager._groupsList[groupName]) {
        let hookList = HookManager._groupsList[groupName];
        if(Array.isArray(hookList) && hookList.length > 0){
            hookList.map( hook => {
                subject = hook.filter(subject, ...args);
            });
        }
    }
    return subject;
};

export default HookManager;
