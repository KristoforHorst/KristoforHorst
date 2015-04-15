//////////////////////
var UserObject = Parse.Object.extend("UserObject");
var refObj = Parse.Object.extend("references");

function loadReferences() {
	
	//
	var refObjsAct = Parse.collections.extend({model:refObj});
	//
	
$.get('references-list.mst', function(template) {
    $.getJSON(
        'http://private-3e97c-kristoforhorstguiclass2015assignment5.apiary-mock.com/applicants', 
        {}, 
        function(json, textStatus) {
            var data = {"references":json};
            console.log(data);
            var rendered = Mustache.render(template,data);
            $('#body').html(rendered);
        });
    }); 
}

function loadReferencesByID(id) {
	
	//
	var refObjAct = new Parse.query(refObj);
	packaged = {"name" : refObjAct.get(name), "PhoneNumber" : refObjAct.get(PhoneNumber)};
	//
$.get('references-detail.mst', function(template) {
    $.getJSON(
        'http://private-3e97c-kristoforhorstguiclass2015assignment5.apiary-mock.com/applicants/'+id,
        {}, 
        function(json, textStatus) {
            var data = {"references":json};
            var rendered = Mustache.render(template,data);
            $('#body').html(rendered);
        });
    });
}

//////////////////////////////

function test(){
    $("#body").text("");
    $.get('Testimonials-detail.mst', function(template) {
    var data = {"title":"TEST TITLE", 
                "nav":[
                    {"id":1, "clientName":"John Doe", "comment": "words words words"},
					 {"id":2, "clientName":"Jane Dough", "comment": "words words words2"},
					  {"id":3, "clientName":"Jock Doy", "comment": "words words words3"},
                    ]
                };
    var rendered = Mustache.render(template,data);
    $('#testimonials').html(rendered);
    });
}

function loadTestimonials() {
$.get('Testimonials-list.mst', function(template) {
    $.getJSON(
        'http://private-3e97c-kristoforhorstguiclass2015assignment5.apiary-mock.com/testimonial', 
        {}, 
        function(json, textStatus) {
            var data = {"testimonial":json};
            console.log(data);
            var rendered = Mustache.render(template,data);
            $('#body').html(rendered);
        });
    });
}

function loadTestimonialsById(id) {
$.get('Testimonials-detail.mst', function(template) {
    $.getJSON(
        'http://private-3e97c-kristoforhorstguiclass2015assignment5.apiary-mock.com/testimonial/'+id,
        {}, 
        function(json, textStatus) {
            var data = {"testimonial":json};
            var rendered = Mustache.render(template,data);
            $('#body').html(rendered);
        });
    });
}

function loadBlog() {
$.get('blog.mst', function(template) {
    $.getJSON(
        'http://private-3e97c-kristoforhorstguiclass2015assignment5.apiary-mock.com/blog', 
        {}, 
        function(json, textStatus) {
            var data = {"blog":json};
            console.log(data);
            var rendered = Mustache.render(template,data);
            $('#body').html(rendered);
        });
    });
}

function hashAction(){
    var testimonialPattern = /testimonial-\d+/g;
    var testimonialId = location.hash.match( testimonialPattern );
    if (testimonialId) {
        loadTestimonialsById(testimonialId);
        return;
    }
	var referencesPattern = /references-\d+/g;
    var referencesId = location.hash.match( referencesPattern );
    if (referencesId) {
        loadReferencesByID(referencesId);
        return;
    }
    switch(location.hash) {
        case '#requestMeet':
          //do something
		  var rendered = "<h3> Please request a meeting </h3><p><form action = \"\"><input type =\"text\" id=\"ClientName\" placeholder= \"Your Name Here\"><input type =\"text\" id=\"ClientEmail\" placeholder= \"Your Email Here\"><button type = \"button\" onclick = \"validateEmail()\"> Request a meeting!</button></form></p>";
		  $("#body").html(rendered);
		  
        break;
        case '#testimonials':
          //do something else
			loadTestimonials();
			//test();
        break;
        case '#blog':
          loadBlog();
        break;
		  case '#references':
          //do something else
          loadReferences();
        break;
        default:
          location.hash = "requestMeet";
      }
}

$(function(){
    $("#body").text("");
    $.get('navigation.mst', function(template) {
    var data = {"title":"TEST TITLE", 
                "nav":[
                    {"title":"Meet Me", "href":"requestMeet"},
                    {"title":"Testimonials", "href": "testimonials"},
                    {"title":"Blog", "href": "blog"},
					{"title":"References", "href": "references"},
                    ]
                };
    var rendered = Mustache.render(template,data);
    $('#navigation').html(rendered);
    });
    window.onhashchange = function(){
      hashAction();
    };
    hashAction();
});


function validateEmail()
	{
	var email = document.getElementById("ClientEmail").value;
	var validate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	if (validate === false)
		window.alert('Please enter a valid email address in the form of example@example.example');
		else
		{
		var userObject = new UserObject();
		userObject.save({"email" : email, "name" : document.getElementById("ClientName").value, "valid": true});
		window.alert('success');
		//changePageBackground();
		console.log(userObject);
		}
	}

function changePageBackground(){
		document.getElementById('formData').innerHTML = 'Thanks! Your email has been recorded'
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", "http://private-3e97c-kristoforhorstguiclass2015assignment5.apiary-mock.com/applicants", true);
		xmlhttp.send();
		return xmlhttp.responseText;
	}

