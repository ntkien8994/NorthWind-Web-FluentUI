import * as Constant from '../utilities/Constant';
var initState={
    accessRoutes:[],
    current:null,
    collapsed:false
}
export function layouts(state = initState, action) {
    var {accessRoutes,current,collapsed} =state;
    switch (action.type) {
        case Constant.LayoutAction.ACTIVE_CURRENT:
            current=action.current;
            break;
        case Constant.LayoutAction.COLLAPSED:
            collapsed = action.collapsed
            break;
        default:
            break;
    }
    state = {
        accessRoutes,
        current,
        collapsed
    }
    return state;
}