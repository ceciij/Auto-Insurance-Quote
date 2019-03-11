//Variables
const formulario= document.getElementById('cotizar-seguro'); 


// Cotizador Constructor

function Seguro(marca, anio, tipo){
    this.marca=marca;
    this.anio=anio;
    this.tipo=tipo;
}

    Seguro.prototype.cotizaImporte = function(){
        /* MARCA
            1 Americano = 1.15
            2 Asiatico = 1.05
            3 Europeo = 1.30
        */ 
        let cant;
        const base = 2000;
        switch(this.marca){
            case '1': cant= base*1.15;
                break;
            case '2': cant= base*1.05;
                break;
            case '3': cant= base*1.35;
                break;
        }
        /* ANIO
            cada anio de diferencia, hay que reducir 3% del valor de la cotizacion
        */
        const diferencia = new Date().getFullYear() - this.anio;
        cant-= (diferencia*3*cant/100);
        
        /* TIPO
            Basico = se queda igual
            Completo = sube 5% de lo que cuesta
        */ 
       if(this.tipo==='completo'){
           cant*=1.05;
       }
       return cant;
    }

// Lo que se muestra en el HTML
function Interfaz(){}
    //Mostrar error
    Interfaz.prototype.mostrarMensaje = function(mensaje, tipoMensaje){
        const div = document.createElement('div');
        if(tipoMensaje==='error'){
            div.classList.add('mensaje', 'error');
        }
        else{
            div.classList.add('mensaje','correcto');
        }
        div.innerHTML= `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));
        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        },2000);
    }

//Muestra el monto del seguro
Interfaz.prototype.mostrarResultado = function(seguro, total){
    const resultado = document.getElementById('resultado');
    let marca;
    switch(seguro.marca){
        case '1': marca = "Americano";
            break;
        case '2': marca = "Asiatico";
            break;
        case '3': marca = "Europeo";
            break;
        }

    let div = document.createElement('div');
    div.classList = 'cotizacion';
    
    div.innerHTML=`
    <p class= 'header'>Resumen</p>
    <p>Marca: ${marca}</p>
    <p>Anio: ${seguro.anio}</p>
    <p>Tipo de seguro: ${seguro.tipo}</p>
    <p>Total de la cotizacion: $ ${total}</p>`

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function(){
        spinner.style.display='none';
        resultado.appendChild(div);
    },2000);

}

// Event Listeners
formulario.addEventListener('submit',  CotizarSeguro);

// Funciones
function CotizarSeguro(e){
    e.preventDefault();
    
    // Leer marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    
    //Leer anio seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //Leer el valor del radioboton seleccionado
    const tipo= document.querySelector('input[name="tipo"]:checked').value;

    //Instancia de Interfaz
    const interfaz= new Interfaz();

    //Comprobar que los campos no esten vacios
    if(marcaSeleccionada===''|| anioSeleccionado==='' || tipo===''){
        interfaz.mostrarMensaje('Debes seleccionar todos los campos', 'error');
    }
    else{
        //Imprime mensaje
        interfaz.mostrarMensaje('Cotizado, espere un momento', 'correcto');
        // Limpiar resultados anteriores
        const resultados= document.querySelector('#resultado div');
        if(resultados!= null){
            document.querySelector('.cotizacion').remove();
        }

        // Instanciar seguro
        const seguro= new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        
        //Cotizar el seguro a traves de prototipos
        const cantidad = seguro.cotizaImporte();
        
        //Mostrar el resultado en la interfaz
        interfaz.mostrarResultado(seguro,cantidad);    
    }

}


const max = new Date().getFullYear(),
      min = max-20;

const selectAnios = document.getElementById('anio');
for(let i=max; i>min; i--){
    let option= document.createElement('option');
    option.value= i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}