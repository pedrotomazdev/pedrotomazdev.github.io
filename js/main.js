
// inicia a pokedex com os primeiros 20 pokemons
$(document).ready(function (showFirst) {
    $('.load').addClass('ativo');


    setTimeout(function () {
        $.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
            .done(function (resultadoPrimario) {
                getBaseInfo.tratamentoPrimal(resultadoPrimario);
                offset += 20;
            });

        $('.load').removeClass('ativo');
        $('#preload').addClass('no-show')
        $('#main').removeClass('no-scroll');


        // var scriptAddThis = document.createElement('script');
        // scriptAddThis.src = 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6028189be0fe16db';
        // document.body.appendChild(scriptAddThis);

        var scriptChart = document.createElement('script');
        scriptChart.src = 'js/chartjs/Chart.min.js';
        document.body.appendChild(scriptChart);

        var scriptChartBundle = document.createElement('script');
        scriptChartBundle.src = 'js/chartjs/Chart.bundle.min.js';
        document.body.appendChild(scriptChartBundle);

        var scriptSlick = document.createElement('script');
        scriptSlick.src = 'js/slick/slick.min.js';
        document.body.appendChild(scriptSlick);

        var linkCssFont1 = document.createElement('link');
        linkCssFont1.href = 'https://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css';
        linkCssFont1.media = "all";
        linkCssFont1.rel = "stylesheet";
        linkCssFont1.id = "font-awesome-5-kit-css1"
        document.head.appendChild(linkCssFont1);

        var linkCssFont2 = document.createElement('link');
        linkCssFont2.href = 'https://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css';
        linkCssFont2.media = "all";
        linkCssFont2.rel = "stylesheet";
        linkCssFont2.id = "font-awesome-5-kit-css2"
        document.head.appendChild(linkCssFont2);

        var linkCssFont3 = document.createElement('link');
        linkCssFont3.href = 'https://kit-free.fontawesome.com/releases/latest/css/free.min.css';
        linkCssFont3.media = "all";
        linkCssFont3.rel = "stylesheet";
        linkCssFont3.id = "font-awesome-5-kit-css3"
        document.head.appendChild(linkCssFont3);

        var linkCssChart = document.createElement('link');
        linkCssChart.href = 'css/Chart.min.css';
        linkCssChart.rel = "stylesheet";
        document.head.appendChild(linkCssChart);

        // interação com o rodape animado
        $('footer').addClass('ativo');
    }, 3000);
});

var valores = [];

