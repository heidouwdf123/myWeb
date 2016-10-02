// var arr = [1,2,3,4,5];
// for(var j = 0; j < arr.length; j++) {
//     (function(i) {
//         setTimeout(function() {
//             alert(arr[i]);  
//         }, (i + 1) * 1000);
//     })(j);
// }

// var arr = ['item 1', 'item 2', 'item 3'];  
// var list = arr.join('[*]');
// var foo = "11"+2-"1";
// console.log(foo);
// console.log(typeof foo);

var arr = [5,3,64,2,75,32];
console.log(arr.reverse());
console.log(arr.sort(comp));
function comp(value1,value2){
	return value2 - value1;
}

var str = "<tr><td>{$id}</td><td>{$name}</td></tr>";
try{console.log(str.replace(/{\$id}/g,'10').replace(/{\$name}/g,'Tony'));}catch(error){alert(error.type);}