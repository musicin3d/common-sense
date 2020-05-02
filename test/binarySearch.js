const binarySearch = require('../lib/binarySearch')



test('default test compares numbers', ()=>{
    expect(binarySearch.compare(4, 5)).toBe(-1)
    expect(binarySearch.compare(6, 5)).toBe(1)
    expect(binarySearch.compare(5, 5)).toBe(0)
})




it('finds target anywhere in an array', ()=>{
    const array = [...Array(10).keys()].map(val => val+10)
    for(let val of array){
        expect(binarySearch(array, val)).toBe(val-10)
    }
})

it('returns null if target is not in array', ()=>{
    const array = [...Array(10).keys()].map(val => val+10)
    const vals = [1, 20, 15.5]
    for(let val of vals){
        expect(binarySearch(array, val)).toBeNull()
    }
})


it('finds target anywhere in a range', ()=>{
    // yes, this is ridiculous, but it is possible
    const max = 9
    for(let val = 0; val <= max; val++){
        expect(binarySearch(max, val)).toBe(val)
    }
})

it('returns null if target is not in range', ()=>{
    // yes, this is also ridiculous, but it is also possible
    const max = 9
    const vals = [-1, 10, 5.5]
    for(let val of vals){
        expect(binarySearch(max, val)).toBeNull()
    }
})



it('finds a positive test anywhere in an array', ()=>{
    const array = ['a', 'aa', 'aaa', 'aaaa', 'aaaab', 'aaaabb', 'aaaabbb', 'aaaabbbb']
    for(let i in array){
        i *= 1
        const target = array[i]
        const test = val => binarySearch.compare(val.length, target.length)
        expect(binarySearch(array, test)).toBe(i)
    }
})

it('returns null if the test cannot be satisified by an array', ()=>{
    const array = ['aa', 'aaa', 'aaaa','aaaabb', 'aaaabbb']
    const targets = ['a', 'aaaab', 'aaaabbbb']
    for(let target of targets){
        const test = val => binarySearch.compare(val.length, target.length)
        expect(binarySearch(array, test)).toBeNull()
    }
})


it('finds a positive test anywhere in a range', ()=>{
    const max = 9
    for(let target = 0; target <= max; target++){
        const test = val => binarySearch.compare(val, target)
        expect(binarySearch(max, test)).toBe(target)
    }
})

it('returns null if the test cannot be satisified by a range', ()=>{
    const max = 9
    const targets = [-1, 10, 5.5]
    for(let target of targets){
        const test = val => binarySearch.compare(val, target)
        expect(binarySearch(max, test)).toBeNull()
    }
})




it('below threshold: finds target anywhere in an array, regardless', ()=>{
    const array = [...Array(10).keys()].map(val => val+10)
    for(let val of array){
        expect(binarySearch(array, val, -1)).toBe(val-10)
    }
})

it('below threshold: returns the lower near-match if target is not in an array', ()=>{
    const array = [...Array(10).keys()].map(val => val+10)
    const targets = [1, 20, 15.5]
    const expecteds = [null, 9, 5]
    for(let i in targets){
        i *= 1
        const target = targets[i]
        const expected = expecteds[i]
        expect(binarySearch(array, target, -1)).toBe(expected)
    }
})


it('below threshold: finds target anywhere in a range, regardless', ()=>{
    const max = 9
    for(let val = 0; val <= max; val++){
        expect(binarySearch(max, val, -1)).toBe(val)
    }
})

it('below threshold: returns the lower near-match if target is not in a range', ()=>{
    const max = 9
    const targets = [-1, 10, 5.5]
    const expecteds = [null, 9, 5]
    for(let i in targets){
        i *= 1
        const target = targets[i]
        const expected = expecteds[i]
        expect(binarySearch(max, target, -1)).toBe(expected)
    }
})



it('below threshold: finds a positive test anywhere in an array, regardless', ()=>{
    const array = ['a', 'aa', 'aaa', 'aaaa', 'aaaab', 'aaaabb', 'aaaabbb', 'aaaabbbb']
    for(let i in array){
        i *= 1
        const target = array[i]
        const test = val => binarySearch.compare(val.length, target.length)
        expect(binarySearch(array, test, -1)).toBe(i)
    }
})

