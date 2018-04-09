function read_caption(el, num) {
	let current = data[num];

	
	var month_names = ["January", "Febuary", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"];
	var date_list = current.date.split("-");
	var str_date = month_names[date_list[1] - 1] + " " + date_list[2] + ", " + date_list[0];

	el.innerHTML = "Date: " + str_date + "<br><br>" + current.caption;
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