const fs = require('fs');
const readline = require('readline');

function swap(arr, a, b) {
	const temp  = arr[a]
	arr[a] = arr[b]
	arr[b] = temp
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
  // const fileStream = fs.createReadStream('dev/stdin');
  const fileStream = fs.createReadStream('stdin.js');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  const count = {}
  let length =  0
  let sum = 0
  let isFirst = true
  const data = []
  for await (const line of rl) {
  	const d = parseInt(line)
  	if(isFirst) {
  		isFirst = false
  		length = d
  	} else {
  	 if(!count[line]) count[line] = 1
  	 else count[line] = count[line] + 1
  	 sum += d
  	 data.push(d)
  	}
  }

  quickSort(data, 0, length -1)

  const modeCount = {}
  let modeMax = 0
  let mode = 0
  
  for(key in count) {
  	const d = count[key]
  	if(modeMax < d) modeMax = d
  	if(!modeCount[d]) modeCount[d] = [parseInt(key)]
  	else modeCount[d].push(parseInt(key))
  }
  const modeMaxList = modeCount[modeMax];
  if(modeMaxList.length > 1) {
  	quickSort(modeMaxList, 0, modeMaxList.length -1)
  	mode = modeMaxList[1]
  } else {
  	mode = modeMaxList[0]
  }

  console.log(Math.round((sum / length).toFixed(1)))
  console.log(data[parseInt(length / 2)])
 	console.log(mode)	
  console.log(data[length -1] - data[0])
}

processLineByLine()

