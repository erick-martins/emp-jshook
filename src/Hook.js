class Hook {
    constructor(group, namespace, callback){
        this.groupName = group;
        this.namespace = namespace || 'general';
        this.callback = callback;
    }

    isValid(){
        return ( 
            'string' == typeof this.groupName && 
            this.groupName != '' && 
            'function' == typeof this.callback
        );
    }

    setCallback(callback){
        if('function' == typeof callback) this.callback = callback.bind(this);
        return this;
    }



    setGroupName(group){
        if('string' == typeof groupName) this.groupName = group;
        return this;
    }
    getGroupName() {
        return this.groupName;
    }


    setNamespace(namespace){
        if('string' == typeof namespace) this.namespace = namespace;
        return this;
    }
    getNamespace() {
        return this.namespace;
    }



    dispatch(...args){
        if(this.isValid()){
            return this.callback(...args);
        }
    }

    filter(subject, ...args){
        if(this.isValid()){
            return this.callback(subject, ...args);
        }
        return subject;
    }

}

export default Hook;