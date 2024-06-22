import { useState } from 'react';
import './App.css';

function App() {
  const [bairro, setBairro] = useState(null);
  const [rua, setRua] = useState(null);
  
  const handleClick = () => {
    if(!bairro || !rua){
      alert("Preencha todos os campos !")
    } else{
      window.location.href = 'https://pay.kiwify.com.br/JIKznBM';
    }
  }

  const handleCep = async (e) => {
    const cep = e.target.value;
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar o CEP');
        }
        const data = await response.json();
        setBairro(data.neighborhood);
        setRua(data.street);
        console.log(data.neighborhood, data.street); // Verifique no console
      } catch (error) {
        alert("Erro ao buscar o CEP: " + error.message);
      }
    } else {
      // Caso o CEP não tenha 8 dígitos, limpar os estados
      setBairro(null);
      setRua(null);
    }
  }

  return (
    <div className='container'>
      <div className='mobile'>
        <span className='space-top'>Garrafa Falsa - Cofre Seguro</span>
        <div className='foto-legenda'>
          <img src="https://ae01.alicdn.com/kf/S38c14f18539545b5bb631daddca1baebv.jpg_640x640Q90.jpg_.webp" alt="img" />
        </div>
        <div className='drop'>
          <span>Preencha o endereço de entrega:</span>
          <input type="text" name="text" className="input" placeholder="CEP" onChange={handleCep} required />
          <input type="text" name="text" className="input" placeholder="Bairro" defaultValue={bairro} required />
          <input type="text" name="text" className="input" placeholder="Rua" defaultValue={rua} required />
          <input type="text" name="text" className="input" placeholder="Número" required />
          <button onClick={handleClick}>Seguinte</button>
        </div>
      </div>
    </div>
  );
}

export default App;
