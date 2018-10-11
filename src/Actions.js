import { prepareHook } from './utils';

const Actions = {
    start: namespace => prepareHook('ActionStart', namespace)
}

export default Actions;