import wepy = require('wepy')

export interface AppDecorOptions {
    config: any
}

export function AppDecor (appDecorOptions: AppDecorOptions) {
    return function (Constr): any {

        let instance = new Constr

        class App extends wepy.default.app {

            config = appDecorOptions.config

            globalData = instance.globalData

        }
        ['onLaunch'].forEach(e => {
            if (instance[e]) {
                App.prototype[e] = instance[e]
            }
        })
        return App
    }
}