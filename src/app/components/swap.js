function swap(list, index1, index2){
    let temp = list[index1]
    list[index1] = list[index2]
    list[index2] = temp
}

export default swap