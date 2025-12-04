function drawGift(size, symbol) {
  const out = [];
  if(size < 2) return "";
  for(let i = 0; i < size; i++) {
    if(i === 0 || i = size - 1) out.push(symbol.repeat(size));
    else {
      out.push(symbol + " ".repeat(size - 2) + symbol);
    }
  }
  return out.join('\n');
}

let a = drawgift(4, "*");
console.log(a)
