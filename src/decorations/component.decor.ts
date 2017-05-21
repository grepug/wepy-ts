import wepy = require('wepy')
import { pageEvent } from '../lib/constants'

export interface PageOptions {
    components?: any[]
    config: any
}

function pageFactory (components?, config?) {
     return function (Constr, components?, config?): any {

        let instance = new Constr

        let data = {}

        let methods = {}

        let events = {}

        Constr.dataNames && Constr.dataNames.forEach(name => data[name] = instance[name])
        Constr.methodNames && Constr.methodNames.forEach(name => methods[name] = instance[name])
        Constr.eventNames && Constr.eventNames.forEach(name => events[name] = instance[name])


        return class extends wepy.default.page {

            components = components

            config = config

            data = data

            methods = methods

            events = events

            onLoad () {
                instance.onLoad && instance.onLoad.call(this)
            }
        }

        // // assign pageEvents
        // pageEvent.forEach(e => {
        //     if (instance[e]) {
        //         NewConstr.prototype[e] = instance[e]
        //     }
        // })

        // return NewConstr
    }
}
function componentFactory (components?, config?) {
     return function (Constr, components?, config?): any {

        let instance = new Constr

        let data = {}

        let methods = {}

        let events = {}

        Constr.dataNames && Constr.dataNames.forEach(name => data[name] = instance[name])
        Constr.methodNames && Constr.methodNames.forEach(name => methods[name] = instance[name])
        Constr.eventNames && Constr.eventNames.forEach(name => events[name] = instance[name])


        class NewConstr extends wepy.default.component {

            components = components

            data = data

            methods = methods

            events = events

        }

        // assign pageEvents
        pageEvent.forEach(e => {
            if (instance[e]) {
                NewConstr.prototype[e] = instance[e]
            }
        })

        return NewConstr
    }
}

export function ComponentDecor(components) {
    return componentFactory(components)
}

export function PageDecor(pageOptions: PageOptions) {
    return pageFactory(pageOptions.components, pageOptions.config)
}

export function data(target, propName) {
    target.constructor.dataNames ?
        target.constructor.dataNames.push(propName) :
        (target.constructor.dataNames = [propName])
}

export function method(target, propName) {
    target.constructor.methodNames ?
        target.constructor.methodNames.push(propName) :
        (target.constructor.methodNames = [propName])
}

export function event(target, propName) {
    target.constructor.eventNames ?
        target.constructor.eventNames.push(propName) :
        (target.constructor.eventNames = [propName])
}