// funções de inicialização da Pokedéx
var getBaseInfo = {

    // exibe informações detalhadas do pokemon a partir do click
    attBtnCard: (card) => {
        var url = 'https://pokeapi.co/api/v2/pokemon/' + card.getAttribute('data-card');
        pokeBase.getPokeUrl(url);
    },
    // Fim

    getSearchPoke: (inputValueSearch) => {
        var urlSearch = 'https://pokeapi.co/api/v2/pokemon/' + inputValueSearch;
        $.ajax({
            url: urlSearch,
            type: 'GET',
            dataType: 'json',
            data: valores,
            success: function (pokeInformation) {
                pokeBase.createWindow(pokeInformation)
                $('.load').removeClass('ativo');

            },
            error: function (XMLHttpRequest, textStatus, errorThrown, result) {
                console.log('Falha em: catchPoke [', XMLHttpRequest, textStatus, errorThrown, result, ']');
                $('.load').removeClass('ativo');
                $('#failedToLoad').text('Sorry, no pokemon found in our database :(');
                $('#failedToLoad').addClass('ativo');

                setTimeout(function () {
                    $('#failedToLoad').text('');
                    $('#failedToLoad').removeClass('ativo');
                }, 3000);

            }
        });
    },

    tratamentoPrimal: (resultadoPrimario) => {
        for (i = 0; i < resultadoPrimario.results.length; i++) {
            var pokeRequest = resultadoPrimario.results[i];
            getBaseInfo.catchPoke(pokeRequest);
        }
    },

    catchPoke: (pokeRequest) => {
        $.ajax({
            url: pokeRequest.url,
            type: 'GET',
            dataType: 'json',
            data: valores,
            success: function (gotcha) {
                getBaseInfo.pokedexDatabase(gotcha);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown, result) {
                console.log('Falha em: catchPoke [', XMLHttpRequest, textStatus, errorThrown, result, ']');
            }
        });


    },

    pokedexDatabase: (gotcha) => {
        var base = gotcha;

        var templateInit = '\
            <div class="pokemons-card {pokeType}" data-card="{pokeId}" onclick="getBaseInfo.attBtnCard(this)">\
                <div class="poke-type">\
                    <i class="energy icon-{pokeType}"></i>\
                    <i class="energy icon-{pokeType2}"></i>\
                </div>\
                <div class="poke-icon">\
                        <img src="{pokeIcon}" alt="{pokeName}">\
                    </div>\
                <div class="poke-img {pokeType}">\
                    <img width="200" height="200" src={pokeSprite} class="primaria" alt="{pokeName}">\
                </div>\
                <div class="body-card">\
                    <div class="poke-id">\
                        <h3># {pokeIdN}</h3>\
                    </div>\
                    <div class="poke-name"><h2>{pokeName}</h2></div>\
                </div>\
            </div>\
        ';

        if (base.types[1]) {
            templateInit = templateInit.replace(/{pokeType2}/g, base.types[1].type.name);
        } else {
            templateInit = templateInit.replace(/{pokeType2}/g, 'none');
        }
        templateInit = templateInit.replace(/{pokeIcon}/g, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/' + base.id + '.png');

        templateInit = templateInit.replace(/{pokeId}/g, base.id);
        if (base.id < 10) {
            var concat = "00";
            var recId = base.id;
            var result = concat.concat(recId);
            templateInit = templateInit.replace(/{pokeIdN}/g, result);
        } else if (base.id >= 10 && base.id < 100) {
            var concat = "0";
            var recId = base.id;
            var result = concat.concat(recId);
            templateInit = templateInit.replace(/{pokeIdN}/g, result);
        } else {
            templateInit = templateInit.replace(/{pokeIdN}/g, base.id);
        }

        templateInit = templateInit.replace(/{pokeType}/g, base.types[0].type.name);
        templateInit = templateInit.replace(/{pokeName}/g, base.name);

        var id = base.id;
        if (id < 10) {
            id = '00' + id
        } else if (id < 100) {
            id = '0' + id
        }

        templateInit = templateInit.replace(/{pokeSprite}/g, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + id + '.png');

        var divCards = document.createElement('div');
        divCards.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 ');
        divCards.setAttribute('style', 'order:' + base.order);

        divCards.innerHTML = templateInit;
        document.getElementById('all_poke').appendChild(divCards);

    },
}
// fim


// função que capta informações do pokemon 
var pokeBase = {
    getPokeUrl: (url) => {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: valores,
            success: function (pokeInformation) {
                pokeBase.createWindow(pokeInformation)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown, result) {
                console.log('Falha em: getPokeUrl [', XMLHttpRequest, textStatus, errorThrown, result, ']');

            }
        });
    },

    getSpecies: (url, prioridade, pokeInformation) => {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: valores,
            success: function (pokeSpecies) {
                if (prioridade == 'primal') {
                    primeiraInfo(pokeSpecies);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown, result) {
                console.log('Falha em: getSpecies [', XMLHttpRequest, textStatus, errorThrown, result, ']');
            }
        });


        function primeiraInfo(pokeSpecies) {
            console.log(pokeSpecies)
            //pega descrição na linguagem ingles
            pokeSpecies.flavor_text_entries.forEach((desc) => {
                if (desc.language.name == 'en' && desc.version.name == 'x') {
                    $('#recebeDescricao').text(desc.flavor_text)
                }
            });

            pokeSpecies.genera.forEach((descsmall) => {
                if (descsmall.language.name == 'en') {
                    $('#smallDescription').text(descsmall.genus)
                }
            });

            //pega as evoluções
            $.ajax({
                url: pokeSpecies.evolution_chain.url,
                type: 'GET',
                dataType: 'json',
                data: valores,
                success: function (evolve) {

                    let evoChain = [];
                    let evoData = evolve.chain;

                    do {
                        let numberOfEvolutions = evoData.evolves_to.length;

                        evoChain.push({
                            "species_name": evoData.species.name,
                            "evolution_details": evoData.evolution_details,

                        });

                        if (numberOfEvolutions > 1) {
                            for (let i = 1; i < numberOfEvolutions; i++) {
                                evoChain.push({
                                    "species_name": evoData.evolves_to[i].species.name,
                                    "evolution_details": !evoData.evolves_to[i] ? null : evoData.evolves_to[i].evolution_details,
                                    "trigger": !evoData.evolves_to[i] ? null : evoData.evolves_to[i].evolution_details.trigger
                                });
                            }
                        } else if (numberOfEvolutions == 1) {

                        }

                        evoData = evoData.evolves_to[0];

                    } while (evoData != undefined && evoData.hasOwnProperty('evolves_to'));

                    sendEvolution(evoChain);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown, result) {
                    console.log('Falha em: getSpecies [', XMLHttpRequest, textStatus, errorThrown, result, ']');
                }
            });



            //cria html evoluções
            function sendEvolution(evoChain) {
                evoChain.forEach((pokemon) => {
                    $.ajax({
                        url: 'https://pokeapi.co/api/v2/pokemon/' + pokemon.species_name,
                        type: 'GET',
                        dataType: 'json',
                        data: valores,
                        success: function (dataPoke) {
                            pokeBase.createEvolution(dataPoke);

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown, result) {
                            console.log('Falha em: catchPoke [', XMLHttpRequest, textStatus, errorThrown, result, ']');
                        }
                    });
                })
            }
        };
    },

    createEvolution: (dataPoke) => {


        var templateEvolution =
            "<div class='poke-evolv-img {type}' data-card='{pokeId}' onclick='getBaseInfo.attBtnCard(this)'>"
            + "<img src='{pokeImg}' alt='{pokeName}'>"
            + "</div>"
            + "<div class='types'>"
            + "<div class='type {pokeType}'>"
            + "{pokeType}"
            + "</div>"
            + "<div class='type {pokeType2}'>"
            + "{pokeType2}"
            + "</div>"
            + "</div>"
            + "<div class='poke-name'>"
            + "<span>"
            + "# {pokeIdN}"
            + "</span>"
            + "</div>"
            + "<div class='poke-name'>"
            + "<span>"
            + "{pokeName}"
            + "</span>"
            + "</div>"
            ;


        templateEvolution = templateEvolution.replace(/{pokeId}/g, dataPoke.id);
        templateEvolution = templateEvolution.replace(/{pokeType}/g, dataPoke.types[0].type.name);
        console.log(dataPoke)
        if (dataPoke.types[1]) {
            templateEvolution = templateEvolution.replace(/{pokeType2}/g, dataPoke.types[1].type.name);
        } else {
            templateEvolution = templateEvolution.replace(/{pokeType2}/g, 'none');
        }


        var id = dataPoke.id;
        if (id < 10) {
            id = '00' + id
        } else if (id < 100) {
            id = '0' + id
        }

        templateEvolution = templateEvolution.replace(/{pokeImg}/g, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + id + '.png');
        templateEvolution = templateEvolution.replace(/{pokeName}/g, dataPoke.name);
        templateEvolution = templateEvolution.replace(/{pokeIdN}/g, id);
        templateEvolution = templateEvolution.replace(/{type}/g, dataPoke.types[0].type.name);


        var divEvolv = document.createElement('div');
        divEvolv.setAttribute('class', 'item');
        divEvolv.setAttribute('style', 'order:' + dataPoke.order);

        divEvolv.innerHTML = templateEvolution;
        document.getElementById('recebeEvolution').appendChild(divEvolv);
    },

    createWindow: (pokeInformation) => {
        $('#windowPoke').addClass('ativo');
        $('#main').addClass('no-scroll');
        $('.body-pokemon').css('display', 'none');
        $('#infoPoke').addClass('ativo');
        $('#infoPoke').addClass(pokeInformation.types[0].type.name);
        $('.load').addClass('ativo');

        var templatePokemon =
            "<div class='body-pokemon' style='display: none;'>"
            + "<div class='container'>"
            + "<div class='content-pokemon {pokeType}'>"
            + "<div class='body-content {pokeType}'>"
            + "<div class='col-md-12'>"
            + "<div class='poke-id'>"
            + "<div class='name'>{pokeName}</div>"
            + "<div class='id'> N°{pokeId}</div>"
            + "<div id='smallDescription'></div>"
            + "</div>"
            + "</div>"
            + "<div class='col-md-7 col-xs-12 col-lg-6'>"
            + "<div class='content-sprites'>"
            + "<div class='pokemon-img'>"
            + "<div class='item'>"
            + "<img src={pokeSprite} class='primaria' id='recebeSrcPoke' alt='{pokeName}'>"
            + "</div>"
            + "</div>"
            + "<div class='pokesprites {pokeType}'>"
            + "<div class='item ativo' data-srcpoke='{pokeSprite}'>"
            + "<img src='{pokeSprite}' class='primaria' alt='{pokeName}'>"
            + "</div>"
            + "<div class='item' data-srcpoke='{pokeSpriteFront}'>"
            + "<img src='{pokeSpriteFront}' class='primaria' alt='{pokeName}'>"
            + "</div>"
            + "<div class='item' data-srcpoke='{pokeSpriteBack}'>"
            + "<img src='{pokeSpriteBack}' class='primaria' alt='{pokeName}'>"
            + "</div>"
            + "<div class='item' data-srcpoke='{pokeSpriteShyneFront}'>"
            + "<img src='{pokeSpriteShyneFront}' class='primaria' alt='{pokeName}'>"
            + "</div>"
            + "<div class='item' data-srcpoke='{pokeSpriteShyneBack}'>"
            + "<img src='{pokeSpriteShyneBack}' class='primaria' alt='{pokeName}'>"
            + "</div>"
            + (
                pokeInformation.sprites.front_female ?
                    "<div class='item' data-srcpoke='{pokeSpriteFemale}'><img src='{pokeSpriteFemale}' class='primaria' alt='{pokeName}'></div>" :
                    ""
            )
            + (
                pokeInformation.sprites.back_female ?
                    "<div class='item' data-srcpoke='{pokeSpriteFemaleBack}'><img src='{pokeSpriteFemaleBack}' class='primaria' alt='{pokeName}'></div>" :
                    ""
            )
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='col-md-5 col-xs-12 col-lg-6'>"
            + "<div class='pokemon-description' id='recebeDescricao'>"
            + "</div>"

            + "<div class='height-weight'>"
            + "<div class='item'>"
            + "<div class='content-item'>"
            + "{pokeHeight} m"
            + "</div>"
            + "<small>Height</small>"
            + "</div>"
            + "<div class='item'>"
            + "<div class='content-item'>"
            + "{pokeWeight} kg"
            + "</div>"
            + "<small>Weight</small>"
            + "</div>"
            + "</div>"

            + "<div class='types'>"
            + "<div class='title'>"
            + "Types:"
            + "</div>"
            + "<div class='type {pokeType}'>"
            + "{pokeType}"
            + "</div>"
            + "<div class='type {pokeType2}'>"
            + "{pokeType2}"
            + "</div>"
            + "</div>"
            + "<div class='poke-chart {pokeType}'>"
            + "<div class='title-chart'>Stats:</div>"
            + "<div class='content' id='recebeGrafico'>"

            + "<div class='pontos'>"
            + "<div class='item-pontos'>"
            + "<div class='title-pontos'>PS</div>"
            + "<div class='content-pontos' style='width:calc({pokePSw}% - 100px);'>"
            + "{pokePS}"
            + "</div>"
            + "</div>"

            + "<div class='item-pontos'>"
            + "<div class='title-pontos'>Atack</div>"
            + "<div class='content-pontos' style='width:calc({pokeAtackw}% - 100px);'>"
            + "{pokeAtack}"
            + "</div>"
            + "</div>"
            + "<div class='item-pontos'>"
            + "<div class='title-pontos'>Defense</div>"
            + "<div class='content-pontos' style='width:calc({pokeDefensew}% - 100px);'>"
            + "{pokeDefense}"

            + "</div>"
            + "</div>"
            + "<div class='item-pontos'>"
            + "<div class='title-pontos'>Special Atack</div>"
            + "<div class='content-pontos' style='width:calc({pokeSPw}% - 100px);'>"
            + "{pokeSP}"

            + "</div>"
            + "</div>"
            + "<div class='item-pontos'>"
            + "<div class='title-pontos'>Special Defense</div>"
            + "<div class='content-pontos' style='width:calc({pokeSDw}% - 100px);'>"
            + "{pokeSD}"

            + "</div>"
            + "</div>"
            + "<div class='item-pontos'>"
            + "<div class='title-pontos'>Speed</div>"
            + "<div class='content-pontos' style='width:calc({pokeSpeedw}% - 100px);'>"
            + "{pokeSpeed}"

            + "</div>"
            + "</div>"
            + "</div>"


            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='col-md-12 col-sm-12' style='filter: drop-shadow(1px 1px 2px #000);'>"
            + "<div class='content-evolution'>"
            + "<div class='title'>"
            + "<h3>Evolutions</h3>"
            + "</div>"
            + "<div id='recebeEvolution'></div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            ;

        var id = pokeInformation.id;
        if (id < 10) {
            id = '00' + id
        } else if (id < 100) {
            id = '0' + id
        }

        if (pokeInformation.types[1]) {
            templatePokemon = templatePokemon.replace(/{pokeType2}/g, pokeInformation.types[1].type.name);
        } else {
            templatePokemon = templatePokemon.replace(/{pokeType2}/g, 'none');
        }


        templatePokemon = templatePokemon.replace(/{pokeSprite}/g, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + id + '.png');
        templatePokemon = templatePokemon.replace(/{pokeSpriteFront}/g, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokeInformation.id + '.png');
        templatePokemon = templatePokemon.replace(/{pokeSpriteBack}/g, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + pokeInformation.id + '.png');
        templatePokemon = templatePokemon.replace(/{pokeSpriteShyneFront}/g, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/' + pokeInformation.id + '.png');
        templatePokemon = templatePokemon.replace(/{pokeSpriteShyneBack}/g, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/' + pokeInformation.id + '.png');
        templatePokemon = templatePokemon.replace(/{pokeSpriteFemale}/g, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/' + pokeInformation.id + '.png');
        templatePokemon = templatePokemon.replace(/{pokeSpriteFemaleBack}/g, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/' + pokeInformation.id + '.png');
        templatePokemon = templatePokemon.replace(/{pokeId}/g, id);
        templatePokemon = templatePokemon.replace(/{pokeType}/g, pokeInformation.types[0].type.name);
        templatePokemon = templatePokemon.replace(/{pokeSpriteBack}/g, pokeInformation.sprites.back_default);
        templatePokemon = templatePokemon.replace(/{pokeName}/g, pokeInformation.name);

        templatePokemon = templatePokemon.replace(/{pokeHeight}/g, (pokeInformation.height / 10));
        templatePokemon = templatePokemon.replace(/{pokeWeight}/g, (pokeInformation.weight / 10));

        var pokeStats = pokeInformation.stats;
        var valueStat = [];
        var textStat = [];
        pokeStats.forEach((stats) => {
            valueStat.push(stats.base_stat);
            if (stats.stat.name == 'special-defense') {
                stats.stat.name = 'SD';
                textStat.push(stats.stat.name);

            } else if (stats.stat.name == 'special-attack') {
                stats.stat.name = 'SA';
                textStat.push(stats.stat.name);
            } else {
                textStat.push(stats.stat.name);
            }
        });

        var maior = 0;
        for (var i = 0; i < valueStat.length; i++) {
            if (valueStat[i] > maior) {
                maior = valueStat[i];
            }
        }

        templatePokemon = templatePokemon.replace(/{pokePS}/g, valueStat[0]);
        templatePokemon = templatePokemon.replace(/{pokePSw}/g, ((valueStat[0] * 100) / maior).toFixed(2));

        templatePokemon = templatePokemon.replace(/{pokeAtack}/g, valueStat[1]);
        templatePokemon = templatePokemon.replace(/{pokeAtackw}/g, ((valueStat[1] * 100) / maior).toFixed(2));

        templatePokemon = templatePokemon.replace(/{pokeDefense}/g, valueStat[2]);
        templatePokemon = templatePokemon.replace(/{pokeDefensew}/g, ((valueStat[2] * 100) / maior).toFixed(2));

        templatePokemon = templatePokemon.replace(/{pokeSP}/g, valueStat[3]);
        templatePokemon = templatePokemon.replace(/{pokeSPw}/g, ((valueStat[3] * 100) / maior).toFixed(2));
 
        templatePokemon = templatePokemon.replace(/{pokeSD}/g, valueStat[4]);
        templatePokemon = templatePokemon.replace(/{pokeSDw}/g, ((valueStat[4] * 100) / maior).toFixed(2));
  
        templatePokemon = templatePokemon.replace(/{pokeSpeed}/g, valueStat[5]);
        templatePokemon = templatePokemon.replace(/{pokeSpeedw}/g, ((valueStat[5] * 100) / maior).toFixed(2));


        setTimeout(function () {
            jQuery('#infoPoke').html(templatePokemon);

            console.log(pokeStats);
            console.log(valueStat);

            // var mainPokeColor = [
            //     { "id": "grass", color: "rgba(155, 204, 80)" },
            //     { "id": "fire", color: "rgba(253, 125, 36)" },
            //     { "id": "water", color: "rgba(69, 146, 196)" },
            //     { "id": "bug", color: "rgba(114, 159, 63)" },
            //     { "id": "normal", color: "rgba(164, 172, 175)" },
            //     { "id": "steel", color: "rgba(158, 183, 184)" },
            //     { "id": "poison", color: "rgba(185, 127, 201)" },
            //     { "id": "ground", color: "rgba(247, 222, 63)" },
            //     { "id": "fighting", color: "rgba(213, 103, 35)" },
            //     { "id": "rock", color: "rgba(163, 140, 33)" },
            //     { "id": "electric", color: "rgba(255, 250, 7)" },
            //     { "id": "ghost", color: "rgba(123, 98, 163)" },
            //     { "id": "psychic", color: "rgba(243, 102, 185)" },
            //     { "id": "ice", color: "rgba(81, 196, 231)" },
            //     { "id": "dragon", color: "rgba(83, 164, 207)" },
            //     { "id": "fairy", color: "rgba(253, 185, 233)" },
            //     { "id": "dark", color: "rgba(42, 42, 42)" },
            //     { "id": "flying", color: "rgba(61, 199, 239)" }
            // ]

            // function getByKey() {
            //     for (var i = 0; i < mainPokeColor.length; i++) {
            //         if (mainPokeColor[i].id == pokeInformation.types[0].type.name) {
            //             return mainPokeColor[i].color
            //         }
            //     }
            // }

            // var ctx = document.getElementById('myChart').getContext('2d');
            // var pokeChart = new Chart(ctx, {
            //     type: 'bar',
            //     data: {
            //         labels: textStat,
            //         datasets: [{
            //             axis: 'y',
            //             label: 'STATUS',
            //             lineTension: 0.1,
            //             backgroundColor: getByKey(),
            //             borderColor: getByKey(),
            //             pointBackgroundColor: getByKey(),
            //             pointBorderColor: "#fff",
            //             pointHoverRadius: 5,
            //             pointHoverBackgroundColor: "#fff",
            //             pointHoverBorderColor: getByKey(),
            //             data: valueStat
            //         }]
            //     },
            //     options: {
            //         indexAxis: 'y',
            //         legend: {
            //             display: false,
            //             labels: {
            //                 // This more specific font property overrides the global property
            //                 display: false,
            //                 fontColor: 'black',
            //                 fontSize: 20,
            //                 fontFamily: "koho-bold",
            //             }
            //         }
            //     }
            // });

            //Slick
            setTimeout(function () {
                $('.pokesprites').slick({
                    dots: false,
                    arrows: true,
                    prevArrow: '<button class="slick-prev slick-button"><svg xmlns="http://www.w3.org/2000/svg" style="enable-background:new 0 0 512 512;transform: scaleX(-1);" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="25" height="25" x="0" y="0" viewbox="0 0 492.004 492.004" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"  data-original="#000000" style="" class=""></path></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg></button>',
                    nextArrow: '<button class="slick-next slick-button"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="25" height="25" x="0" y="0" viewbox="0 0 492.004 492.004" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"  data-original="#000000" style="" class=""></path></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg></button>',
                    infinite: true,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    useTransform: true,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    focusOnSelect: false,
                    responsive: [
                        {
                            breakpoint: 990,
                            settings: {
                                slidesToShow: 3
                            }
                        }
                    ]

                });

                var itemSrcPoke = document.querySelectorAll('[data-srcpoke]');
                itemSrcPoke.forEach((recebe) => {
                    recebe.addEventListener('click', () => {
                        itemSrcPoke.forEach((recebe) => {
                            recebe.classList.remove('ativo');
                        });
                        $('#recebeSrcPoke').attr('src', recebe.dataset.srcpoke);
                        recebe.classList.add('ativo');
                    });
                });
            }, 1000);


            var url = pokeInformation.species.url;
            var prioridade = 'primal';
            pokeBase.getSpecies(url, prioridade, pokeInformation);

            $('.load').removeClass('ativo');
            $('.body-pokemon').css('display', 'block');




        }, 500);


    }
}
// fim


//carrega os pokemons na rolagem da tela e esconde menu flutuante
var offset = 0;
var lastScrollTop = 0;

$('#main').on('scroll', function (startS) {
    let div = $(this).get(0);
    if (div.scrollTop + div.clientHeight >= (div.scrollHeight - 1)) {

        $('.load').addClass('ativo');
        $('#main').addClass('no-scroll');

        $.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=' + offset)
            .done(function (resultadoPrimario) {
                getBaseInfo.tratamentoPrimal(resultadoPrimario);
                offset += 20;
            })
        startS.preventDefault();
        setTimeout(function () {
            $('.load').removeClass('ativo');
            $('#main').removeClass('no-scroll');

        }, 1000);
    }

    var st = $(this).scrollTop();

    if (st > 255) {
        if (st > lastScrollTop) {
            $('.nenza-header').addClass('move-down-nenza');
            $('.nenza-header').removeClass('move-up-nenza');

        } else {
            $('.nenza-header').removeClass('move-down-nenza');
            $('.nenza-header').addClass('move-up-nenza');
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    } else {
        $('.nenza-header').removeClass('move-down-nenza');
        $('.nenza-header').removeClass('move-up-nenza');
    }
    lastScrollTop = st;
});

// fecha a janela de destaque do pokemon
$('.close-window').click(function () {
    $('#windowPoke').removeClass('ativo');
    $("#infoPoke").attr('class', '');
    $('#main').removeClass('no-scroll');
});



//Evento de click que aciona a busca do pokemon pelo input no header fixo
$('#startSearch').click(function () {
    $('.load').addClass('ativo');
    var inputValueSearch = $('#searchKey').val().toLowerCase();
    if (inputValueSearch != '') {
        inputValueSearch = inputValueSearch.split(' ').join('');
        getBaseInfo.getSearchPoke(inputValueSearch);
    } else {
        $('.load').removeClass('ativo');
        $('#failedToLoad').text('Sorry, no pokemon found in our database :(');
        $('#failedToLoad').addClass('ativo');

        setTimeout(function () {
            $('#failedToLoad').text('');
            $('#failedToLoad').removeClass('ativo');
        }, 3000);
    }

});



$('#searchKey').keypress(function (e) {
    if (e.key === "Enter") {
        $('.load').addClass('ativo');
        var inputValueSearch = $('#searchKey').val().toLowerCase();
        if (inputValueSearch != '') {
            inputValueSearch = inputValueSearch.split(' ').join('');
            getBaseInfo.getSearchPoke(inputValueSearch);
        } else {
            $('.load').removeClass('ativo');
            $('#failedToLoad').text('Sorry, no pokemon found in our database :(');
            $('#failedToLoad').addClass('ativo');

            setTimeout(function () {
                $('#failedToLoad').text('');
                $('#failedToLoad').removeClass('ativo');
            }, 3000);
        }
    }
});

