import Hook from './Hook';


let groupsList = [];



class HookManager {

    static addWithHook(hook) {
        if(hook instanceof Hook && hook.isValid() ) {
            let groupName = hook.getGroupName();
            HookManager.validateGroupName(groupName);
            groupsList[groupName].push(hook);
        }
        return HookManager;
    }
    
    static validateGroupName(groupName) {
        if( 'undefined' == typeof groupsList[groupName])
            groupsList[groupName] = [];
    }

    static on(name, callback) {
        name = (name || '').split('.');
        let groupName = name.shift();
        let namespace = group.join('.');
        
        let hook = new Hook(groupName, namespace, callback);
        HookManager.addWithHook(callback);
        return HookManager;
    }

    static filter(group, callback) {
        name = (name || '').split('.');
        let groupName = name.shift();
        let namespace = group.join('.');
        
        let hook = new Hook(groupName, namespace, callback);
        HookManager.addWithHook(callback);
        return HookManager;
    }

    static trigger(groupName, ...args) {
        if( Array.isArray(groupsList[groupName]) ){
            groupsList[groupName].map( hook => hook.dispatch(...args));
        }
        return null;
    }
    static applyFilter(groupName, subject, ...args) {
        if( Array.isArray(groupsList[groupName]) ){
            let hookList = groupsList[groupName];
            if(Array.isArray(hookList) && hookList.length > 0){
                hookList.map( hook => {
                    subject = hook.filter(subject, ...args);
                });
            }
        }
        return subject;
    }

    static destroy(groupName, namespace){
        if(Array.isArray(groupsList[groupName])){
            if('undefined' == typeof namespace){
                delete groupsList[groupName];
            }else{
                for(let i=0; i<= groupsList[groupName].length; i++){
                    if(groupsList[groupName][i].getNamespace() == namespace){
                        groupsList[groupName].splice(i, 1);
                    }
                }
                groupsList = groupsList.filter(function(){return true;});
            }
        }
    }

}

export default HookManager;
