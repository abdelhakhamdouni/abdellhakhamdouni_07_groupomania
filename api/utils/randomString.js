module.exports = (numbre = 8)=>{
    let str = "azertyuiopmlkjhgfdsqwxcvbnAZERTYUIOPMLKJHGFDSQWXCVBN123456789@_?!&"
    let random = ''
    for(let i = 0; i < numbre; i++){
        let r = Math.floor(Math.random()*str.length)
        random += str[r]
    }
    return random
}