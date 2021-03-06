const api_key="389f0a430b3651863320f69442c0caca";
//let countries=[];
fetch("https://restcountries.com/v3/all")
.then((resp) => resp.json())
.then(function(data) {
    console.log(data);
    //countries.push(data.name.official);
display_country(data);
})
.catch(err => {console.log(err);});
var container_div=document.createElement('div');
container_div.className="container";
container_div.setAttribute("id","info-con");
var row_div=document.createElement('div');
row_div.className="row";

container_div.appendChild(row_div);
document.body.appendChild(container_div);
function display_country(data){
    data.forEach((item) => {
console.log(item.name.official);
var col=document.createElement('div');
col.className="col-lg-4 col-sm-12 pb-3";
row_div.appendChild(col);
var col_div=document.createElement('div');
col_div.className="card";
col_div.style.width="20rem";

col.appendChild(col_div);
var title=document.createElement('h5');
title.innerHTML=item.name.official;
title.className="card-title p-2";
title.style.backgroundColor="black";
title.style.color="white";
title.style.textAlign="center";
col_div.appendChild(title);
var img = document.createElement('img');
img.src=item.flags[1];
//img.style.width="17rem";
img.className="card-img-top p-3 img-fluid ";
//col_div.appendChild(img);
var card_body=document.createElement('div');
card_body.style.color="white";
card_body.className="card-body";
col_div.appendChild(card_body);
card_body.appendChild(img);
var p_tag=document.createElement('p');
p_tag.innerHTML="Capital:"+item.capital+"<br> Region:"+item.region+"<br> Country_code:"+item.cca3;
card_body.appendChild(p_tag);
let but=document.createElement('button');
but.innerHTML="Click For Weather";
but.className="btn btn-primary";
but.setAttribute("id","weather-btn");
card_body.appendChild(but);
but.onclick=function(){
    var lat=item.latlng[0];
    var lng=item.latlng[1];
    console.log(lat +"..."+lng);
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid="+api_key)
    .then((resp_temp) => resp_temp.json())
    .then(function(data_temp) {
        console.log(data_temp);


    openModal(data_temp,item.name.official);

    })
    .catch(err => {console.log(err);});

}


    });

}
function display_form(){
    var contain=document.createElement('div');
    contain.className="container";
    var modal=document.createElement('div');
    modal.className="modal fade";
    modal.setAttribute("tabindex","-1");
    modal.setAttribute("role","dialog");
    modal.setAttribute("aria-labelledby","con_name");
    modal.setAttribute("aria-hidden","true")
    modal.setAttribute("id","mod");
var bt=document.getElementById("weather-btn");
bt.setAttribute("data-toggle","modal")
bt.setAttribute("data-target","#mod")

    var modal_dialog=document.createElement('div');
    modal_dialog.className="modal-dialog";
    modal.appendChild(modal_dialog);
    var modal_content=document.createElement('div');
    modal_content.className="modal-content pop-up";
    modal_dialog.appendChild(modal_content);
    var modal_header=document.createElement('div');
    modal_header.className="modal-header";
    modal_content.appendChild(modal_header);
var modal_div=document.createElement('div');
modal_div.className="modal-body";
var heading=document.createElement('h5');
heading.className="h2";
heading.setAttribute("id","con_name");

modal_header.appendChild(heading);
var cls_btn=document.createElement('button');
cls_btn.className="close pop-up";
cls_btn.setAttribute("data-dismiss","modal");
cls_btn.setAttribute("aria-label","Close");
var cls=document.createElement('span');
cls.setAttribute("aria-hidden","true");
cls.innerHTML="X";
cls_btn.appendChild(cls);
cls_btn.onclick=function(){closeModal();}
modal_header.appendChild(cls_btn);
var content=document.createElement('p');
//content.innerHTML=+items.main.temp;
content.setAttribute("id","temp");
content.className="h3";
content.style.fontWeight="bold";
content.style.textAlign="center";
modal_div.appendChild(content);
modal_content.appendChild(modal_div);
var modal_footer=document.createElement('div');
modal_footer.className="modal-footer";
modal_content.appendChild(modal_footer);
var btn=document.createElement('button');
btn.innerHTML="Cancel";
btn.className="btn btn-primary pop-up";
btn.setAttribute("data-dismiss","modal")
btn.onclick=function(){closeModal();}
modal_footer.appendChild(btn);
contain.appendChild(modal);
document.body.appendChild(contain);

}
function openModal(data,country_name) {
    display_form();
    //document.getElementById("backdrop").style.display = "block"
    //document.getElementById("mod").style
    document.getElementById("mod").style.display = "block";
    document.getElementById("mod").classList.add("show");
    document.getElementById("temp").innerHTML=Math.round((data.main.temp-(273.15))*100)/100+"<sup>O</sup>"+"C.";
    document.getElementById("con_name").innerHTML=country_name;
    document.getElementById("info-con").style.filter="blur(10px)";
}
function closeModal() {
    //document.getElementById("backdrop").style.display = "none"
    document.getElementById("mod").style.display = "none";
    document.getElementById("mod").classList.remove("show");
document.getElementById("info-con").style.filter="blur(0px)";
}
