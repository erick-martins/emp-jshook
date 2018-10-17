# JSHook

It's a simple package to help create and control injected functionality into an javascript application.



# Installation

```
npm install --save webpremios-app-hook
```



# Usage



### Actions

Actions are simple callbacks called in a convenient moment. A complete list of the default actions can be found [here](/actions.md)

```js
import { Actions } from 'webpremios-app-hook';

// register a 'start' action with 'sample' namespace
// add add the callback function
Actions.start('sample')
    .do(()=>{
        // Do whatever you need to do on startup
    });


```



### Dispatching an action

```js
import { Actions, HookManager } from 'webpremios-app-hook';

// register a 'start' action with 'sample' namespace
// add the callback function
Actions.start('sample')
    .do(()=>{
        // Do whatever you need to do on startup
        console.log('Start hook triggered');
    })

HookManager.trigger('start');
// Console: Start hook triggered


```



### Filters

Filters are callbacks called when you need to *filter* the returned argument.  A complete list of the default filters can be found [here](/filters.md)

```js
import { Filters } from 'webpremios-app-hook';
import { SomeComponent } from '/path/to/component';

// register a 'listMenuBar' filter with 'sample' namespace
// add the callback function
Filters.listMenuBar('sample')
    .do( items => {
        let newItem = {
            name: 'Sample',
            icon: 'sample-icon',
            component: <SomeComponent />
        };
        // Filters should always returns the new subject
        return items.concat(newItem);
    })


```



### Filtering

```js
import { Filters, HookManager } from 'webpremios-app-hook';
import { SomeComponent } from '/path/to/component';

// register a 'listMenuBar' filter with 'sample' namespace
// add the callback function
Filters.listMenuBar('sample')
    .do( items => {
        let newItem = {
            name: 'Sample',
            icon: 'sample-icon',
            component: <SomeComponent />
        };
        // Filters should always returns the new subject
        return items.concat(newItem);
    });

let items = [
    {
        name: 'Default Item',
        icon: 'default-icon',
        component: <DefaultComponent />
    }
];

items = HookManager.applyFilter('listMenuBar', items);
// Now items contains the initial value
// plus what was add in the filter hook



```



## Custom hooks

#### Actions

Adding your own custom action.  

```js
import { HookManager } from 'webpremios-app-hook';

HookManager.on(
    'custom', 		// register a action with 'custom' GroupName,
    'sample', 		// 'sample' as namespace - Not Required
    (message) => { 	// add the callback function
        console.log(`Executes customAction here - ${message}`);
    } 
)
// Then you can call it as you would normaly do
HookManager.trigger('customAction', 'Hell Yeah!');
// Console: Executes customAction here - Hell Yeah!

```



#### Filters

Adding your own custom filter.  

```js
import { HookManager } from 'webpremios-app-hook';

HookManager.filter(
    'custom', 		// register a action with 'custom' GroupName,
    'sample', 		// 'sample' as namespace - Not Required
    (message) => {	// add the filter function
        return message + " a Custom Filter";
    }
)


let message = "This string was changed by";

// Then you can call it as you would normaly do
message = HookManager.applyFilter('custom', message);

console.log(message);
// Console: This string was changed by a Custom Filter

```





# Important

**DO NOT** mutate the original variable directly when filtering. You should always return a new variable with the changes you want to apply.