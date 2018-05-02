var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState === 4 && this.status === 200) {
		var data = get_data(this);
		put_img(data);

		var images = document.getElementsByTagName("td");
		for(i = 0; i < images.length; i++) {
            var caption = data.image[i].caption;
            var date = data.image[i].Date;

			function onmouse(el, ind, cap, date) {
				console.log("el" + el);
				read_caption(el, ind + 1, caption, date);
			}

			console.log(images[i]);
			images[i].onmouseover = onmouse(images[i].getElementsByTagName("div")[0], i, caption, date);
		}
	}
};

function get_data(json) {
    return JSON.parse(json);
}

xhttp.open("GET", "./img/data.json", true);
xhttp.send();

function read_caption(el, num, caption, date) {
	var month_names = ["January", "Febuary", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"];
	console.log(date);
	var date_list = date.split("-");
	var str_date = month_names[date_list[1] - 1] + " " + date_list[2] + ", " + date_list[0];
    
	el.innerHTML = "Date: " + str_date + "<br><br>" + caption;
	return ("Date: " + str_date + "<br><br>" + caption);
}

function put_img(data) {
	var table_cells = document.getElementsByTagName("td");
	var images = data.getElementsByTagName("image");

	for(i = 0; i < table_cells.length; i++) {
		var name = images[i].getElementsByTagName("name")[0].innerHTML;
		var el = table_cells[i];

		el.style.backgroundImage = "url(img/" + name + ")";
	}
}