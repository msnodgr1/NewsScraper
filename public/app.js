$.getJSON("/articles", function(data){

	for (var i = 0; i < data.length; i++) {
	 //$("#newsFeed").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
	var news = "<div class='card'><div class='card-body'><h4 class='card-title' data-id='" + data[i]._id + "'>" + data[i].title + "</h4>" + "<a href='" + data[i].link + "' " +  "class='btn btn-primary'>Read</a>" + "</div></div>" ;
	$('#newsFeed').append(news);
	}
})


//var news = "<div class="card"><div class="card-body"><h4 class="card-title" data-id=" + data[i]._id + ">" + data[i].title + "</h4>" + "<a href='" + data[i].link + "' " +  "class="btn btn-primary">Go somewhere</a>" + "</div></div>" 