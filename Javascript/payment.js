window.addEventListener( 'load', function()
{
	document.getElementById("Form").onsubmit = Valider;
});                    
        

function Valider()
{

	var AntalFejl = 0;
	var FejlBesked1 = "";
	var FejlBesked2 = "";
	
	if( document.getElementById( 'InputFirstNavn' ).value == "" )
	{	
		AntalFejl += 1;
		FejlBesked1 = "Skriv dit Navn!";
	}
	else
	{
		var regexpbogstaver = /^[a-zA-Z ]+$/;
		if( !regexpbogstaver.test( document.getElementById('InputFirstNavn').value ) )
		{
			AntalFejl += 1;
			FejlBesked1 = "Navn må kun indeholde bogstaver og mellemrum!";
		}
	}

	if( document.getElementById( 'InputNumber' ).value == "" )
	{	
		AntalFejl += 1;
		FejlBesked2 = "Skriv dit 13-cifrede kortnummer!";
	}
	else
	{
		var regexpbogstaver = /^[0-9]+$/;
		if( !regexpbogstaver.test( document.getElementById('InputNumber').value ) )
		{
			AntalFejl += 1;
			FejlBesked2 = "Kortnummer må kun indeholde Nummer !";
		}
	}
	
	if( AntalFejl == 0 )
	{
		return true;
	}
	else
	{
		document.getElementById( 'FejlBesked1' ).innerHTML = FejlBesked1;
		document.getElementById( 'FejlBesked2' ).innerHTML = FejlBesked2;
		return false;
	}
}