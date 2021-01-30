export const GET_PLANTS = 'GET_PLANTS'


export const initialState = {
    plants: []
}

export const plantReducer = (state, action) => {
    switch(action.type){
        case GET_PLANTS:
            return{
                ...state,
                plants: action.payload
            }
        default:
            return state
    }
}