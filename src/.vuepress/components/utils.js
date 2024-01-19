let c = 0
function counter(){
    return c++
}

function wait(getter, timeout=1000){
    return new Promise((res, rej)=>{
        let target
        let loop = setInterval(()=>{
            if (!target){
                target = getter()
            }
            if (target){
                res(target)
                clearInterval(loop)
            }
        },100)
        setTimeout(()=>{
            clearInterval(loop)
            rej("didn't found element")
        }, timeout)
    })
}

export {
    counter,
    wait
}