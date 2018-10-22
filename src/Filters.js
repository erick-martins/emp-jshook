import { PrepareFilterCallback } from './HookHelper';
import Hook from './Hook';

const prepareFilter = (group, namespace) => {
    const hook = new Hook(group, namespace);
    const callback = new PrepareFilterCallback(hook);
    return callback;
}


class Filters {
    static listMenuBar(namespace){
        return prepareFilter('listMenuBar', namespace);
    }
    static create(group) {
        Filters[group] = (namespace) => {
            return prepareFilter(group, namespace);
        };
        return Filters
    }

    static listFilters(){
        const notFilter = ['create', 'listFilters'];
        const filters = Object.getOwnPropertyNames(Filters)
            .filter(prop => typeof Filters[prop] === "function" && notFilter.indexOf(prop) < 0);
        return filters;
    }
}

export default Filters;
