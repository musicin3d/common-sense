const binarySearch = require('../lib/binarySearchAsync')



it('handles promises from successful tests', async ()=>{
    const array = ['a', 'aa', 'aaa', 'aaaa', 'aaaab', 'aaaabb', 'aaaabbb', 'aaaabbbb']
    for(let i in array){
        i *= 1
        const target = array[i]
        const test = val => new Promise((resolve)=>{
            setTimeout(()=>{
                resolve( binarySearch.compare(target.length, val.length) )
            }, 0)
        })
        await expect(binarySearch(array, test)).resolves.toBe(i)
    }
})

it('handles promises from failed tests', async ()=>{
    const array = ['aa', 'aaa', 'aaaa','aaaabb', 'aaaabbb']
    const targets = ['a', 'aaaab', 'aaaabbbb']
    for(let target of targets){
        const test = val => new Promise((resolve)=>{
            setTimeout(()=>{
                resolve( binarySearch.compare(target.length, val.length) )
            }, 0)
        })
        await expect(binarySearch(array, test)).resolves.toBeNull()
    }
})
