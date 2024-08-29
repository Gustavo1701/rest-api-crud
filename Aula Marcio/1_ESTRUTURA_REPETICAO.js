//For
const nomes = ["Ana", "Maria", "Carla", "Edi"];

for (percorrerFor = 0; percorrerFor<nomes.length; percorrerFor++){
    console.log(nomes[percorrerFor]);            
}

//ForEach
// O primeiro valor no forEach é o Valor do array e o segundo é o índece e o terceiro é a Lista completa
const pessoas = ["Ana", "Marcio", "Lucas", "Bruno"];

function lerPosicao(valorIndice, indice, ListaCompleta){
    console.log(valorIndice + "-" + indice + " - " + ListaCompleta);
}
pessoas.forEach(lerPosicao);

//Estrutura do erofuction
// pessoas.forEach(()=>{})

 // MAP 
 let montagemHTML = "";
 pessoas.map((valor) => {
   montagemHTML = montagemHTML + `<li>${valor}</li>`;
 });
 document.getElementById("lista").innerHTML = montagemHTML;
 console.log(montagemHTML);   
 
 //Filter
const pessoasFiltradas = pessoas.filter((nomes, posicao)=>{
    if(nomes.length === 3){
        return nomes;
    }
})
console.log(pessoasFiltradas);

// *Reduce*
// O reduce é utilizado por exemplo em caixa, sendo possivel por exemplo pegar o saldo do dia passado e somar com o dia atual
// No reduce o primeiro parametro é o valor inicial e o segundo é o valor da posição
// Por ultimo pode colocar o valor inicial
const valores = [1200.00, 5400.24, 6531.21, 55500.45];

const total = valores.reduce((valorAcumulado, valorDaPosicao)=>{
    console.log("Valor acumulado: " + valorAcumulado);
    console.log("Valor da Posição: " + valorDaPosicao);
    return valorAcumulado + valorDaPosicao;
}, 0);


