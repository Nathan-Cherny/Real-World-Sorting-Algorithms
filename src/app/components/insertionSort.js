function insertionSortStep(array, i, amountOf){
    let valueToSort = array[i] // what value we're gonna be pushing down over and over again to put in its right place
    let j = i - 1 // goes down the list

    while (j >= 0 && array[j] > valueToSort){ // while we're still in the list and the one before the key is greater than it
        array[j + 1] = array[j] // take the one after j to be j - "pushing" it down
        amountOf["comparisons"] += 1 // we have a comparison
        j--
    }

    // at this point, j is now in the "sorted" part of the list since array[j] is less than valueToSort
    // so, now, we have every value pushed down except for the value after j+1 since that's still what was at j
    // so we make it what it should be, which is valueToSort.
    array[j + 1] = valueToSort 
    amountOf["swaps"] += 1
    
    return array
}

function insertionSort(array, lists){

    for(let i = 1; i < array.length; i++){ // doing this when i = 0 won't do anything so we skip it
        let amountOf = {
            "comparisons": 0,
            "swaps": 0
        }
        insertionSortStep(array, i, amountOf)
        lists.push([[...array], {...amountOf}])
    }

    return lists
}

function insertionSortFull(array){
    let amountOf = {
        "comparisons": 0,
        "swaps": 0
    }

    for(let i = 1; i < array.length; i++){ // doing this when i = 0 won't do anything so we skip it
        insertionSortStep(array, i, amountOf)
    }

    return [array, amountOf]
}

export {insertionSort, insertionSortFull}