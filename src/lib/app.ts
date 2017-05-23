import { $Page } from './page'
import { wepyType } from '../typings/wepy.d'

export interface PagesProperty {
    [name: string]: $Page
}

export interface $AppConstructor {
    new (): $App
}

export class $App {
    $pages: PagesProperty = {}
    $wxapp: wepyType.OriginalAppContext
}