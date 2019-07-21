'use strict'

const units = {
	'亿': 100000000,
	'万': 10000,
	'千': 1000,
	'百': 100,
	'十': 10,
	'九': 9,
	'八': 8,
	'七': 7,
	'六': 6,
	'五': 5,
	'四': 4,
	'三': 3,
	'二': 2,
	'一': 1,
	'零': 0,
}

function toDigital(string) {
	var sum = ''
	for (let i = 0; i < string.length; i++) {
		let ch = string[i]
		let d = units[ch]
		if (!units.hasOwnProperty(ch)) throw new Error(string + ' ' +  ch + ' is inValid!')

		if (d >= 10) {
			sum += String(i === 0 ? d : '*' + d)
		} else {
			let next = i + 1
			let prev = i - 1
			if ((next < string.length && units[string[next]] >= 10)) {
				sum += (prev >= 0 && units[string[prev]] >= 10) ? String('+' + d) : String(d)
			} else {
				sum += String('+' + d)
			}
		}
	}
	return eval(sum)
}

function fromDigital(num) {
	if (Number(num) === 10) {
		return '十'
	}
	num = String(num)
	let sum = ''
	let invertObj = zipObject(units)
	for(let i = 0; i < num.length; i++) {
		let n = invertObj[num[i]] 
		if (Number(num[i]) == 0) {
			// 最低位是0,不需要写成零;前面一位不是0
			if (i != num.length - 1 && sum[sum.length - 1] != '零') {
				sum += n
			}
		} else {
			sum += n
		}
		if (Number(num[i])) {
			sum += unit(num.length - i)	
		}
		
		
		// switch(num.length - i) {
		// 	case 4: 
		// 		if (!invertObj[Number(num[i])] || num.length === 4) {
		// 			sum += '千'
		// 			return sum
		// 		}
		// 		break;
		// 	case 3: 
		// 		if (!invertObj[Number(num[i])] || num.length === 3) {
		// 			sum += '百'
		// 			return sum
		// 		}
		// 		break;
		// 	case 2: 
		// 		if (!invertObj[Number(num[i])] || num.length === 2) {
		// 			sum += '十'
		// 		}
		// 		break;
		// }
	}
	return sum
}

function zipObject(obj) {
	if (Object.prototype.toString.call(obj) !== '[object Object]') return {}

	let keys = Object.keys(obj)

	return keys.reduce(function(mem, key) {
		mem[obj[key]] = key

		return mem
	}, {})
}

function unit(len) {
	let us = zipObject({
		'亿': 9,
		'万': 5,
		'千': 4,
		'百': 3,
		'十': 2,
	})
	if (len < 2) {
		return ''
	}
	let name = []
	while(len > 1) {
		let keys = Object.keys(us).reverse()
		for(let k in keys) {
			let key = Number(keys[k])
			if (len / key >= 1) {
				name.unshift(us[key])
				len -= key - 1
				break
			}
		}
	}
	// console.log(name)
	return name.join('')
}

module.exports = {
	toDigital,
	fromDigital,
}