const fs = require('fs');
const readline = require('readline');


function swap(arr, a, b) {
  const temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
  // [arr[b], arr[a]] = [arr[a], arr[b]]
}

function quickSort(arr, start, end) {
  if(start >= end) return 

  let left = start, right = end, pivot = arr[parseInt((start + end) / 2)]

  while(left <= right) {
    while(arr[left] < pivot) left++
    while(arr[right] > pivot) right--

    if(left <= right) {
      swap(arr, left, right)
      left++, right--
    }  
  }

  quickSort(arr, start, left -1)
  quickSort(arr, left, end)

}

async function processLineByLine() {
  const fileStream = fs.createReadStream('stdin.js');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let isFirst = true 
  let n = 0 // N(1 ≤ N ≤ 500,000)
  let sum = 0
  const data = []
  const count = {}

  for await (const line of rl) {
    const d = parseInt(line) // -4,000 ~ 4,000
    if(isFirst) {
      isFirst = false
      n = d
    } else {
     if(!count[line]) count[line] = 1
     else count[line] = count[line] + 1
     sum += d
     data.push(d)
    }
  }

  quickSort(data, 0, n -1)

  let maxD = 0
  let maxModeList = []
  for(key in count) {
    const d = count[key]
    if(maxD < d) maxD = d
  }
  
  for(key in count) {
    const d = count[key]
    if(d == maxD) maxModeList.push(parseInt(key))
  }
  
  
  if(maxModeList.length > 1) quickSort(maxModeList, 0 , maxModeList.length -1)

  console.log(Math.round((sum / n).toFixed(1)))
  console.log(data[parseInt(n / 2)])
  console.log(maxModeList.length > 1 ? maxModeList[1] : maxModeList[0])
  console.log(data[n -1] - data[0])
}

  

processLineByLine()

