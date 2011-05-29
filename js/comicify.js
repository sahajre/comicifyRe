// Add default theme

var css_link_tag = document.createElement("link");
css_link_tag.rel = "stylesheet";
css_link_tag.href = "../themes/default/classic.css";
document.documentElement.appendChild( css_link_tag );

if ( typeof window['jQuery'] === 'undefined' ) {
	var jquery_script_tag = document.createElement("script");
	jquery_script_tag.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js";
	document.documentElement.appendChild( jquery_script_tag );
}

function drawFullHorizontalLine(context, from_y, to_x) {
	drawLine(context, 0, from_y, to_x, from_y);
}

function drawLine(context, from_x, from_y, to_x, to_y) {
	context.beginPath();
	context.moveTo(from_x, from_y);
	context.lineTo(to_x, to_y);
	context.stroke();
}

function drawHeader(context, strip_element) {
	var header = $(strip_element).find(".header").html();
	if( header != null ) {
		var width = 200; //TODO: find 
		alert("header is " + header);
		context.fillStyle = "rgba(255, 255, 255, 0.9)";
		context.fillRect(0, 0, width, 18);
		context.textBaseline = "top";
		context.font = "12px cursive";
		context.strokeStyle = "#000";
		context.fillText(header.toUpperCase(), 1, 1);
		drawFullHorizontalLine(context, 18, width);
	}
}

function drawFooter(context, strip_element) {
	var footer = $(strip_element).find(".footer").html();
	if( footer != null ) {
		var width = 200; //TODO: find 
		var height = 260; //TODO: find 
		alert( "footer is " + footer );
		context.fillStyle = "rgba(255, 255, 255, 0.9)";
		context.fillRect(0, height - 18, width, 18);
		context.textBaseline = "top";
		context.font = "12px cursive";
		context.strokeStyle = "black";
		context.fillText(footer.toUpperCase(), 1, height - 16);
		drawFullHorizontalLine(context, height - 18, width);
	}
}

function drawBackground(context, strip_element) {
	var background = $(strip_element).find(".background").html();
	if( background != null) {
		var background_img = $(background).attr("src");
		if(background_img != null) {
			alert(background_img);
			var img = new Image();
			img.src = background_img.toString();
			alert(img.src);
			//img.src = "http://rahul.upakare.com/wp-content/uploads/2010/10/02102010134-300x225.jpg";
			//img.src = "file:///C:/Documents%20and%20Settings/rahulu/bb/nemo/examples/cpp/images/1.jpg";
			//img.src = "https://lh5.googleusercontent.com/-4NP72kSDBFA/AAAAAAAAAAI/AAAAAAAAAAA/AZ3jS_iuw2U/photo.jpg";
			img.onload = function () {
				var imgWidth = img.width;
				var imgHeight = img.height;
				alert("image width = " + imgWidth + " image height " + imgHeight);
				var x = 0, y = 0, width = 200, height = 260;
				context.drawImage(img, 0, 0, imgWidth, imgHeight, x, y, width, height);
				drawHeader(context, strip_element);
				drawFooter(context, strip_element);
				//drawEllipse(context, 90, 40, 180, 100); 
			}
		}
	}
}

function drawEllipse(context, rectx0, recty0, rectx1, recty1) {
	var K = 4*((Math.SQRT2-1)/3);
	var w = rectx1-rectx0;
	var h = recty1-recty0;

	// Ellipse radius
	var rx = w/2, ry = h/2; 
	// Ellipse center
	var cx = rectx0+rx,
	    cy = recty0+ry;
	// Ellipse radius*Kappa, for the Bézier curve control points
	rx *= K;
	ry *= K;
	context.beginPath();

	// startX, startY
	context.moveTo(cx, recty0);
	// Control points: cp1x, cp1y, cp2x, cp2y, destx, desty
	// go clockwise: top-middle, right-middle, bottom-middle, then left-middle
	context.bezierCurveTo(cx + rx, recty0, rectx1, cy - ry, rectx1, cy);
	context.bezierCurveTo(rectx1, cy + ry, cx + rx, recty1, cx, recty1);
	context.bezierCurveTo(cx - rx, recty1, rectx0, cy + ry, rectx0, cy);
	context.bezierCurveTo(rectx0, cy - ry, cx - rx, recty0, cx, recty0);

	context.closePath();
	var hue = hue + 10 * Math.random();
	//context.strokeStyle = 'hsl(' + hue + ', 50%, 50%)';
	//context.shadowColor = 'white';
	context.shadowBlur = 10;
	context.stroke();
}

function makeComicStrip(strip_id, strip_element) {
	alert(strip_id);
	context = document.getElementById(strip_id).getContext("2d");
	if(!context) {
		return;
	}

	//drawHeader(context, strip_element);
	//drawFooter(context, strip_element);
	drawBackground(context, strip_element);


	$("#" + strip_id).show();

}

function makeComic() {
	$(document).ready(function(){

		$(".comic").each( function() {
			var count = 0;
			$(this).find(".strip").each( function() {
				$(this).hide();
				count += 1;
				var strip_id = "strip" + count;
				
				$(this).parent().append("<canvas id=\"" + strip_id + "\" width=\"200\" height=\"260\">Canvas is not supported</canvas>");
				/*
				$(this).parent().append("<canvas id=\"" + strip_id + "\">Canvas is not supported</canvas>");
				
				var height = $(this).parent().find("canvas").css("height");
				if(height != null) {
					alert("canvas height " + parseInt(height));
					$(this).parent().find("canvas").attr("height", ""+(parseInt(height)));
				}

				var width = $(this).parent().find("canvas").css("width");
				if(width != null) {
					alert("canvas width " + parseInt(width));
					$(this).parent().find("canvas").attr("width", ""+(parseInt(width)));
				}
				*/
				var strip_element = this;
				makeComicStrip(strip_id, strip_element);

			});
		});
	});
}

makeComic();
