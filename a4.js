	function load_a4_thing()
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://private-40e0f-smugui2015.apiary-mock.com/assignments/4", true);
		xmlhttp.send();
		return xmlhttp.responseText;
	}

	function validateEmail()
	{
	var email = document.getElementById("ClientEmail").value;
	var validate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	if (validate === false)
		window.alert('Please enter a valid email address in the form of example@example.example');
		else
		{
		changePageBackground();
		}
	}

	function changePageBackground(){
		document.getElementById('formData').innerHTML = 'Thanks! Your email has been recorded'
		window.alert(document.title + load_a4_thing());
		}
