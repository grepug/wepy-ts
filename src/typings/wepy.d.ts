// import { wxLib } from './wetype'


export declare namespace wepyType {

    interface ObjectLiteral {
        [name: string]: ObjectLiteral | string | number | boolean | any[]
    }

    interface MethodLiteral {
        [name: string]: Function
    }

    interface AppBaseEvents {
        onLaunch?: () => any
        onShow?: () => any
        onUnlaunch?: () => any
        onHide?: () => any
    }

    interface ComponentBaseEvents {
        onLoad?: () => any
        onReady?: () => any
        onShow?: () => any
        onHide?: () => any
        onUnload?: () => any
        onShareAppMessage?: () => ShareAppMessageResult
        onPullDownRefresh?: () => any
        onReachBottom?: () => any
    }

    interface PageBaseEvents extends ComponentBaseEvents {
    }


    interface ComponentDecorConfig {
        data?: ObjectLiteral
        components?: any
    }

    interface ShareAppMessageResult {
        path: string
        title: string
    }

    // interface PageDecorOptions extends ComponentDecorConfig {
    //     pageConfig?: wxLib.PageConifg
    // }

    interface ComponentContext {

    }

    interface PageContext extends ComponentContext {

    }

    interface PageContext extends ComponentContext {
        $status: string
    }

    interface OriginalAppContext extends AppBaseEvents {
    }

    interface OriginalPageContext extends PageBaseEvents {
        data?: ObjectLiteral,
        setData(obj: ObjectLiteral): void
        update(): void
        forceUpdate(): void
    }

    type BlackOrWhite = 'black' | 'white'

    interface PageConifg {
        navigationBarBackgroundColor?: string,
        navigationBarTextStyle?: BlackOrWhite,
        navigationBarTitleText?: string,
        backgroundColor?: string,
        backgroundTextStyle?: string,
        enablePullDownRefresh?: Boolean,
        disableScroll?: Boolean
    }

    interface Touch {
        identifier: number
        pageX: number
        pageY: number
        clientX: number
        clientY: number
    }

    interface OriginalEventObject {
        type: string
        timestamp: number
        target: {
            id: string
            dataset: ObjectLiteral
        }
        currentTarget: {
            id: string
            dataset: ObjectLiteral
        }
        detail: {
            x: number
            y: number
        }
        touches: Touch[]
        changedTouches: Touch[]
    }

}