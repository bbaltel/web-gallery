function read_caption(el, num) {
	var current = data.num;
	console.log(num);
	console.log(current);
	el.innerHTML = "Date: " + new Date(current.date) + "\n" + current.caption;
}

function put_img() {
	console.log(data);
	table_cells = document.getElementsByTagName("td");
	var name="test.jpg"

	for(i = 0; i < table_cells.length; i++) {
		//var name = data.i.name;
		var el = table_cells[i];
		el.style.backgroundImage = "url(img/" + name + ")";
	}
}