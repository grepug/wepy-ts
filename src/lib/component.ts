import { $App } from './app'
import { $Page } from './page'
import { wepyType } from '../typings/wepy.d'

export class $Component {
    $root: $App
    $parent: $App | $Page | $Component
    $components: {
        [name: string]: $Component
    } = {}
    $data: wepyType.ObjectLiteral = {}
    $name: string
    $wxAppContext: wepyType.OriginalAppContext
    $wxPageContext: wepyType.OriginalPageContext
    $isComponent: boolean = true
    $prefix: string = ''
    $wxapp
    $apply: () => void
}