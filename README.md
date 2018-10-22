# JSHook

It's a simple package to help create and control injected functionality into an javascript application.



# Installation

```
npm install --save emp-jshook
```



# Usage



### Actions

Actions are simple callbacks called in a convenient moment. A complete list of the default actions can be found [here](/actions.md)

```js
import { Actions } from 'emp-jshook';

// register a 'start' action with 'sample' namespace
// add add the callback function
Actions.start('sample')
    .do(()=>{
        // Do whatever you need to do on startup
    });


```



### Dispatching an action

```js
import { Actions, HookManager } from 'emp-jshook';

// register a 'start' action with 'sample' namespace
// add the callback function
Actions.start('sample')
    .do(()=>{
        // Do whatever you need to do on startup
        console.log('Start hook triggered');
    })

HookManager.trigger('start');
// Console: Start hook triggered

// Or just
Actions.start().dispach();


```



### Filters

Filters are callbacks called when you need to *filter* the returned argument.  A complete list of the default filters can be found [here](/filters.md)

```js
import { Filters } from 'emp-jshook';
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
import { Filters, HookManager } from 'emp-jshook';
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

// Or just
Filters.listMenuBar().apply(items);


```



## Custom hooks

#### Actions

Adding your own custom action.  

```js
import { Actions, HookManager } from 'emp-jshook';

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


// Or just use actions' create method
Actions.create('custom');
// Then use it as a default action
Actions.custom('sample').do( message =>{
    console.log(`Executes customAction here - ${message}`);
});


```



#### Filters

Adding your own custom filter.  

```js
import { Filters, HookManager } from 'emp-jshook';

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


// Or just use filters' create method
Filters.create('custom');
// Then use it as a default filter
Filters.custom('sample').do( message => {
    return message + " a Custom Filter";
});


```



## Destroy

Removing actions and filters.  

```js
import { Filters, Actions, HookManager } from 'emp-jshook';


// You can destroy it using the constructor helper
Action.start().destroy();
Filters.listMenuBar().destroy();

// Passing a namespace will only destroy those with passed namespace
Action.start().destroy('sample');
Filters.listMenuBar().destroy('sample');

// Using HookManager
HookManager.destroy('start');
HookManager.destroy('listMenuBar');

// You can pass a namespace to filter it too
HookManager.destroy('start', 'sample');
HookManager.destroy('listMenuBar', 'sample');


```





# Important

**DO NOT** mutate the original variable directly when filtering. You should always return a new variable with the changes you want to apply.