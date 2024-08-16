//bloco responsavel por realizar as importações
import { useState } from "react";
import { FiSearch } from "react-icons/fi"; //icones
import './style.css'; //style
import api from './services/api';

function App(){
  //declarando as variaveis 
  const [input, setInput] = useState('');
  //mostra qual o valor inicial 
  const [cnpj, setCNPJ] = useState({});
//função assiicrona 
  async function handleSearch(){
//verifica se o usuario preencheu o valor do CEP e se ele não preencher aparecerá um alerta na tela 
    if(input === ''){
      alert("preencha algum CNPJ!")
      return;
    }
//esse bloco valida e informa erros que acontecem durante a execusão, quando a execusao da função dá certo, entra no bloco try e quando ocorre um erro ele entra no catch
    try{
      const response = await api.get(`${input}`)
      setCNPJ(response.data)
      setInput("")
  }catch{
      alert("Erro ao buscar CNPJ")
      setInput("")
  }
  }
  //retorna a requisição 
  return(
    <div className="container">
      <h1 className="title">Consultar CNPJ</h1>
    <div className = "containerInput">
      <input
      type="text"
      placeholder="digite o CNPJ"
     value={input}
      onChange={(e)=> setInput(e.target.value)}
    />
        <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
      </button>
    </div> 
    {Object.keys(cnpj).length> 0 &&(
      <main className="main">
        <h2>Razão Social: {cnpj.razao_social}</h2>
        <span>Fundação: {cnpj.data_inicio_atividade}</span>
        <span>Situação Cadastral: {cnpj.descricao_situacao_cadastral}</span>
        <span>Contato: {cnpj.ddd_fax}</span>
      </main>
    )}
    </div>
  );
}
//está exportando a função App
export default App;