it('below threshold: returns the lower near-match if the test cannot be satisified by an array', ()=>{
    const array = ['aa', 'aaa', 'aaaa','aaaabb', 'aaaabbb']
    const targets = ['a', 'aaaab', 'aaaabbbb']
    const expecteds = [null, 2, 4]
    for(let i=0; i<targets.length; i++){
        i *= 1
        const target = targets[i]
        const expected = expecteds[i]
        const test = val => binarySearch.compare(val.length, target.length)
        expect(binarySearch(array, test, -1)).toBe(expected)
    }
})


it('below threshold: finds a positive test anywhere in a range, regardless', ()=>{
    const max = 9
    for(let target = 0; target <= max; target++){
        const test = val => binarySearch.compare(val, target)
        expect(binarySearch(max, test, -1)).toBe(target)
    }
})

it('below threshold: returns the lower near-match if the test cannot be satisified by a range', ()=>{
    const max = 9
    const targets = [-1, 10, 5.5]
    const expecteds = [null, 9, 5]
    for(let i in targets){
        i *= 1
        const target = targets[i]
        const expected = expecteds[i]
        const test = val => binarySearch.compare(val, target)
        expect(binarySearch(max, test, -1)).toBe(expected)
    }
})




it('above threshold: finds target anywhere in an array, regardless', ()=>{
    const array = [...Array(10).keys()].map(val => val+10)
    for(let val of array){
        expect(binarySearch(array, val, 1)).toBe(val-10)
    }
})

it('above threshold: returns the higher near-match if target is not in an array', ()=>{
    const array = [...Array(10).keys()].map(val => val+10)
    const targets = [1, 20, 15.5]
    const expecteds = [0, null, 6]
    for(let i in targets){
        i *= 1
        const target = targets[i]
        const expected = expecteds[i]
        expect(binarySearch(array, target, 1)).toBe(expected)
    }
})


it('above threshold: finds target anywhere in a range, regardless', ()=>{
    const max = 9
    for(let val = 0; val <= max; val++){
        expect(binarySearch(max, val, 1)).toBe(val)
    }
})

it('above threshold: returns the higher near-match if target is not in a range', ()=>{
    const max = 9
    const targets = [-1, 10, 5.5]
    const expecteds = [0, null, 6]
    for(let i in targets){
        i *= 1
        const target = targets[i]
        const expected = expecteds[i]
        expect(binarySearch(max, target, 1)).toBe(expected)
    }
})



it('above threshold: finds a positive test anywhere in an array, regardless', ()=>{
    const array = ['a', 'aa', 'aaa', 'aaaa', 'aaaab', 'aaaabb', 'aaaabbb', 'aaaabbbb']
    for(let i in array){
        i *= 1
        const target = array[i]
        const test = val => binarySearch.compare(val.length, target.length)
        expect(binarySearch(array, test, 1)).toBe(i)
    }
})

it('above threshold: returns the higher near-match if the test cannot be satisified by an array', ()=>{
    const array = ['aa', 'aaa', 'aaaa','aaaabb', 'aaaabbb']
    const targets = ['a', 'aaaab', 'aaaabbbb']
    const expecteds = [0, 3, null]
    for(let i=0; i<targets.length; i++){
        i *= 1
        const target = targets[i]
        const expected = expecteds[i]
        const test = val => binarySearch.compare(val.length, target.length)
        expect(binarySearch(array, test, 1)).toBe(expected)
    }
})


it('above threshold: finds a positive test anywhere in a range, regardless', ()=>{
    const max = 9
    for(let target = 0; target <= max; target++){
        const test = val => binarySearch.compare(val, target)
        expect(binarySearch(max, test, 1)).toBe(target)
    }
})

it('above threshold: returns the higher near-match if the test cannot be satisified by a range', ()=>{
    const max = 9
    const targets = [-1, 10, 5.5]
    const expecteds = [0, null, 6]
    for(let i in targets){
        i *= 1
        const target = targets[i]
        const expected = expecteds[i]
        const test = val => binarySearch.compare(val, target)
        expect(binarySearch(max, test, 1)).toBe(expected)
    }
})
