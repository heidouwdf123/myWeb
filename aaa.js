var xhr = new XMLHttpRequest();
xhr.open('GET','../php/aaa.php');
xhr.send();
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4 && xhr.status == 200){
		console.log(xhr.responseText);
	}else{
		console.log(xhr.statusText);
	}
};
console.log(xhr);