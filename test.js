var randomOptionSet;
var tractIndex = [];

function test() {
    while (true) {
        randomOptionSet = Math.floor(Math.random() * 10);
        if (tractIndex.includes(randomOptionSet)) continue;
        else {
            tractIndex.push(randomOptionSet);
            break;
        }
    }
}

test()
test()
test()
test()
test()
test()
test()
test()
test()
test()
test()
test()
test()

console.log(tractIndex);
