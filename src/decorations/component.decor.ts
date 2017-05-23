import wepy = require('wepy')
import { pageEvent } from '../lib/constants'

export interface PageOptions {
    components?: any
    config?: any
}


export function ComponentDecor(components?) {
    return function (Constr): any {

        let instance = new Constr

        let data = {}

        let methods = {}

        let events = {}

        Constr.dataNames && Constr.dataNames.forEach(name => data[name] = instance[name])
        Constr.methodNames && Constr.methodNames.forEach(name => methods[name] = instance[name])
        Constr.eventNames && Constr.eventNames.forEach(name => events[name] = instance[name])


        class Component extends wepy.default.component {

            components = components || {}

            data = data

            methods = methods

            events = events

        }

        // assign pageEvents
        pageEvent.forEach(e => {
            if (instance[e]) {
                Component.prototype[e] = instance[e]
            }
        })

        Object.getOwnPropertyNames(Constr.prototype).forEach(name => {
            if (
                name !== 'construtor' &&
                pageEvent.indexOf(name) === -1 &&
                (Constr.methodNames ? Constr.methodNames.indexOf(name) === -1 : true) &&
                (Constr.eventNames ? Constr.eventNames.indexOf(name) === -1 : true) &&
                typeof instance[name] === 'function' &&
                name[0] !== '$'
            ) {
                Component.prototype[name] = instance[name]
            }
        })

        return Component
    }
}

export function PageDecor(pageOptions: PageOptions = {}) {
    return function (Constr): any {

        let instance = new Constr

        let data = {}

        let methods = {}

        let events = {}

        Constr.dataNames && Constr.dataNames.forEach(name => data[name] = instance[name])
        Constr.methodNames && Constr.methodNames.forEach(name => methods[name] = instance[name])
        Constr.eventNames && Constr.eventNames.forEach(name => events[name] = instance[name])

        let { components, config } = pageOptions

        class Page extends wepy.default.page {

            components = components || {}

            config = config || {}

            data = data

            methods = methods

            events = events

            onLoad() {
                instance.onLoad && instance.onLoad.call(this)
            }
        }

        // assign pageEvents
        pageEvent.forEach(e => {
            if (instance[e]) {
                Page.prototype[e] = instance[e]
            }
        })

        Object.getOwnPropertyNames(Constr.prototype).forEach(name => {
            if (
                name !== 'construtor' &&
                pageEvent.indexOf(name) === -1 &&
                (Constr.methodNames ? Constr.methodNames.indexOf(name) === -1 : true) &&
                (Constr.eventNames ? Constr.eventNames.indexOf(name) === -1 : true) &&
                typeof instance[name] === 'function' &&
                name[0] !== '$'
            ) {
                Page.prototype[name] = instance[name]
            }
        })

        return Page
    }
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