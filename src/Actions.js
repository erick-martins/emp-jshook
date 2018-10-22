import { PrepareActionCallback } from './HookHelper';
import Hook from './Hook';

const prepareAction = (group, namespace) => {
    const hook = new Hook(group, namespace);
    const callback = new PrepareActionCallback(hook);
    return callback;
}


class Actions {
    static start(namespace){
        return prepareAction('start', namespace);
    }
    static closeModal(namespace){
        return prepareAction('closeModal', namespace);
    }

    static create(group) {
        Actions[group] = (namespace) => {
            return prepareAction(group, namespace);
        };
        return Actions
    }

    static listActions(){
        const notAction = ['create', 'listActions'];
        const actions = Object.getOwnPropertyNames(Actions)
            .filter(prop => typeof Actions[prop] === "function" && notAction.indexOf(prop) < 0);
        return actions;
    }

}

export default Actions;