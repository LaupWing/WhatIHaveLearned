export default function sortByName(prop){
    return function(a,b){
        const nameA = a[prop].toUpperCase()
        const nameB = b[prop].toUpperCase()
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }
}