import swap from "./swap.js";

function partition(array, low, high, amountOf){ // goal is to have every number smaller than the pivot be on the left etc.
    let pivotIndex = high // choosing the pivot
    let pivot = array[pivotIndex] 
    let i = low - 1 // i is the last element we know of to be less than pivot

    for (let j = low; j <= high - 1; j++) { // j traverses the part of the list that we care about right now
        if(array[j] < pivot){
            i++ // if the element is less than the pivot, we can move i up one
            swap(array, i, j) // moves elements that are less than the pivot to the left 
            
            amountOf["comparisons"] += 1
            amountOf["swaps"] += 1
        }
    }
    
    swap(array, i + 1, pivotIndex) // swap the pivot to be after the 
    amountOf["swaps"] += 1
    
    return i + 1 // one after i is the pivot

}

// unfortunately, since this is recursive, we have to make an iterative list
// as in, document each list as it goes through and have it returned at the end
function quickSort(array, low, high, amountOf, lists){
    if(low < high){ // test case, is technically a comparison so we'll count it
        amountOf["comparisons"] += 1
        lists.push([...array])
        let part = partition(array, low, high, amountOf) // get the partition - middle of the list
        quickSort(array, low, part - 1, amountOf, lists) // do the same on the left side (smaller numbers)
        quickSort(array, part + 1, high, amountOf, lists) // do the same on the right side (higher numbers)
    }

    return [lists, amountOf]
}

// quickSort(array, 0, array.length - 1, amountOf, [])  
export default quickSort