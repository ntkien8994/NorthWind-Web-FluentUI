import * as Constant from '../utility/Constant';
export function setCurrent(current){
    return {
        type:Constant.LayoutAction.ACTIVE_CURRENT,
        current
    }
}
export function setCollapsed(collapsed){
    return {
        type:Constant.LayoutAction.COLLAPSED,
        collapsed:collapsed
    }
}