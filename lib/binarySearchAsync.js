/**
 * Executes a binary search over a list of values or a range of integers. Supports fuzzy matching.
 *
 * You can specify a target value and use the normal greater-than-less-than comparison,
 *   or you can specify your own comparator.
 * You can also change the match mode to find the highest low or lowest high.
 * This is especially useful when you are testing a binary condition, rather than looking for a specific value.
 *
 * @param arrayOrMax {array|number}  Array of values to search, or the maximum possible value
 * @param test {number|function(*)}  The asynchronous test/comparator function.
 *   The function should accept a single value.
 *   It should return a promise that resolves to: a negative number if target is lower, zero if target matches, or a positive number if target is higher.
 * @param matchMode {number}  How to handle situations where a matching value may not be found.
 *   If zero, only a match is acceptable.
 *   If a negative number, choose the lower of the two closest values.
 *   If a positive number, choose the higher of the two closest values.
 *   Default: 0 (match is required)
 *
 * @returns {Promise<number|null>}  Resolves to the index of the match if found, or the index of the closest value if matchMode permits.
 *   Resolves to null if a match is required but not found.
 */
async function binarySearchAsync(arrayOrMax, test, matchMode = 0){
    let getVal
    let max

    if(Array.isArray(arrayOrMax)){
        getVal = i => arrayOrMax[i]
        max = arrayOrMax.length - 1
    } else if(typeof arrayOrMax == 'number'){
        getVal = i => i
        max = arrayOrMax
    } else {
        throw new TypeError("First parameter must be either an array of possible values or the maximum value as a number")
    }

    if(typeof test != 'function'){
        throw new TypeError("Second parameter must be an asynchronous function")
    }

    return search(max, getVal, test, matchMode)
}


binarySearchAsync.compare = (target, val)=>{
    if(target < val)  return -1
    if(target > val)  return 1
    return 0
}


async function search(max, getVal, test, match){
    const min = 0
    let low = min
    let high = max
    let mid
    let hint

    while(low <= high){
        mid = Math.floor( (low+high) / 2 )
        const result = test( getVal(mid) )
        if(typeof result.then != 'function')  throw new TypeError("Test function should return a promise. Use binarySearch() if you don't need async handling.")
        hint = await result
        if(hint > 0) {
            low = mid + 1
        } else if(hint < 0) {
            high = mid - 1
        } else {
            return mid
        }
    }

    if(match === 0){
        return null
    } else if(match < 0 && hint < 0){
        return (mid === min ? null : mid - 1)
    } else if(match > 0 && hint > 0){
        return (mid === max ? null : mid + 1)
    } else {
        return mid
    }
}



// EXPORT
if(typeof module == 'object' && module.exports){
    module.exports = binarySearchAsync
}
else if(window){
    window.commonSense || (window.commonSense = {})
    window.commonSense.binarySearchAsync = binarySearchAsync;
}
