//description: Action chung của chương trình
//------------------------------------------
//created by: ntkien 
//created date: 28.08.2020
export function doAction(type,param){
    return {
        type:type,
        param
    }
}