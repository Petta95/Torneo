/* =========================================================
   Torneo — catalogo delle categorie di gioco
   Ogni categoria elenca TUTTE le immagini disponibili nella
   sua cartella: se sono più di 16, sfida.html ne sceglierà
   16 a caso ad ogni partita.
   ========================================================= */

(function (global) {
  'use strict';

  const CATEGORIES = {
    cibo_italiano: {
      title: 'Cibo Italiano',
      emoji: '🍕',
      description: 'Decidi il miglior piatto della cucina italiana: scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/cibo_italiano',
      items: [
        { file: 'pizza_margherita.jpg', name: 'Pizza Margherita' },
        { file: 'carbonara.jpg', name: 'Carbonara' },
        { file: 'amatriciana.jpg', name: 'Amatriciana' },
        { file: 'arancino.jpg', name: 'Arancino' },
        { file: 'cannolo.jpg', name: 'Cannolo' },
        { file: 'fiorentina.jpg', name: 'Bistecca alla Fiorentina' },
        { file: 'focaccia.jpg', name: 'Focaccia' },
        { file: 'fritto_misto.jpg', name: 'Fritto Misto' },
        { file: 'gelato.jpg', name: 'Gelato' },
        { file: 'gnocco_tigelle.jpg', name: 'Gnocco e Tigelle' },
        { file: 'lasagna.jpg', name: 'Lasagna' },
        { file: 'parmigiana.jpg', name: 'Parmigiana di Melanzane' },
        { file: 'risotto_alla_milanese.jpg', name: 'Risotto alla Milanese' },
        { file: 'tiramisu.jpg', name: 'Tiramisù' },
        { file: 'tortellini.jpg', name: 'Tortellini' },
        { file: 'vitello_tonnato.jpg', name: 'Vitello Tonnato' }
      ]
    },

    celebrita_donne: {
      title: 'Celebrità Donne',
      emoji: '💃',
      description: 'Qual è la celebrità femminile più affascinante? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/celebrita_donne',
      items: [
        { file: 'adriana_lima.jpg', name: 'Adriana Lima' },
        { file: 'ana_de_armas.jpg', name: 'Ana de Armas' },
        { file: 'angelina_jolie.jpg', name: 'Angelina Jolie' },
        { file: 'anne_hathaway.jpg', name: 'Anne Hathaway' },
        { file: 'barbara_palvin.jpg', name: 'Barbara Palvin' },
        { file: 'charlize_theron.jpg', name: 'Charlize Theron' },
        { file: 'emilia_clarke.jpg', name: 'Emilia Clarke' },
        { file: 'emily_ratajkowski.jpg', name: 'Emily Ratajkowski' },
        { file: 'emma_watson.jpg', name: 'Emma Watson' },
        { file: 'gal_gadot.jpg', name: 'Gal Gadot' },
        { file: 'gigi_hadid.jpg', name: 'Gigi Hadid' },
        { file: 'jessica_alba.jpg', name: 'Jessica Alba' },
        { file: 'kendall_jenner.jpg', name: 'Kendall Jenner' },
        { file: 'keyra_knightley.jpg', name: 'Keira Knightley' },
        { file: 'margot_robbie.jpg', name: 'Margot Robbie' },
        { file: 'megan.jpg', name: 'Megan Fox' },
        { file: 'monica_bellucci.jpg', name: 'Monica Bellucci' },
        { file: 'natalie_portman.jpg', name: 'Natalie Portman' },
        { file: 'penelope_cruz.jpg', name: 'Penélope Cruz' },
        { file: 'rihanna.jpg', name: 'Rihanna' },
        { file: 'scarlett_johannson.jpg', name: 'Scarlett Johansson' },
        { file: 'sidney_sweeney.jpg', name: 'Sydney Sweeney' },
        { file: 'taylor_hill.jpg', name: 'Taylor Hill' },
        { file: 'zendaya.jpg', name: 'Zendaya' }
      ]
    },

    celebrita_uomini: {
      title: 'Celebrità Uomini',
      emoji: '🕺',
      description: 'Qual è la celebrità maschile più affascinante? Scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/celebrita_uomini',
      items: [
        { file: 'brad_pitt.jpg', name: 'Brad Pitt' },
        { file: 'bradley_cooper.jpg', name: 'Bradley Cooper' },
        { file: 'chris_hemsworth.jpg', name: 'Chris Hemsworth' },
        { file: 'david_beckham.jpg', name: 'David Beckham' },
        { file: 'george_clooney.jpg', name: 'George Clooney' },
        { file: 'henry_cavill.jpg', name: 'Henry Cavill' },
        { file: 'ian_somerhalder.jpg', name: 'Ian Somerhalder' },
        { file: 'jacob_elordi.jpg', name: 'Jacob Elordi' },
        { file: 'johnny_depp.jpg', name: 'Johnny Depp' },
        { file: 'jude_law.jpg', name: 'Jude Law' },
        { file: 'leonardo_di_caprio.jpg', name: 'Leonardo DiCaprio' },
        { file: 'michael_b_jordan.jpg', name: 'Michael B. Jordan' },
        { file: 'robert_pattinson.jpg', name: 'Robert Pattinson' },
        { file: 'ryan_gosling.jpg', name: 'Ryan Gosling' },
        { file: 'the_rock.jpg', name: 'The Rock' },
        { file: 'zac_efron.jpg', name: 'Zac Efron' }
      ]
    },

    film_di_animazione: {
      title: 'Film di Animazione',
      emoji: '🎬',
      description: 'Qual è il miglior film d\'animazione? Scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/film_di_animazione',
      items: [
        { file: 'aladdin.jpg', name: 'Aladdin' },
        { file: 'alla_ricerca_di_nemo.jpg', name: 'Alla Ricerca di Nemo' },
        { file: 'cars.jpg', name: 'Cars' },
        { file: 'gli_incredibili.jpg', name: 'Gli Incredibili' },
        { file: 'hercules.jpg', name: 'Hercules' },
        { file: 'kung_fu_panda.jpg', name: 'Kung Fu Panda' },
        { file: 'lilo_e_stitch.jpg', name: 'Lilo & Stitch' },
        { file: 'madagascar.jpg', name: 'Madagascar' },
        { file: 'monster_e_co.jpg', name: 'Monsters & Co.' },
        { file: 'mulan.jpg', name: 'Mulan' },
        { file: 'ratatouille.jpg', name: 'Ratatouille' },
        { file: 're_leone.jpg', name: 'Il Re Leone' },
        { file: 'shrek.jpg', name: 'Shrek' },
        { file: 'tarzan.jpg', name: 'Tarzan' },
        { file: 'toy_story.jpg', name: 'Toy Story' },
        { file: 'wall_e.jpg', name: 'WALL-E' }
      ]
    },

    serie_tv: {
      title: 'Serie TV',
      emoji: '📺',
      description: 'Qual è la miglior serie TV? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/serie_tv',
      items: [
        { file: 'better_call_saul.jpg', name: 'Better Call Saul' },
        { file: 'breaking_bad.jpg', name: 'Breaking Bad' },
        { file: 'dark.jpg', name: 'Dark' },
        { file: 'euphoria.jpg', name: 'Euphoria' },
        { file: 'friends.jpg', name: 'Friends' },
        { file: 'game_of_thrones.jpg', name: 'Game of Thrones' },
        { file: 'greys_anatomy.jpg', name: "Grey's Anatomy" },
        { file: 'how_i_met_your_mother.jpg', name: 'How I Met Your Mother' },
        { file: 'lost.jpg', name: 'Lost' },
        { file: 'peaky_blinders.jpg', name: 'Peaky Blinders' },
        { file: 'scrubs.jpg', name: 'Scrubs' },
        { file: 'shameless.jpg', name: 'Shameless' },
        { file: 'stranger_things.jpg', name: 'Stranger Things' },
        { file: 'the_boys.jpg', name: 'The Boys' },
        { file: 'the_office.jpg', name: 'The Office' },
        { file: 'the_walking_dead.jpg', name: 'The Walking Dead' }
      ]
    },

    anime: {
      title: 'Anime',
      emoji: '🎌',
      description: 'Qual è il miglior anime di sempre? Scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/anime',
      items: [
        { file: 'a_silent_voice.jpg', name: 'A Silent Voice' },
        { file: 'ajin.jpg', name: 'Ajin' },
        { file: 'attack_on_titan.jpg', name: "L'Attacco dei Giganti" },
        { file: 'beastars.jpg', name: 'Beastars' },
        { file: 'berserk.jpg', name: 'Berserk' },
        { file: 'bleach.jpg', name: 'Bleach' },
        { file: 'blue_lock.jpg', name: 'Blue Lock' },
        { file: 'chainsawman.jpg', name: 'Chainsaw Man' },
        { file: 'code_geass.jpg', name: 'Code Geass' },
        { file: 'conan.jpg', name: 'Detective Conan' },
        { file: 'death_note.jpg', name: 'Death Note' },
        { file: 'demon_slayer.jpg', name: 'Demon Slayer' },
        { file: 'digimon.jpg', name: 'Digimon' },
        { file: 'dorohedoro.jpg', name: 'Dorohedoro' },
        { file: 'dragonball.jpg', name: 'Dragon Ball' },
        { file: 'erased.jpg', name: 'Erased' },
        { file: 'full_metal_alchemist.jpg', name: 'Fullmetal Alchemist' },
        { file: 'gantz.jpg', name: 'Gantz' },
        { file: 'gto.jpg', name: 'GTO' },
        { file: 'haikyuu.jpg', name: 'Haikyuu!!' },
        { file: 'hunter_hunter.jpg', name: 'Hunter x Hunter' },
        { file: 'jujutsu_kaisen.jpg', name: 'Jujutsu Kaisen' },
        { file: 'kiseju.jpg', name: 'Parasyte' },
        { file: 'made_in_abyss.jpg', name: 'Made in Abyss' },
        { file: 'my_hero_academia.jpg', name: 'My Hero Academia' },
        { file: 'nana.jpg', name: 'Nana' },
        { file: 'naruto.jpg', name: 'Naruto' },
        { file: 'one_piece.jpg', name: 'One Piece' },
        { file: 'one_punch_man.jpg', name: 'One Punch Man' },
        { file: 'pokemon.jpg', name: 'Pokémon' },
        { file: 'slam_dunk.jpg', name: 'Slam Dunk' },
        { file: 'solo_leveling.jpg', name: 'Solo Leveling' },
        { file: 'tokyo_ghoul.jpg', name: 'Tokyo Ghoul' },
        { file: 'vinland_saga.jpg', name: 'Vinland Saga' },
        { file: 'your_name.jpg', name: 'Your Name' },
        { file: 'yu_yu_hakusho.jpg', name: 'YuYu Hakusho' }
      ]
    },

    frutta: {
      title: 'Frutta',
      emoji: '🍓',
      description: 'Qual è il frutto migliore in assoluto? Scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/frutta',
      items: [
        { file: 'albicocca.jpg', name: 'Albicocca' },
        { file: 'ananas.jpg', name: 'Ananas' },
        { file: 'anguria.jpg', name: 'Anguria' },
        { file: 'arancia.jpg', name: 'Arancia' },
        { file: 'avocado.jpg', name: 'Avocado' },
        { file: 'banana.jpg', name: 'Banana' },
        { file: 'ciliegia.jpg', name: 'Ciliegia' },
        { file: 'cocco.jpg', name: 'Cocco' },
        { file: 'fico.jpg', name: 'Fico' },
        { file: 'fragola.jpg', name: 'Fragola' },
        { file: 'kiwi.jpg', name: 'Kiwi' },
        { file: 'lampone.jpg', name: 'Lampone' },
        { file: 'limone.jpg', name: 'Limone' },
        { file: 'mango.jpg', name: 'Mango' },
        { file: 'mela.jpg', name: 'Mela' },
        { file: 'melograno.jpg', name: 'Melograno' },
        { file: 'melone.jpg', name: 'Melone' },
        { file: 'mirtillo.jpg', name: 'Mirtillo' },
        { file: 'mora.jpg', name: 'Mora' },
        { file: 'passion_fruit.jpg', name: 'Frutto della Passione' },
        { file: 'pera.jpg', name: 'Pera' },
        { file: 'pesca.jpg', name: 'Pesca' },
        { file: 'pompelmo.jpg', name: 'Pompelmo' },
        { file: 'prugna.jpg', name: 'Prugna' },
        { file: 'uva.jpg', name: 'Uva' }
      ]
    },

    pasta: {
      title: 'Pasta',
      emoji: '🍝',
      description: 'Qual è il miglior primo piatto di pasta italiano? Scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/pasta',
      items: [
        { file: 'aglio_olio_peperoncino.jpg', name: 'Aglio, Olio e Peperoncino' },
        { file: 'amatriciana.jpg', name: 'Amatriciana' },
        { file: 'cacio_pepe.jpg', name: 'Cacio e Pepe' },
        { file: 'carbonara.jpg', name: 'Carbonara' },
        { file: 'funghi.jpg', name: 'Pasta ai Funghi' },
        { file: 'gricia.jpg', name: 'Gricia' },
        { file: 'norma.jpg', name: 'Pasta alla Norma' },
        { file: 'pesto.jpg', name: 'Pesto' },
        { file: 'puttanesca.jpg', name: 'Puttanesca' },
        { file: 'ragu.jpg', name: 'Ragù' },        
        { file: 'ragu_di_cervo.jpg', name: 'Ragù di Cervo' },
        { file: 'salmone.jpg', name: 'Pasta al Salmone' },
        { file: 'scoglio.jpg', name: 'Pasta allo Scoglio' },
        { file: 'sorrentina.jpg', name: 'Pasta alla Sorrentina' },
        { file: 'tonno.jpg', name: 'Pasta al Tonno' },
        { file: 'vongole.jpg', name: 'Vongole' }
      ]
    },

    profumi: {
      title: 'Profumi',
      emoji: '👃',
      description: 'Qual è il profumo più bello del mondo? Scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/profumi',
      items: [
        { file: 'aglio.jpg', name: 'Aglio' },
        { file: 'benzina.jpg', name: 'Benzina' },
        { file: 'biscotti_sfornati.jpg', name: 'Biscotti Appena Sfornati' },
        { file: 'caffe.jpg', name: 'Caffè' },
        { file: 'cannella.jpg', name: 'Cannella' },
        { file: 'cioccolato.jpg', name: 'Cioccolato' },
        { file: 'erba_tagliata.jpg', name: 'Erba Tagliata' },
        { file: 'gorgonzola.jpg', name: 'Gorgonzola' },
        { file: 'lavanda.jpg', name: 'Lavanda' },
        { file: 'lenzuola_pulite.jpg', name: 'Lenzuola Pulite' },
        { file: 'mare.jpg', name: 'Mare' },
        { file: 'menta.jpg', name: 'Menta' },
        { file: 'pane_caldo.jpg', name: 'Pane Caldo' },
        { file: 'pioggia.jpg', name: 'Pioggia' },
        { file: 'popcorn.jpg', name: 'Popcorn' },
        { file: 'scatola_scarpe_nuova.jpg', name: 'Scatola di Scarpe Nuova' },
        { file: 'tartufo.jpg', name: 'Tartufo' },
        { file: 'vaniglia.jpg', name: 'Vaniglia' },
        { file: 'vernice_fresca.jpg', name: 'Vernice Fresca' },
        { file: 'zucchero_filato.jpg', name: 'Zucchero Filato' }
      ]
    },

    verdura: {
      title: 'Verdura',
      emoji: '🥦',
      description: 'Qual è la verdura migliore in assoluto? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/verdura',
      items: [
        { file: 'aglio.jpg', name: 'Aglio' },
        { file: 'asparagi.jpg', name: 'Asparagi' },
        { file: 'barbabietola.jpg', name: 'Barbabietola' },
        { file: 'broccoli.jpg', name: 'Broccoli' },
        { file: 'carote.jpg', name: 'Carote' },
        { file: 'cetriolo.jpg', name: 'Cetriolo' },
        { file: 'cipolle.jpg', name: 'Cipolle' },
        { file: 'fagiolini.jpg', name: 'Fagiolini' },
        { file: 'finocchi.jpg', name: 'Finocchi' },
        { file: 'fiori di zucca.jpg', name: 'Fiori di Zucca' },
        { file: 'funghi.jpg', name: 'Funghi' },
        { file: 'melanzane.jpg', name: 'Melanzane' },
        { file: 'patate.jpg', name: 'Patate' },
        { file: 'peperoncini.jpg', name: 'Peperoncini' },
        { file: 'peperoni.jpg', name: 'Peperoni' },
        { file: 'pomodori.jpg', name: 'Pomodori' },
        { file: 'zucchine.jpg', name: 'Zucchine' }
      ]
    },

    coppie_cibo: {
      title: 'Coppie di Cibo',
      emoji: '🍽️',
      description: "Qual è l'abbinamento di cibi più goloso? Scegli il tuo preferito ad ogni sfida fino alla finale.",
      folder: 'assets/images/coppie_cibo',
      items: [
        { file: 'burro_marmellata.jpg', name: 'Burro e Marmellata' },
        { file: 'caffe_cornetto.jpg', name: 'Caffè e Cornetto' },
        { file: 'champagne_fragole.jpg', name: 'Champagne e Fragole' },
        { file: 'cioccolato_peperoncino.jpg', name: 'Cioccolato e Peperoncino' },
        { file: 'formaggio_pere.jpg', name: 'Formaggio e Pere' },
        { file: 'hamburger_patatine.jpg', name: 'Hamburger e Patatine' },
        { file: 'latte_biscotti.jpg', name: 'Latte e Biscotti' },
        { file: 'mozzarella_pomodoro.jpg', name: 'Mozzarella e Pomodoro' },
        { file: 'pane_nutella.jpg', name: 'Pane e Nutella' },
        { file: 'parmigiano_aceto.jpg', name: 'Parmigiano e Aceto' },
        { file: 'pasta_fagioli.jpg', name: 'Pasta e Fagioli' },
        { file: 'pizza_birra.jpg', name: 'Pizza e Birra' },
        { file: 'polpo_patate.jpg', name: 'Polpo e Patate' },
        { file: 'popcorn_cocacola.jpg', name: 'Popcorn e Coca-Cola' },
        { file: 'prosciutto_melone.jpg', name: 'Prosciutto e Melone' },
        { file: 'salmone_avocado.jpg', name: 'Salmone e Avocado' },
        { file: 'spritz_patatine.jpg', name: 'Spritz e Patatine' },
        { file: 'uova_asparagi.jpg', name: 'Uova e Asparagi' }
      ]
    },

    musica: {
      title: 'Musica',
      emoji: '🎵',
      description: 'Vota la canzone più bella: ascolta i brani e scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/musica',
      type: 'audio',
      items: [
        { file: 'italia_amour_toujour.mp3', song: 'Amour Toujours', country: 'Italia', flagCode: 'it' },
        { file: 'belgio_papaoutai.mp3', song: 'Papaoutai', country: 'Belgio', flagCode: 'be' },
        { file: 'germania_monsoon.mp3', song: 'Monsoon', country: 'Germania', flagCode: 'de' },
        { file: 'inghilterra_bohemian_rapsody.mp3', song: 'Bohemian Rhapsody', country: 'Inghilterra', flagCode: 'gb' },
        { file: 'spagna_asereje.mp3', song: 'Asereje', country: 'Spagna', flagCode: 'es' },
        { file: 'svezia_wake_me_up.mp3', song: 'Wake Me Up', country: 'Svezia', flagCode: 'se' },
        { file: 'corea_del_sud_dynamite.mp3', song: 'Dynamite', country: 'Corea del Sud', flagCode: 'kr' },
        { file: 'usa_billie_jean.mp3', song: 'Billie Jean', country: 'Stati Uniti', flagCode: 'us' },
        { file: 'canada_blinding_lights.mp3', song: 'Blinding Lights', country: 'Canada', flagCode: 'ca' },
        { file: 'irlanda_zombie.mp3', song: 'Zombie', country: 'Irlanda', flagCode: 'ie' },
        { file: 'russia_all_the_things_she_said.mp3', song: 'All the Things She Said', country: 'Russia', flagCode: 'ru' },
        { file: 'colombia_hips_dont_lie.mp3', song: "Hips Don't Lie", country: 'Colombia', flagCode: 'co' },
        { file: 'giamaica_temperature.mp3', song: 'Temperature', country: 'Giamaica', flagCode: 'jm' },
        { file: 'australia_staying_alive.mp3', song: 'Staying Alive', country: 'Australia', flagCode: 'au' },
        { file: 'moldavia_dragostea_din_tei.mp3', song: 'Dragostea din Tei', country: 'Moldavia', flagCode: 'md' },
        { file: 'norvegia_faded.mp3', song: 'Faded', country: 'Norvegia', flagCode: 'no' }
      ]
    },

    viaggi: {
      title: 'Viaggi',
      emoji: '✈️',
      description: 'Qual è la destinazione dei sogni? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/viaggi',
      items: [
        { file: 'bora_bora.jpg', name: 'Bora Bora' },
        { file: 'cappadocia.jpg', name: 'Cappadocia' },
        { file: 'cina.jpg', name: 'Cina' },
        { file: 'costiera_amalfitana.jpg', name: 'Costiera Amalfitana' },
        { file: 'dubai.jpg', name: 'Dubai' },
        { file: 'egitto.jpg', name: 'Egitto' },
        { file: 'hawaii.jpg', name: 'Hawaii' },
        { file: 'india.jpg', name: 'India' },
        { file: 'islanda.jpg', name: 'Islanda' },
        { file: 'kenya.jpg', name: 'Kenya' },
        { file: 'lapponia.jpg', name: 'Lapponia' },
        { file: 'maldive.jpg', name: 'Maldive' },
        { file: 'new_york.jpg', name: 'New York' },
        { file: 'parchi_americani.jpg', name: 'Parchi Americani' },
        { file: 'patagonia.jpg', name: 'Patagonia' },
        { file: 'petra.jpg', name: 'Petra' },
        { file: 'rio_de_janeiro.jpg', name: 'Rio de Janeiro' },
        { file: 'santorini.jpg', name: 'Santorini' },
        { file: 'tokyo.jpg', name: 'Tokyo' }
      ]
    },

    superpoteri: {
      title: 'Superpoteri',
      emoji: '🦸',
      description: 'Quale superpotere vorresti avere? Scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/superpoteri',
      items: [
        { file: 'elasticita.jpg', name: 'Elasticità' },
        { file: 'intangibilita.jpg', name: 'Intangibilità' },
        { file: 'invisibilita.jpg', name: 'Invisibilità' },
        { file: 'leggere_mente.jpg', name: 'Leggere la Mente' },
        { file: 'manipolazione_fuoco.jpg', name: 'Manipolazione del Fuoco' },
        { file: 'manipolazione_tempo.jpg', name: 'Manipolazione del Tempo' },
        { file: 'metamorfosi.jpg', name: 'Metamorfosi' },
        { file: 'moltiplicazione.jpg', name: 'Moltiplicazione' },
        { file: 'percezione_pericolo.jpg', name: 'Percezione del Pericolo' },
        { file: 'poliglotta.jpg', name: 'Poliglotta' },
        { file: 'preveggenza.jpg', name: 'Preveggenza' },
        { file: 'rigenerazione.jpg', name: 'Rigenerazione' },
        { file: 'superforza.jpg', name: 'Superforza' },
        { file: 'superintelligenza.jpg', name: 'Superintelligenza' },
        { file: 'supervelocita.jpg', name: 'Supervelocità' },
        { file: 'telecinesi.jpg', name: 'Telecinesi' },
        { file: 'teletrasporto.jpg', name: 'Teletrasporto' },
        { file: 'volare.jpg', name: 'Volare' }
      ]
    },

    cani: {
      title: 'Cani',
      emoji: '🐶',
      description: 'Qual è la razza di cane più bella? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/cani',
      items: [
        { file: 'airedale_terrier.jpg', name: 'Airedale Terrier' },
        { file: 'akita.jpg', name: 'Akita' },
        { file: 'alano.jpg', name: 'Alano' },
        { file: 'australian_shepherd.jpg', name: 'Australian Shepherd' },
        { file: 'barboncino.jpg', name: 'Barboncino' },
        { file: 'bassotto.jpg', name: 'Bassotto' },
        { file: 'beagle.jpg', name: 'Beagle' },
        { file: 'bernese.jpg', name: 'Bernese' },
        { file: 'border_collie.jpg', name: 'Border Collie' },
        { file: 'boxer.jpg', name: 'Boxer' },
        { file: 'bull_terrier.jpg', name: 'Bull Terrier' },
        { file: 'bulldog_francese.jpg', name: 'Bulldog Francese' },
        { file: 'bulldog_inglese.jpg', name: 'Bulldog Inglese' },
        { file: 'cane_lupo_cecoslovacco.jpg', name: 'Cane Lupo Cecoslovacco' },
        { file: 'carlino.jpg', name: 'Carlino' },
        { file: 'cavalier_king.jpg', name: 'Cavalier King Charles' },
        { file: 'chihuahua.jpg', name: 'Chihuahua' },
        { file: 'chow_chow.jpg', name: 'Chow Chow' },
        { file: 'cocker.jpg', name: 'Cocker Spaniel' },
        { file: 'corgi.jpg', name: 'Corgi' },
        { file: 'corso.jpg', name: 'Cane Corso' },
        { file: 'dalmata.jpg', name: 'Dalmata' },
        { file: 'dobermann.jpg', name: 'Dobermann' },
        { file: 'golden_retriever.jpg', name: 'Golden Retriever' },
        { file: 'husky.jpg', name: 'Husky' },
        { file: 'labrador.jpg', name: 'Labrador' },
        { file: 'levriero.jpg', name: 'Levriero' },
        { file: 'pastore_maremmano.jpg', name: 'Pastore Maremmano' },
        { file: 'pastore_tedesco.jpg', name: 'Pastore Tedesco' },
        { file: 'pechinese.jpg', name: 'Pechinese' },
        { file: 'pitbull.jpg', name: 'Pitbull' },
        { file: 'rottweiler.jpg', name: 'Rottweiler' },
        { file: 'san_bernardo.jpg', name: 'San Bernardo' },
        { file: 'sharpei.jpg', name: 'Shar Pei' },
        { file: 'shiba_inu.jpg', name: 'Shiba Inu' },
        { file: 'yorkshire_terrier.jpg', name: 'Yorkshire Terrier' }
      ]
    },

    formati_di_pasta: {
      title: 'Formati di Pasta',
      emoji: '🍜',
      description: 'Qual è il formato di pasta migliore in assoluto? Scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/formati_di_pasta',
      items: [
        { file: 'casarecce.jpg', name: 'Casarecce' },
        { file: 'conchiglie.jpg', name: 'Conchiglie' },
        { file: 'farfalle.jpg', name: 'Farfalle' },
        { file: 'fusilli.jpg', name: 'Fusilli' },
        { file: 'garganelli.jpg', name: 'Garganelli' },
        { file: 'gnocchi.jpg', name: 'Gnocchi' },
        { file: 'linguine.jpg', name: 'Linguine' },
        { file: 'mezze_penne.jpg', name: 'Mezze Penne' },
        { file: 'orecchiette.jpg', name: 'Orecchiette' },
        { file: 'penne_rigate.jpg', name: 'Penne Rigate' },
        { file: 'ravioli.jpg', name: 'Ravioli' },
        { file: 'rigatoni.jpg', name: 'Rigatoni' },
        { file: 'ruote.jpg', name: 'Ruote' },
        { file: 'spaghetti.jpg', name: 'Spaghetti' },
        { file: 'tagliatelle.jpg', name: 'Tagliatelle' },
        { file: 'tortellini.jpg', name: 'Tortellini' }
      ]
    },

    personaggi_nana: {
      title: 'Personaggi di Nana',
      emoji: '🎸',
      description: "Qual è il personaggio più amato di Nana? Scegli il tuo preferito ad ogni sfida fino alla finale.",
      folder: 'assets/images/personaggi_nana',
      items: [
        { file: 'ginpei.jpg', name: 'Ginpei' },
        { file: 'junko.jpg', name: 'Junko' },
        { file: 'kyosuke.jpg', name: 'Kyosuke' },
        { file: 'misato.jpg', name: 'Misato' },
        { file: 'nana_komatsu.jpg', name: 'Nana Komatsu (Hachi)' },
        { file: 'nana_osaki.jpg', name: 'Nana Osaki' },
        { file: 'naoki.jpg', name: 'Naoki' },
        { file: 'nobu.jpg', name: 'Nobu' },
        { file: 'reira.jpg', name: 'Reira' },
        { file: 'ren.jpg', name: 'Ren' },
        { file: 'sachiko.jpg', name: 'Sachiko' },
        { file: 'shin.jpg', name: 'Shin' },
        { file: 'shoji.jpg', name: 'Shoji' },
        { file: 'takashi.jpg', name: 'Takashi' },
        { file: 'takumi.jpg', name: 'Takumi' },
        { file: 'yasu.jpg', name: 'Yasu' }
      ]
    },

    marche_di_moda: {
      title: 'Marche di Moda',
      emoji: '👜',
      description: 'Qual è la marca di moda migliore in assoluto? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/marche_di_moda',
      items: [
        { file: 'acne_studios.jpg', name: 'Acne Studios' },
        { file: 'armani.jpg', name: 'Armani' },
        { file: 'bottega_veneta.jpg', name: 'Bottega Veneta' },
        { file: 'burberry.jpg', name: 'Burberry' },
        { file: 'burlon.jpg', name: 'Marcelo Burlon' },
        { file: 'chanel.jpg', name: 'Chanel' },
        { file: 'comme_des_garcons.jpg', name: 'Comme des Garçons' },
        { file: 'dior.jpg', name: 'Dior' },
        { file: 'dolce_e_gabbana.jpg', name: 'Dolce & Gabbana' },
        { file: 'fendi.jpg', name: 'Fendi' },
        { file: 'ferragamo.jpg', name: 'Ferragamo' },
        { file: 'gucci.jpg', name: 'Gucci' },
        { file: 'hermes.jpg', name: 'Hermès' },
        { file: 'kenzo.jpg', name: 'Kenzo' },
        { file: 'louis_vitton.jpg', name: 'Louis Vuitton' },
        { file: 'marc_jacobs.jpg', name: 'Marc Jacobs' },
        { file: 'maxmara.jpg', name: 'Max Mara' },
        { file: 'moschino.jpg', name: 'Moschino' },
        { file: 'off_white.jpg', name: 'Off-White' },
        { file: 'prada.jpg', name: 'Prada' },
        { file: 'ralph_lauren.jpg', name: 'Ralph Lauren' },
        { file: 'stella_mccartney.jpg', name: 'Stella McCartney' },
        { file: 'valentino.jpg', name: 'Valentino' },
        { file: 'versace.jpg', name: 'Versace' },
        { file: 'yves_saint_laurent.jpg', name: 'Yves Saint Laurent' }
      ]
    },

    tradizioni_giappone: {
      title: 'Tradizioni del Giappone',
      emoji: '⛩️',
      description: 'Qual è la tradizione giapponese più affascinante? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/tradizioni_giappone',
      items: [
        { file: 'Jidohanbaiki.jpg', name: 'Jidohanbaiki (Distributori Automatici)' },
        { file: 'bento.jpg', name: 'Bento' },
        { file: 'cerimonia_del_te.jpg', name: 'Cerimonia del Tè' },
        { file: 'cherry_blossom.jpg', name: 'Fiori di Ciliegio (Sakura)' },
        { file: 'giardini_zen.jpg', name: 'Giardini Zen' },
        { file: 'karaoke.jpg', name: 'Karaoke' },
        { file: 'kimono_e_yukata.jpg', name: 'Kimono e Yukata' },
        { file: 'love_hotels.jpg', name: 'Love Hotel' },
        { file: 'maid_cafe.jpg', name: 'Maid Café' },
        { file: 'manga_shops.jpg', name: 'Negozi di Manga' },
        { file: 'matsuri.jpg', name: 'Matsuri (Festival)' },
        { file: 'onsen.jpg', name: 'Onsen (Terme)' },
        { file: 'ramen_shops.jpg', name: 'Ramen Shop' },
        { file: 'sake.jpg', name: 'Sakè' },
        { file: 'sumo.jpg', name: 'Sumo' },
        { file: 'sushi.jpg', name: 'Sushi' },
        { file: 'tokyo_food_market.jpg', name: 'Mercato del Cibo di Tokyo' },
        { file: 'toro_nagashi.jpg', name: 'Toro Nagashi' }
      ]
    },

    momenti_importanti: {
      title: 'Momenti importanti',
      emoji: '⛩️',
      description: 'Qual è il momento che ricordi con più felicità? Scegli il tuo preferito, anche se sono tutti bellissimi.',
      folder: 'assets/images/momenti',
      items: [
        { file: 'atene_con_tutti_insieme.jpg', name: 'Atene con tutti insieme' },
        { file: 'bere_un_bicchiere_con_nonno.jpg', name: 'Bere un bicchiere con il nonno' },
        { file: 'berlino_con_steffi.jpg', name: 'Berlino con Steffi' },
        { file: 'essere_vestiti_da_bambina_da_nonna.jpg', name: 'Essere vestiti da bambina dalla nonna' },
        { file: 'film_sul_divano_con_petta_e_mamma.jpg', name: 'Film sul divano con Petta e mamma' },
        { file: 'giocare_con_la_neve_con_flo_e_silvi.jpg', name: 'Giocare con la neve con Flo e Cuch' },
        { file: 'giocare_con_mia_e_matteo.jpg', name: 'Giocare con la Mia e Matteo' },
        { file: 'lunghe_chiacchiere_con_silvi.jpg', name: 'Lunghe chiacchiere con Cuch' },
        { file: 'mercato_con_nonna_e_nonno.jpg', name: 'Giri al mercato con nonna e nonno' },
        { file: 'parigi_con_mamma.jpg', name: 'Parigi con la mamma' },
        { file: 'passeggiate_percorso_natura_con_papa.jpg', name: 'Passeggiate nel percorso natura con il papà' },
        { file: 'portogallo_con_petta.jpg', name: 'Portogallo con Petta' },
        { file: 'primo_bacio_con_petta.jpg', name: 'Primo bacio con Petta' },
        { file: 'risate_con_flo.jpg', name: 'Tante risate con Flo' },
        { file: 'santorini_con_mamma.jpg', name: 'Santorini con la mamma' },
        { file: 'scuola_guida_con_zio_ben.jpg', name: 'Scuola guida con lo zio Ben' },
        { file: 'spiaggia_con_famiglia.jpg', name: 'Spiaggia con tutta la famiglia' },
        { file: 'toscana_con_mamma_e_silvi.jpg', name: 'Toscana con la mamma e Cuch' },
        { file: 'viaggio_maturita_con_amiche.jpg', name: 'Viaggio di Maturità con le amiche' }
      ]
    },

    locandina_film: {
      title: 'Locandina Film Più Bella',
      emoji: '🖼️',
      description: 'Qual è la locandina di film più bella di sempre? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/locandine_film',
      items: [
        { file: 'pulp_fiction.jpg', name: 'Pulp Fiction' },
        { file: 'il_silenzio_degli_innocenti.jpg', name: 'Il Silenzio degli Innocenti' },
        { file: 'forrest_gump.jpg', name: 'Forrest Gump' },
        { file: 'interstellar.jpg', name: 'Interstellar' },
        { file: 'lo_squalo.jpg', name: 'Jaws - Lo Squalo' },
        { file: 'cera_una_volta_in_america.jpg', name: 'C\'era una volta in America' },
        { file: 'the_dark_knight.jpg', name: 'The Dark Knight' },
        { file: 'star_wars_una_nuova_speranza.jpg', name: 'Star Wars: Episodio IV - Una Nuova Speranza' },
        { file: 'et_extraterrestre.jpg', name: "E.T. l'Extra-Terrestre" },
        { file: 'ritorno_al_futuro.jpg', name: 'Ritorno al Futuro' },
        { file: 'avatar.jpg', name: 'Avatar' },
        { file: 'fight_club.jpg', name: 'Fight Club' },
        { file: 'truman_show.jpg', name: 'The Truman Show' },
        { file: 'get_out.jpg', name: 'Get Out' },
        { file: 'indiana_jones.jpg', name: 'Indiana Jones' },
        { file: 'shining.jpg', name: 'Shining' },
        { file: 'la_la_land.jpg', name: 'La La Land' },
        { file: 'joker.jpg', name: 'Joker' },
        { file: 'ghostbusters.jpg', name: 'Ghostbusters' },
        { file: 'jurassic_park.jpg', name: 'Jurassic Park' },
        { file: 'american_beauty.jpg', name: 'American Beauty' }
      ]
    },

    film_piu_bello: {
      title: 'Film Più Bello',
      emoji: '🎥',
      description: 'Qual è il film più bello di sempre? Scegli il tuo preferito ad ogni sfida fino alla finale.',
      folder: 'assets/images/film_piu_bello',
      items: [
        { file: 'seven.jpg', name: 'Seven' },
        { file: 'sette_anime.jpg', name: 'Sette Anime' },
        { file: 'fight_club.jpg', name: 'Fight Club' },
        { file: 'oldboy.jpg', name: 'Oldboy' },
        { file: 'shutter_island.jpg', name: 'Shutter Island' },
        { file: 'one_day.jpg', name: 'One Day' },
        { file: 'the_notebook.jpg', name: 'The Notebook - Le Pagine della Nostra Vita' },
        { file: 'the_prestige.jpg', name: 'The Prestige' },
        { file: 'truman_show.jpg', name: 'The Truman Show' },
        { file: 'la_ricerca_della_felicita.jpg', name: 'La Ricerca della Felicità' },
        { file: 'la_vita_e_bella.jpg', name: 'La Vita è Bella' },
        { file: 'a_beautiful_mind.jpg', name: 'A Beautiful Mind' },
        { file: 'manchester_by_the_sea.jpg', name: 'Manchester by the Sea' },
        { file: 'il_pianista.jpg', name: 'Il Pianista' },
        { file: 'leon.jpg', name: 'Léon' },
        { file: 'will_hunting.jpg', name: 'Will Hunting - Genio Ribelle' },
        { file: 'animali_notturni.jpg', name: 'Animali Notturni' },
        { file: 'gladiator.jpg', name: 'Il Gladiatore' }
      ]
    },

    sensazioni: {
      title: 'La Sensazione Più Appagante',
      emoji: '✨',
      description: 'Qual è la sensazione più appagante in assoluto? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/sensazioni',
      items: [
        { file: 'lenzuola_pulite.jpg', name: 'Lenzuola pulite appena messe' },
        { file: 'togliersi_le_scarpe.jpg', name: 'Togliersi le scarpe strette dopo una lunga giornata' },
        { file: 'pioggia_sotto_il_piumone.jpg', name: 'La pioggia fuori mentre sei al caldo sotto il piumone' },
        { file: 'doccia_calda.jpg', name: 'La doccia calda dopo una giornata devastante' },
        { file: 'svegliarsi_di_sabato.jpg', name: 'Svegliarsi e capire che è sabato' },
        { file: 'sorso_acqua_dopo_corsa.jpg', name: "Un sorso d'acqua dopo una lunga corsa" },
        { file: 'treno_in_arrivo.jpg', name: 'Il treno/bus che arriva proprio mentre arrivi tu' },
        { file: 'primo_sorso_di_caffe.jpg', name: 'Il primo sorso di caffè al mattino' },
        { file: 'stiracchiarsi_al_risveglio.jpg', name: 'Stiracchiarsi appena svegli' },
        { file: 'scrocchiarsi_le_dita.jpg', name: 'Scrocchiarsi le dita' },
        { file: 'togliere_pellicola_protettiva.jpg', name: 'Togliere la pellicola protettiva da un oggetto nuovo' },
        { file: 'buttarsi_sul_divano.jpg', name: 'Buttarsi sul divano dopo una giornata pesante' },
        { file: 'trovare_parcheggio_subito.jpg', name: 'Trovare parcheggio subito sotto casa' },
        { file: 'silenzio_dopo_rumore.jpg', name: 'Il silenzio dopo che finisce un rumore fastidioso' },
        { file: 'doccia_dopo_mare.jpg', name: 'Togliersi la sabbia sotto la doccia dopo il mare' },
        { file: 'sole_caldo_in_inverno.jpg', name: 'Il sole caldo sulla pelle in una giornata fredda' }
      ]
    },

    materie_scolastiche: {
      title: 'Materie Scolastiche',
      emoji: '📚',
      description: 'Qual è la materia scolastica più bella di sempre? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/materie_scolastiche',
      items: [
        { file: 'matematica.jpg', name: 'Matematica' },
        { file: 'educazione_fisica.jpg', name: 'Educazione Fisica' },
        { file: 'storia.jpg', name: 'Storia' },
        { file: 'chimica.jpg', name: 'Chimica' },
        { file: 'filosofia.jpg', name: 'Filosofia' },
        { file: 'latino.jpg', name: 'Latino' },
        { file: 'italiano.jpg', name: 'Italiano' },
        { file: 'inglese.jpg', name: 'Inglese' },
        { file: 'fisica.jpg', name: 'Fisica' },
        { file: 'biologia.jpg', name: 'Biologia' },
        { file: 'arte.jpg', name: 'Arte' },
        { file: 'geografia.jpg', name: 'Geografia' },
        { file: 'scienze.jpg', name: 'Scienze' },
        { file: 'musica.jpg', name: 'Musica' },
        { file: 'informatica.jpg', name: 'Informatica' },
        { file: 'greco.jpg', name: 'Greco' }
      ]
    },

    sensazioni_fastidiose: {
      title: 'La Sensazione Più Fastidiosa',
      emoji: '😩',
      description: 'Qual è la sensazione più fastidiosa in assoluto? Scegli quella che ti dà più fastidio ad ogni sfida fino alla finale.',
      folder: 'assets/images/sensazioni_fastidiose',
      items: [
        { file: 'sveglia_sul_piu_bello.jpg', name: 'La sveglia che suona sul più bello' },
        { file: 'sabbia_nei_calzini.jpg', name: 'La sabbia nei calzini' },
        { file: 'calpestare_un_lego.jpg', name: 'Calpestare un Lego a piedi nudi' },
        { file: 'popup_pubblicitario.jpg', name: 'Il pop-up pubblicitario intoccabile' },
        { file: 'cellulare_scarico.jpg', name: 'Il cellulare che si scarica proprio quando serve' },
        { file: 'wifi_che_cade.jpg', name: 'Il Wi-Fi che cade nel momento sbagliato' },
        { file: 'unghia_rotta.jpg', name: "Un'unghia che si rompe storta" },
        { file: 'unghie_sulla_lavagna.jpg', name: 'Il rumore delle unghie sulla lavagna' },
        { file: 'suoneria_alta_in_silenzio.jpg', name: 'Restare con la suoneria alta in un luogo silenzioso' },
        { file: 'cuffie_aggrovigliate.jpg', name: 'Il filo delle cuffie che si aggroviglia' },
        { file: 'mordersi_la_lingua.jpg', name: 'Mordersi la lingua mangiando' },
        { file: 'colpo_al_gomito.jpg', name: "Prendersi un colpo sull'osso del gomito" },
        { file: 'carta_igienica_finita.jpg', name: 'La carta igienica finita proprio quando serve' },
        { file: 'telefono_caduto_schermo_giu.jpg', name: 'Il telefono che cade con lo schermo verso il basso' },
        { file: 'carrello_lento_al_supermercato.jpg', name: 'Restare bloccati dietro un carrello lento al supermercato' },
        { file: 'tergicristallo_che_stride.jpg', name: 'Il tergicristallo che stride sul vetro asciutto' }
      ]
    },

    odore_piu_buono: {
      title: "L'Odore Più Buono",
      emoji: '🌿',
      description: "Qual è l'odore più buono del mondo? Scegli il tuo preferito ad ogni sfida fino alla finale.",
      folder: 'assets/images/odore_piu_buono',
      items: [
        { file: 'caffe_al_mattino.jpg', name: 'Caffè al mattino' },
        { file: 'pioggia_sull_asfalto.jpg', name: "Pioggia sull'asfalto (petricore)" },
        { file: 'libro_nuovo.jpg', name: 'Libro nuovo' },
        { file: 'pane_appena_sfornato.jpg', name: 'Pane appena sfornato' },
        { file: 'benzina.jpg', name: 'Benzina' },
        { file: 'erba_tagliata.jpg', name: 'Erba tagliata' },
        { file: 'vaniglia.jpg', name: 'Vaniglia' },
        { file: 'cioccolato_fondente.jpg', name: 'Cioccolato fondente' },
        { file: 'mare.jpg', name: 'Mare' },
        { file: 'lavanda.jpg', name: 'Lavanda' },
        { file: 'biscotti_al_forno.jpg', name: 'Biscotti appena sfornati' },
        { file: 'agrumi_freschi.jpg', name: 'Agrumi freschi' },
        { file: 'foglie_autunnali.jpg', name: 'Foglie autunnali' },
        { file: 'camino_acceso.jpg', name: 'Camino acceso' },
        { file: 'colonia_dopobarba.jpg', name: 'Colonia dopobarba' },
        { file: 'bucato_appena_stirato.jpg', name: 'Bucato appena stirato' }
      ]
    },

    coppie_bromance: {
      title: 'La Coppia/Bromance Più Bella',
      emoji: '🤝',
      description: 'Qual è la coppia o bromance più bella di film e serie TV? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/coppie_bromance',
      items: [
        { file: 'woody_e_buzz.jpg', name: 'Woody e Buzz' },
        { file: 'sherlock_e_watson.jpg', name: 'Sherlock Holmes e Watson' },
        { file: 'jd_e_turk.jpg', name: 'JD e Turk' },
        { file: 'han_solo_e_chewbacca.jpg', name: 'Han Solo e Chewbacca' },
        { file: 'lilo_e_stitch.jpg', name: 'Lilo e Stitch' },
        { file: 'frodo_e_sam.jpg', name: 'Frodo e Sam' },
        { file: 'batman_e_robin.jpg', name: 'Batman e Robin' },
        { file: 'mario_e_luigi.jpg', name: 'Mario e Luigi' },
        { file: 'walter_e_jesse.jpg', name: 'Walter e Jesse' },
        { file: 'goku_e_vegeta.jpg', name: 'Goku e Vegeta' },
        { file: 'timon_e_pumba.jpg', name: 'Timon e Pumba' },
        { file: 'shrek_e_ciuchino.jpg', name: 'Shrek e Ciuchino' },
        { file: 'spongebob_e_patrick.jpg', name: 'Spongebob e Patrick' },
        { file: 'nana_e_yasu.jpg', name: 'Nana e Yasu' },
        { file: 'light_e_l.jpg', name: 'Light e L' },
        { file: 'tom_e_jerry.jpg', name: 'Tom e Jerry' }
      ]
    },

    cucine_nazionali: {
      title: 'La Cucina Nazionale Più Buona',
      emoji: '🍲',
      description: 'Qual è la cucina nazionale più buona al mondo? Scegli la tua preferita ad ogni sfida fino alla finale.',
      folder: 'assets/images/cucine_nazionali',
      items: [
        { file: 'cucina_italiana.jpg', name: 'Cucina Italiana' },
        { file: 'cucina_giapponese.jpg', name: 'Cucina Giapponese' },
        { file: 'cucina_messicana.jpg', name: 'Cucina Messicana' },
        { file: 'cucina_indiana.jpg', name: 'Cucina Indiana' },
        { file: 'cucina_thailandese.jpg', name: 'Cucina Thailandese' },
        { file: 'cucina_greca.jpg', name: 'Cucina Greca' },
        { file: 'cucina_francese.jpg', name: 'Cucina Francese' },
        { file: 'cucina_spagnola.jpg', name: 'Cucina Spagnola' },
        { file: 'cucina_cinese.jpg', name: 'Cucina Cinese' },
        { file: 'cucina_coreana.jpg', name: 'Cucina Coreana' },
        { file: 'cucina_vietnamita.jpg', name: 'Cucina Vietnamita' },
        { file: 'cucina_libanese.jpg', name: 'Cucina Libanese' },
        { file: 'cucina_peruviana.jpg', name: 'Cucina Peruviana' },
        { file: 'cucina_turca.jpg', name: 'Cucina Turca' },
        { file: 'cucina_marocchina.jpg', name: 'Cucina Marocchina' },
        { file: 'cucina_statunitense.jpg', name: 'Cucina Statunitense' }
      ]
    },

    invenzioni: {
      title: "L'Invenzione Più Importante",
      emoji: '💡',
      description: "Qual è l'invenzione dell'umanità più importante di sempre? Scegli la tua preferita ad ogni sfida fino alla finale.",
      folder: 'assets/images/invenzioni',
      items: [
        { file: 'internet.jpg', name: 'Internet' },
        { file: 'la_ruota.jpg', name: 'La Ruota' },
        { file: 'aria_condizionata.jpg', name: "L'Aria Condizionata" },
        { file: 'corrente_elettrica.jpg', name: 'La Corrente Elettrica' },
        { file: 'antibiotici.jpg', name: 'Gli Antibiotici' },
        { file: 'stampa_a_caratteri_mobili.jpg', name: 'La Stampa a Caratteri Mobili' },
        { file: 'telefono.jpg', name: 'Il Telefono' },
        { file: 'lampadina.jpg', name: 'La Lampadina' },
        { file: 'motore_a_combustione.jpg', name: 'Il Motore a Combustione' },
        { file: 'vaccini.jpg', name: 'I Vaccini' },
        { file: 'scrittura.jpg', name: 'La Scrittura' },
        { file: 'frigorifero.jpg', name: 'Il Frigorifero' },
        { file: 'aeroplano.jpg', name: "L'Aeroplano" },
        { file: 'bussola.jpg', name: 'La Bussola' },
        { file: 'computer.jpg', name: 'Il Computer' },
        { file: 'carta.jpg', name: 'La Carta' }
      ]
    },

    animali_maestosi: {
      title: 'L\'Animale Più Bello',
      emoji: '🦅',
      description: "Qual è l'animale più bello e maestoso in assoluto? Scegli il tuo preferito ad ogni sfida fino alla finale.",
      folder: 'assets/images/animali_maestosi',
      items: [
        { file: 'lupo.jpg', name: 'Lupo' },
        { file: 'aquila.jpg', name: 'Aquila' },
        { file: 'leone.jpg', name: 'Leone' },
        { file: 'orca.jpg', name: 'Orca' },
        { file: 'tigre.jpg', name: 'Tigre' },
        { file: 'gufo.jpg', name: 'Gufo' },
        { file: 'cavallo.jpg', name: 'Cavallo' },
        { file: 'elefante.jpg', name: 'Elefante' },
        { file: 'pantera.jpg', name: 'Pantera' },
        { file: 'orso.jpg', name: 'Orso' },
        { file: 'falco.jpg', name: 'Falco' },
        { file: 'delfino.jpg', name: 'Delfino' },
        { file: 'giaguaro.jpg', name: 'Giaguaro' },
        { file: 'cigno.jpg', name: 'Cigno' },
        { file: 'ghepardo.jpg', name: 'Ghepardo' },
        { file: 'volpe_artica.jpg', name: 'Volpe Artica' }
      ]
    }
  };

  function getCategory(key) {
    return CATEGORIES[key] || null;
  }

  function buildParticipants(category) {
    if (category.type === 'audio') {
      return category.items.map((it) => ({
        id: it.file.replace(/\.[^.]+$/, ''),
        name: it.song,
        country: it.country,
        flagCode: it.flagCode,
        audio: `${category.folder}/${encodeURIComponent(it.file)}`
      }));
    }
    return category.items.map((it) => ({
      id: it.file.replace(/\.[^.]+$/, ''),
      name: it.name,
      img: `${category.folder}/${encodeURIComponent(it.file)}`
    }));
  }

  global.TorneoCategories = { CATEGORIES, getCategory, buildParticipants };
})(window);
