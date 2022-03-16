const miModulo = (() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K']; 

    //Sector de puntos de computadora y jugador 
    let puntosJugadores = []; 

    //HTML BUTTON 
    const btnPedir = document.querySelector('#btn-Pedir'),
          btnFinish = document.querySelector('#btn-Finish'),
          btnNew = document.querySelector('#btn-New');   

    //Sector de contador 
    const divCartasImg = document.querySelectorAll('.divCartas'),
          addSmall = document.querySelectorAll('small'); 


    //Esta funcion inicializa el juego
    const inicializarJugador = (numJugador = 2) => {
      deck = crearDeck();

      puntosJugadores = []; 
      for(let i = 0; i< numJugador; i++) {
        puntosJugadores.push(0);  
      }

      addSmall.forEach(elem => elem.innerText= 0);
      divCartasImg.forEach(elem => elem.innerHTML = '');

      btnPedir.disabled = false;
      btnFinish.disabled = false; 
    }
    
    
    //Esta funciona crea una nueva baraja 
    const crearDeck = () => { 
      deck = [];
      for(let i = 2; i <= 10; i++) { 
        for(let tipo of tipos) {
          deck.push(i + tipo);
        }
      }

      for(let tipo of tipos) { 
        for(let esp of especiales) { 
          deck.push(esp +tipo);
        }
      }
      return _.shuffle(deck); //Mezcla las cartas (tuve que descargar un recurso para usarlo)
    }
    

     //Esta funcion me permite tomar una carta
    const pedirCarta = () => {
      if(deck.length === 0) { 
          throw 'No hay cartas en el dock';
      }
      return deck.pop();; 
    } 


    //Pedir carta 
    const valorCarta = (carta) => { 
        const valor = carta.substring(0, carta.length -1);
        return(isNaN(valor)) ? 
        (valor === 'A') ? 11: 10 
        :valor * 1;
    }

    
    const acumularPuntos = (carta, turno) => {
      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta ); 
      addSmall[turno].innerText = puntosJugadores[turno]; 
      return puntosJugadores[turno]; 
    }

    const crearCarta = (carta, turno) => { 
      const imgCarta = document.createElement('img');
      imgCarta.src = `../Black-Jack/assets/img/${ carta }.png`;
      divCartasImg[turno].append(imgCarta);
    }



    const determinadorGanador = () => {
      const [puntosMinimos, puntosComputadora] = puntosJugadores; 

      setTimeout(() => {
        if(puntosComputadora === puntosMinimos) { 
          alert('Nadie gana :C'); 
        } else if (puntosMinimos > 21) {
          alert('Computadora gana');
        } else if(puntosComputadora > 21) {
          alert('El jugador gana'); 
        } else { 
          alert('La computadora gana')
        }
      }, 10);
    }

    //Turno de la computadora 
    const turnoComputer = (puntosMinimos) => {
      let puntosComputadora = 0;
      do {
        const carta = pedirCarta();
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
        crearCarta(carta, puntosJugadores.length - 1);
      } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)); 

      determinadorGanador(); 
    }

    //Eventos
    btnPedir.addEventListener('click', () => { 
      const carta = pedirCarta();
      const puntosJugador = acumularPuntos( carta, 0 );
      crearCarta(carta, 0); 
      
      if(puntosJugador > 21) { 
        console.log('¡Perdiste!, Superaste los 21 puntos.');
        btnPedir.disabled = true;
        turnoComputer(puntosJugador);
        btnFinish.disabled = true; 
      } else if (puntosJugador === 21) {
        console.log('¡Ganaste!');
        btnPedir.disabled   = true;
        btnFinish.disabled = true; 
        turnoComputer(puntosJugadores); 
      }
    }); 

    btnFinish.addEventListener('click', () => { 
      btnPedir.disabled = true;
      btnFinish.disabled = true;
      turnoComputer(puntosJugadores[0]);
    }); 

    // BTN NEW 
    btnNew.addEventListener('click', () => {
      inicializarJugador(); 
    }); 


    return 'hola'
})();


