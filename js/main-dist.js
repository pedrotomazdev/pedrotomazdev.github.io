$(document).ready((function(e){$(".load").addClass("ativo"),setTimeout((function(){$.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0").done((function(e){offset+=20,getBaseInfo.tratamentoPrimal(e)})),$(".load").removeClass("ativo"),$("#preload").addClass("no-show"),$("#main").removeClass("no-scroll");var e=document.createElement("script");e.src="js/chartjs/Chart.min.js",document.body.appendChild(e);var o=document.createElement("script");o.src="js/chartjs/Chart.bundle.min.js",document.body.appendChild(o);var a=document.createElement("script");a.src="js/slick/slick.min.js",document.body.appendChild(a);var s=document.createElement("link");s.href="https://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css",s.media="all",s.rel="stylesheet",s.id="font-awesome-5-kit-css1",document.head.appendChild(s);var t=document.createElement("link");t.href="https://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css",t.media="all",t.rel="stylesheet",t.id="font-awesome-5-kit-css2",document.head.appendChild(t);var i=document.createElement("link");i.href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css",i.media="all",i.rel="stylesheet",i.id="font-awesome-5-kit-css3",document.head.appendChild(i);var l=document.createElement("link");l.href="css/Chart.min.css",l.rel="stylesheet",document.head.appendChild(l),$("footer").addClass("ativo")}),3e3)}));var valores=[],getBaseInfo={attBtnCard:e=>{var o="https://pokeapi.co/api/v2/pokemon/"+e.getAttribute("data-card");pokeBase.getPokeUrl(o)},getSearchPoke:e=>{var o="https://pokeapi.co/api/v2/pokemon/"+e;$.ajax({url:o,type:"GET",dataType:"json",data:valores,success:function(e){pokeBase.createWindow(e),$(".load").removeClass("ativo")},error:function(e,o,a,s){console.log("Falha em: catchPoke [",e,o,a,s,"]"),$(".load").removeClass("ativo"),$("#failedToLoad").text("Sorry, no pokemon found in our database :("),$("#failedToLoad").addClass("ativo"),setTimeout((function(){$("#failedToLoad").text(""),$("#failedToLoad").removeClass("ativo")}),3e3)}})},tratamentoPrimal:e=>{for(i=0;i<e.results.length;i++){var o=e.results[i];getBaseInfo.catchPoke(o)}},catchPoke:e=>{$.ajax({url:e.url,type:"GET",dataType:"json",data:valores,success:function(e){getBaseInfo.pokedexDatabase(e)},error:function(e,o,a,s){console.log("Falha em: catchPoke [",e,o,a,s,"]")}})},pokedexDatabase:e=>{var o=e,a='            <div class="pokemons-card {pokeType}" data-card="{pokeId}" onclick="getBaseInfo.attBtnCard(this)">                <div class="poke-type">                    <i class="energy icon-{pokeType}"></i>                    <i class="energy icon-{pokeType2}"></i>                </div>                <div class="poke-icon">                        <img src="{pokeIcon}" alt="{pokeName}">                    </div>                <div class="poke-img {pokeType}">                    <img width="200" height="200" src={pokeSprite} class="primaria" alt="{pokeName}">                </div>                <div class="body-card">                    <div class="poke-id">                        <h3># {pokeIdN}</h3>                    </div>                    <div class="poke-name"><h2>{pokeName}</h2></div>                </div>            </div>        ';if(a=(a=(a=o.types[1]?a.replace(/{pokeType2}/g,o.types[1].type.name):a.replace(/{pokeType2}/g,"none")).replace(/{pokeIcon}/g,"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/"+o.id+".png")).replace(/{pokeId}/g,o.id),o.id<10){var s="00",t=o.id,i=s.concat(t);a=a.replace(/{pokeIdN}/g,i)}else if(o.id>=10&&o.id<100){s="0",t=o.id,i=s.concat(t);a=a.replace(/{pokeIdN}/g,i)}else a=a.replace(/{pokeIdN}/g,o.id);a=(a=a.replace(/{pokeType}/g,o.types[0].type.name)).replace(/{pokeName}/g,o.name);var l=o.id;l<10?l="00"+l:l<100&&(l="0"+l),a=a.replace(/{pokeSprite}/g,"https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+l+".png");var r=document.createElement("div");r.setAttribute("class","col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 "),r.setAttribute("style","order:"+o.order),r.innerHTML=a,document.getElementById("all_poke").appendChild(r)}},pokeBase={getPokeUrl:e=>{$.ajax({url:e,type:"GET",dataType:"json",data:valores,success:function(e){pokeBase.createWindow(e)},error:function(e,o,a,s){console.log("Falha em: getPokeUrl [",e,o,a,s,"]")}})},getSpecies:(e,o,a)=>{$.ajax({url:e,type:"GET",dataType:"json",data:valores,success:function(e){"primal"==o&&function(e){function o(e){e.forEach((e=>{$.ajax({url:"https://pokeapi.co/api/v2/pokemon/"+e.species_name,type:"GET",dataType:"json",data:valores,success:function(e){pokeBase.createEvolution(e)},error:function(e,o,a,s){console.log("Falha em: catchPoke [",e,o,a,s,"]")}})}))}e.flavor_text_entries.forEach((e=>{"en"==e.language.name&&"x"==e.version.name&&(document.getElementById("recebeDescricao").innerHTML=e.flavor_text)})),$.ajax({url:e.evolution_chain.url,type:"GET",dataType:"json",data:valores,success:function(e){let a=[],s=e.chain;do{let e=s.evolves_to.length;if(a.push({species_name:s.species.name,evolution_details:s.evolution_details}),e>1)for(let o=1;o<e;o++)a.push({species_name:s.evolves_to[o].species.name,evolution_details:s.evolves_to[o]?s.evolves_to[o].evolution_details:null,trigger:s.evolves_to[o]?s.evolves_to[o].evolution_details.trigger:null});s=s.evolves_to[0]}while(null!=s&&s.hasOwnProperty("evolves_to"));o(a)},error:function(e,o,a,s){console.log("Falha em: getSpecies [",e,o,a,s,"]")}})}(e)},error:function(e,o,a,s){console.log("Falha em: getSpecies [",e,o,a,s,"]")}})},createEvolution:e=>{var o="<div class='poke-evolv-img {type}' data-card='{pokeId}' onclick='getBaseInfo.attBtnCard(this)'><img src='{pokeImg}' alt='{pokeName}'></div><div class='types'><div class='type {pokeType}'>{pokeType}</div><div class='type {pokeType2}'>{pokeType2}</div></div><div class='poke-name'><span># {pokeIdN}</span></div><div class='poke-name'><span>{pokeName}</span></div>";o=(o=o.replace(/{pokeId}/g,e.id)).replace(/{pokeType}/g,e.types[0].type.name),o=e.types[1]?o.replace(/{pokeType2}/g,e.types[1].type.name):o.replace(/{pokeType2}/g,"none");var a=e.id;a<10?a="00"+a:a<100&&(a="0"+a),o=(o=(o=(o=o.replace(/{pokeImg}/g,"https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+a+".png")).replace(/{pokeName}/g,e.name)).replace(/{pokeIdN}/g,a)).replace(/{type}/g,e.types[0].type.name);var s=document.createElement("div");s.setAttribute("class","item"),s.setAttribute("style","order:"+e.order),s.innerHTML=o,document.getElementById("recebeEvolution").appendChild(s)},createWindow:e=>{$("#windowPoke").addClass("ativo"),$("#main").addClass("no-scroll"),$(".body-pokemon").css("display","none"),$("#infoPoke").addClass("ativo"),$(".load").addClass("ativo");var o="<div class='body-pokemon' style='display: none;'><div class='container'><div class='content-pokemon {pokeType}'><div class='body-content {pokeType}'><div class='col-md-12'><div class='poke-id'><div class='name'>{pokeName}</div><div class='id'> N°{pokeId}</div></div></div><div class='col-md-7 col-xs-12 col-lg-6'><div class='content-sprites'><div class='pokemon-img'><div class='item'><img src={pokeSprite} class='primaria' alt='{pokeName}'></div></div><div class='pokesprites'><div class='item'><img src='{pokeSpriteFront}' class='primaria' alt='{pokeName}'></div><div class='item'><img src='{pokeSpriteBack}' class='primaria' alt='{pokeName}'></div><div class='item'><img src='{pokeSpriteShyneFront}' class='primaria' alt='{pokeName}'></div><div class='item'><img src='{pokeSpriteShyneBack}' class='primaria' alt='{pokeName}'></div>"+(e.sprites.front_female?"<div class='item'><img src='{pokeSpriteFemale}' class='primaria' alt='{pokeName}'></div>":"")+(e.sprites.back_female?"<div class='item'><img src='{pokeSpriteFemaleBack}' class='primaria' alt='{pokeName}'></div>":"")+"</div></div></div><div class='col-md-5 col-xs-12 col-lg-6'><div class='pokemon-description' id='recebeDescricao'></div><div class='types'><div class='title'>Types:</div><div class='type {pokeType}'>{pokeType}</div><div class='type {pokeType2}'>{pokeType2}</div></div><div class='poke-chart'><div class='content'><canvas id='myChart' width='400' height='400'></canvas></div></div></div><div class='col-md-12 col-sm-12' style='filter: drop-shadow(1px 1px 2px #000);'><div class='content-evolution'><div class='title'><h3>Evolutions</h3></div><div id='recebeEvolution'></div></div></div></div></div></div></div>",a=e.id;a<10?a="00"+a:a<100&&(a="0"+a),o=(o=(o=(o=(o=(o=(o=(o=(o=(o=(o=(o=e.types[1]?o.replace(/{pokeType2}/g,e.types[1].type.name):o.replace(/{pokeType2}/g,"none")).replace(/{pokeSprite}/g,"https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+a+".png")).replace(/{pokeSpriteFront}/g,"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+e.id+".png")).replace(/{pokeSpriteBack}/g,"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/"+e.id+".png")).replace(/{pokeSpriteShyneFront}/g,"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/"+e.id+".png")).replace(/{pokeSpriteShyneBack}/g,"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/"+e.id+".png")).replace(/{pokeSpriteFemale}/g,"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/"+e.id+".png")).replace(/{pokeSpriteFemaleBack}/g,"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/"+e.id+".png")).replace(/{pokeId}/g,a)).replace(/{pokeType}/g,e.types[0].type.name)).replace(/{pokeSpriteBack}/g,e.sprites.back_default)).replace(/{pokeName}/g,e.name);var s=e.stats,t=[],i=[];s.forEach((e=>{t.push(e.base_stat),"special-defense"==e.stat.name?(e.stat.name="SD",i.push(e.stat.name)):"special-attack"==e.stat.name?(e.stat.name="SA",i.push(e.stat.name)):i.push(e.stat.name)})),setTimeout((function(){jQuery("#infoPoke").html(o);var a=[{id:"grass",color:"rgba(155, 204, 80)"},{id:"fire",color:"rgba(253, 125, 36)"},{id:"water",color:"rgba(69, 146, 196)"},{id:"bug",color:"rgba(114, 159, 63)"},{id:"normal",color:"rgba(164, 172, 175)"},{id:"steel",color:"rgba(158, 183, 184)"},{id:"poison",color:"rgba(185, 127, 201)"},{id:"ground",color:"rgba(247, 222, 63)"},{id:"fighting",color:"rgba(213, 103, 35)"},{id:"rock",color:"rgba(163, 140, 33)"},{id:"electric",color:"rgba(255, 250, 7)"},{id:"ghost",color:"rgba(123, 98, 163)"},{id:"psychic",color:"rgba(243, 102, 185)"},{id:"ice",color:"rgba(81, 196, 231)"},{id:"dragon",color:"rgba(83, 164, 207)"},{id:"fairy",color:"rgba(253, 185, 233)"},{id:"dark",color:"rgba(42, 42, 42)"},{id:"flying",color:"rgba(61, 199, 239)"}];function s(){for(var o=0;o<a.length;o++)if(a[o].id==e.types[0].type.name)return a[o].color}var l=document.getElementById("myChart").getContext("2d");new Chart(l,{type:"bar",data:{labels:i,datasets:[{axis:"y",label:"STATUS",lineTension:.1,backgroundColor:s(),borderColor:s(),pointBackgroundColor:s(),pointBorderColor:"#fff",pointHoverRadius:5,pointHoverBackgroundColor:"#fff",pointHoverBorderColor:s(),data:t}]},options:{indexAxis:"y",legend:{display:!1,labels:{display:!1,fontColor:"black",fontSize:20,fontFamily:"koho-bold"}}}});e.sprites.front_female&&setTimeout((function(){$(".pokesprites").slick({dots:!1,arrows:!1,infinite:!0,speed:300,slidesToShow:4,slidesToScroll:1,useTransform:!0,autoplay:!0,autoplaySpeed:2e3,focusOnSelect:!1})}),1e3);var r=e.species.url;pokeBase.getSpecies(r,"primal",e),$(".load").removeClass("ativo"),$(".body-pokemon").css("display","block")}),500)}},offset=0,lastScrollTop=0;$("#main").on("scroll",(function(e){let o=$(this).get(0);o.scrollTop+o.clientHeight>=o.scrollHeight-1&&($(".load").addClass("ativo"),$("#main").addClass("no-scroll"),$.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset="+offset).done((function(e){offset+=20,getBaseInfo.tratamentoPrimal(e)})),e.preventDefault(),setTimeout((function(){$(".load").removeClass("ativo"),$("#main").removeClass("no-scroll")}),1e3));var a=$(this).scrollTop();a>255?(a>lastScrollTop?($(".nenza-header").addClass("move-down-nenza"),$(".nenza-header").removeClass("move-up-nenza")):($(".nenza-header").removeClass("move-down-nenza"),$(".nenza-header").addClass("move-up-nenza")),lastScrollTop=a<=0?0:a):($(".nenza-header").removeClass("move-down-nenza"),$(".nenza-header").removeClass("move-up-nenza")),lastScrollTop=a})),$(".close-window").click((function(){$("#windowPoke").removeClass("ativo"),$("#main").removeClass("no-scroll")})),$("#startSearch").click((function(){$(".load").addClass("ativo");var e=$("#searchKey").val();e=e.split(" ").join(""),getBaseInfo.getSearchPoke(e)})),$("#searchKey").keypress((function(e){if("Enter"===e.key){$(".load").addClass("ativo");var o=$("#searchKey").val();o=o.split(" ").join(""),getBaseInfo.getSearchPoke(o)}}));