import swap from "./swap.js"

function selectionSortStep(array, i, amountOf){
    let smallest = i // assume index of smallest number is the starting point
    for(let j = i + 1; j < array.length; j++){ // go through every number past i (unsorted)
        if (array[j] < array[smallest]){ // if it's smaller
            smallest = j // make that the new "smallest"

            amountOf["comparisons"] += 1 // we have a comparison here
         }
    }

    swap(array, i, smallest) // swap the smallest with the starting point
    amountOf["swaps"] += 1 // we have a swap
}

function selectionSort(array, lists){

    for(let i = 0; i < array.length - 1; i++){ // runs the function for every meaningful value of i, going through the list
        let amountOf = {
            "comparisons": 0,
            "swaps": 0
        }
        selectionSortStep(array, i, amountOf)
        lists.push([[...array], {...amountOf}])
    }

    return lists
}

function selectionSortFull(array, lists){
    let amountOf = {
        "comparisons": 0,
        "swaps": 0
    }
    for(let i = 0; i < array.length - 1; i++){ // runs the function for every meaningful value of i, going through the list
        selectionSortStep(array, i, amountOf)
    }

    return [array, amountOf]
}

export {selectionSort, selectionSortFull}