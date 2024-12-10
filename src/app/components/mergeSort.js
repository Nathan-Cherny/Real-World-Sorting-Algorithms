function merge(array, left, mid, right, amountOf, lists){
    const leftLength = mid - left + 1 // length of array to the left of mid
    const rightLength = right - mid // length of the array to the right

    // making new arrays "merging" the data
    let leftArray = new Array(leftLength)
    let rightArray = new Array(rightLength)

    for(let i = 0; i < leftLength; i++){
        amountOf["comparisons"] += 1
        leftArray[i] = array[left + i] // setting the left array to be the values that are on the left of mid
    }
    for(let j = 0; j < rightLength; j++){
        amountOf["comparisons"] += 1
        rightArray[j] = array[mid + 1 + j] // setting the right array to be the values that are on the right of mid
    }

    let i = 0, j = 0
    let k = left

    while(i < leftLength && j < rightLength){ // now we actually combine them together and sort them
        amountOf["comparisons"] += 1
        amountOf["comparisons"] += 1
        if(leftArray[i] <= rightArray[j]){
            array[k] = leftArray[i]
            i++
        }
        else{
            array[k] = rightArray[j]
            j++
        }
        amountOf["comparisons"] += 1
        k++
    }

    // in case i and j aren't the same length this just gets everything
    while(i < leftLength){
        amountOf["comparisons"] += 1
        array[k] = leftArray[i]
        i++
        k++
    }
    amountOf["comparisons"] += 1
    while(j < rightLength){
        amountOf["comparisons"] += 1
        array[k] = rightArray[j]
        j++
        k++
    }
    amountOf["comparisons"] += 1
}

function mergeSort(array, left, right, amountOf, lists){
    if(left >= right){
        return [lists, amountOf]
    }
    amountOf["comparisons"] += 1

    const mid = Math.floor(left + (right - left) / 2) // getting the middle
    mergeSort(array, left, mid, amountOf, lists) // do it on the left
    mergeSort(array, mid + 1, right, amountOf, lists) // on the right
    merge(array, left, mid, right, amountOf, lists); // combine them
    lists.push([...array]) // record the list
    return [lists, amountOf] // return result
}

let l = [5, 4, 3, 2, 1]
let amountOf = {
    "comparisons": 0,
    "swaps": 0
}

export default mergeSort