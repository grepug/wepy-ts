import wepy = require('wepy')

export interface AppDecorOptions {
    config: any
}

export function AppDecor (appDecorOptions: AppDecorOptions) {
    return function (Constr): any {

        let instance = new Constr

        class NewConstr extends wepy.default.app {

            config = appDecorOptions.config

            globalData = instance.globalData

        }
        ['onLaunch'].forEach(e => {
            if (instance[e]) {
                NewConstr.prototype[e] = instance[e]
            }
        })
        return NewConstr
    }
}