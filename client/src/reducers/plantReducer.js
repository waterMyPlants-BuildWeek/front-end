export const GET_PLANTS = 'GET_PLANTS'
export const EDITING_PLANT = 'EDITING_PLANT'
export const SELECTED_PLANT = 'SELECTED_PLANT'
export const CLEAR_SELECTED = 'CLEAR_SELECTED'

export const initialState = {
    plants: [],
    selectedPlant: {
        userId: '',
        nickname: '',
        species: '',
        h2oFrequency: 'Daily',
        last_watered: '',
        image: '',
        id: null
    },
    editing: false
}

export const plantReducer = (state, action) => {
    switch(action.type){
        case GET_PLANTS:
            return{
                ...state,
                plants: action.payload
            }
        case EDITING_PLANT:
            return{
                ...state,
                plants: action.payload,
                editing: true
                }
        case SELECTED_PLANT:
            return{
                ...state,
                selectedPlant: action.payload,
                editing: true
            }
        case CLEAR_SELECTED:
            return{
                ...state,
                selectedPlant: initialState.selectedPlant,
                editing: false
            }
        
        default:
            return state
    }
    }