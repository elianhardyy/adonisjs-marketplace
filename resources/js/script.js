const searchBar = document.getElementById("search-bar");
const searchBarLarge = document.getElementById("search-bar-lg");
const searchModal = document.getElementById("searchModal")
const searchClose = document.getElementById('searchClose')
searchBar.addEventListener("click",function(){
    searchModal.classList.remove('hidden')
    searchModal.classList.add('flex')
})

searchBarLarge.addEventListener("click",function(){
    searchModal.classList.remove('hidden')
    searchModal.classList.add('flex')
})

searchClose.addEventListener("click",function(){
    searchModal.classList.remove('flex')
    searchModal.classList.add('hidden')
})

$(document).ready(function(){
    $('#searchInput').keyup(function(){
        var search = $("#searchInput").val();
        if(search==""){
            $("#memList").html("");
            $("#result").hide()
        }else{
            $.get("search/product",{q:search},function(data){
                console.log("hello");
                $("#memList").empty().html(data);
                $("#result").show()
            })
        }
    })
})
