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
        { file: 'jessica_alba.jpg', name: 'Jessica Alba' },
        { file: 'margot_robbie.jpg', name: 'Margot Robbie' },
        { file: 'megan.jpg', name: 'Megan Fox' },
        { file: 'monica_bellucci.jpg', name: 'Monica Bellucci' },
        { file: 'natalie_portman.jpg', name: 'Natalie Portman' },
        { file: 'scarlett_johannson.jpg', name: 'Scarlett Johansson' },
        { file: 'sidney_sweeney.jpg', name: 'Sydney Sweeney' }
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
        { file: 'avocado.jpg', name: 'Avocado' },
        { file: 'banana.jpg', name: 'Banana' },
        { file: 'ciliegia.jpg', name: 'Ciliegia' },
        { file: 'cocco.jpg', name: 'Cocco' },
        { file: 'fragola.jpg', name: 'Fragola' },
        { file: 'kiwi.jpg', name: 'Kiwi' },
        { file: 'lampone.jpg', name: 'Lampone' },
        { file: 'limone.jpg', name: 'Limone' },
        { file: 'mango.jpg', name: 'Mango' },
        { file: 'mela.jpg', name: 'Mela' },
        { file: 'melograno.jpg', name: 'Melograno' },
        { file: 'melone.jpg', name: 'Melone' },
        { file: 'mirtillo.jpg', name: 'Mirtillo' },
        { file: 'pesca.jpg', name: 'Pesca' }
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
        { file: 'salmone.jpg', name: 'Pasta al Salmone' },
        { file: 'scoglio.jpg', name: 'Pasta allo Scoglio' },
        { file: 'sorrentina.jpg', name: 'Pasta alla Sorrentina' },
        { file: 'tonno.jpg', name: 'Pasta al Tonno' },
        { file: 'vongole.jpg', name: 'Vongole' }
        // Nota: servono 16 immagini (ne mancano 1) perché il torneo possa attivarsi.
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
