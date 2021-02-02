export const decodeFrequency = (freq) => {
    switch(freq){
        case 'Daily':
            return 1
        case 'Every other day':
            return 2
        case 'Weekly':
            return 7
        case 'Bi-Weekly':
            return 14
        default:
            return 30
    }

}