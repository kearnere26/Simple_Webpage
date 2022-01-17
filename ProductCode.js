			
			
var prodRows = document.getElementById("items") ;
var prodRequest ;
var prodData ;
var sortOrder = "D" ;
prodRequest = new XMLHttpRequest( ) ;
prodRequest.open("GET", "ProductList.json") ;
prodRequest.send( ) ;
prodRequest.onload = function( )

{
	
	prodData = JSON.parse(prodRequest.responseText) ;	
	renderTable(prodData) ;
}

function renderTable(data)
    {
        var prodRowData = "";

        for (i = 0; i<data.length; i++)
            {
                prodRowData += "<tr><td id = 'prodID"+i+"'>" + data[i].ProdID + "</td><td>" + "<img src=" +data[i].ProdImg+ ">" + "</td><td id='prodName"+i+"'>" + data[i].ProdName + "</td><td>" + data[i].ProdDesc + "</td><td>$" + data[i].ProdPrice + "</td><td>" + "<input type='text' maxlength='4' size='4' id='ProdQty"+i+"' value='0'" + "</td></tr>";
			}

			
	    prodRows.innerHTML = prodRowData ;
    }
function confirmQty( )
{
	var products = [];
	var CusProducts = [];
	
	for (i = 0; i < 10; i++){
		var p = document.getElementById("ProdQty" +i).value;
		if(p > 0)
		{
			products += document.getElementById("prodName"+i).innerText + ": Qty " + p + "\n";
			CusProducts += "ProdID: " + document.getElementById("prodID"+i).innerHTML + ", Qty " + p + "\n";
		}
		
	}
	if (CusProducts > "" && CusProducts != null)
	{
			if(confirm("Are you sure you want to order the following: \n" + products)){
			
			localStorage.setItem("CustomerProducts", JSON.stringify(CusProducts));
			alert("Thank you, your order has been placed!");
			
			}
	}    
 }   

function sortByID()
{
    if (sortOrder == "A")   
    {
        prodData.sort(function(a,b)
        {
            return a.ProdID - b.ProdID ;
        } ) ;
        sortOrder = "D" ;
    }
    else    
    {
        prodData.sort(function(a,b)
        {
            return b.ProdID - a.ProdID ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

function sortByName()
{
    if (sortOrder == "A")   
    {
        prodData.sort(function(a,b)
        {
            if (a.ProdName < b.ProdName)
            {
                return -1 ;
            }
        }) ;
        sortOrder = "D" ;
    }
    else    
    {
        prodData.sort(function(a,b)
        {
            if (a.ProdName > b.ProdName) 
            {
                return -1; 
            }
        }) ;
        sortOrder = "A" ;
    }
	
    renderTable(prodData) ;
}

function sortByPrice()
{
   if (sortOrder == "A")   
    {
        prodData.sort(function(a,b)
        {
            return a.ProdPrice - b.ProdPrice ;
        } ) ;
        sortOrder = "D" ;
    }
    else    
    {
        prodData.sort(function(a,b)
        {
            return b.ProdPrice - a.ProdPrice ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}
function confirmReset(){
	return confirm("Are you sure you want to cancel your selections?");
}

