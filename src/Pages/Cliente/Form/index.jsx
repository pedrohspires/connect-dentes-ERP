import React, { useEffect, useState } from 'react'
import ButtonsModal from '../../../Components/ButtonsModal';
import { InputForm } from '../../../Components/InputForm';
import InputCheckbox from '../../../Components/InputCheckbox';
import MySelect from '../../../Components/MySelect';
import LoadingPage from '../../LoadingPage';
import { GetSelectCidades, GetSelectUf } from '../../../Services/Cliente';
import { toast } from 'react-toastify';

function Form({ onSubmit, botaoEsquerdo, botaoDireito, cliqueEsquerdo, cliqueDireito, dadosEditar }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [email, setEmail] = useState("");
  const [uf, setUf] = useState({});
  const [cidade, setCidade] = useState({});
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const [ufSelect, setUfSelect] = useState([]);
  const [cidadesSelect, setCidadesSelect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSelects, setLoadingSelects] = useState(false);

  const getDadosForm = async (event) => {
    event.preventDefault();

    let inputData = {
      nome,
      telefone,
      cpf,
      isWhatsapp,
      email,
      uf: uf?.value,
      cidade: cidade?.value,
      bairro,
      rua,
      numero: parseInt(numero),
      complemento,
    }

    onSubmit(inputData);
  }

  const preencheFormEditar = async () => {
    console.log(dadosEditar);
    setNome(dadosEditar.nome || "");
    setTelefone(dadosEditar.telefone || "");
    setCpf(dadosEditar.cpf || "");
    setIsWhatsapp(dadosEditar.isWhatsapp || false);
    setEmail(dadosEditar.email || "");
    setBairro(dadosEditar.bairro || "");
    setRua(dadosEditar.rua || "");
    setNumero(dadosEditar.numero || "");
    setComplemento(dadosEditar.complemento || "");
  }

  const getSelectUf = async () => {
    setLoadingSelects(true);
    const response = await GetSelectUf();

    if (response.sucesso) {
      setUfSelect(response.data.map(uf => {
        return {
          value: uf.sigla,
          label: uf.nome,
          id: uf.id
        };
      }))
    }
    else toast.error(response.mensagem);
    setLoadingSelects(false);
  }

  const setUfGetCidades = async (ufValue) => {
    setLoadingSelects(true);
    setUf(ufValue);
    setCidade(null);
    setCidadesSelect([]);

    if (ufValue != null) {
      const response = await GetSelectCidades(ufValue.id);

      if (response.sucesso) {
        setCidadesSelect(response.data.map(cidade => {
          return {
            value: cidade.id,
            label: cidade.nome
          }
        }))
      }
      else toast.error(response.mensagem);
    }

    setLoadingSelects(false);
  }

  const mascaraTelefone = (value) => {
    if (!value)
      setTelefone("");

    value = value.replace(/\D/g, '')
    if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d)/, "($1) $2")
      value = value.replace(/(\d)(\d{4})$/, "$1-$2")

      setTelefone(value);
    }
  }

  const mascaraCpf = (value) => {
    if (!value)
      setCpf("");

    value = value.replace(/\D/g, '')

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3}).(\d{3})(\d)/, "$1.$2.$3");
      value = value.replace(/(\d{3}).(\d{3}).(\d{3})(\d)/, "$1.$2.$3-$4");

      setCpf(value);
    }
  }

  const iniciaPagina = async () => {
    await getSelectUf();

    if(dadosEditar)
      await preencheFormEditar();

    setLoading(false);
  }

  useEffect(() => { iniciaPagina() }, []);
  useEffect(() => {
    if(dadosEditar?.uf)
      setUfGetCidades(ufSelect.find(uf => uf.value === dadosEditar.uf));
    
  }, [ufSelect])
  useEffect(() => {
    if(dadosEditar?.cidade){
      setCidade(cidadesSelect.find(cidade => cidade.value === parseInt(dadosEditar.cidade)));
    }
  }, [cidadesSelect])

  if (loading)
    return <LoadingPage />

  return (
    <main className='w-full h-full p-4'>
      <form onSubmit={getDadosForm} className="flex flex-col gap-1">
        <InputForm
          inputId="nome"
          type="text"
          nome="Nome do cliente"
          placeholder="Insira o nome do cliente"
          value={nome}
          setValue={setNome}
          isRequired
        />

        <div className='grid grid-flow-row grid-rows-3 grid-cols-1 md:grid-flow-col md:grid-rows-1 md:grid-cols-5 md:gap-4'>
          <div className='col-span-2 grid grid-cols-5 md:grid-cols-2'>
            <div className='col-span-3 md:col-span-1'>
              <InputForm
                inputId="telefone"
                type="text"
                nome="Telefone"
                placeholder="(XX) XXXXX-XXXX"
                value={telefone}
                setValue={mascaraTelefone}
                isRequired
              />
            </div>

            <div className='grid content-end'>
              <InputCheckbox 
                id="isWhatsapp"
                label="Whatsapp"
                customClassName="flex items-center pl-3"
                checked={isWhatsapp}
                onChange={(value) => setIsWhatsapp(value)}
              />
            </div>
          </div>

          <InputForm
            inputId="cpf"
            type="text"
            nome="CPF"
            placeholder="000.000.000-00"
            value={cpf}
            setValue={mascaraCpf}
            isRequired
          />

          <div className='col-span-2'>
            <InputForm
              inputId="email"
              type="email"
              nome="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              setValue={setEmail}
            />
          </div>
        </div>

        <div className='grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 md:gap-4'>
          <MySelect
            inputId="uf"
            nome="UF"
            placeholder="Selecione"
            defaultOption={uf}
            value={uf}
            onChange={setUfGetCidades}
            opcoes={ufSelect}
            isLoading={loadingSelects}
            isRequired
            isSearchable
            isClearable
          />

          <MySelect
            inputId="cidade"
            nome="Cidade"
            placeholder="Selecione"
            defaultOption={cidade}
            value={cidade}
            onChange={setCidade}
            opcoes={cidadesSelect}
            isLoading={loadingSelects}
            isRequired
            isSearchable
            isClearable
          />

          <InputForm
            inputId="bairro"
            type="text"
            nome="Bairro"
            placeholder="Bairro"
            value={bairro}
            setValue={setBairro}
          />
        </div>

        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-3'>
            <InputForm
              inputId="rua"
              type="text"
              nome="Rua"
              placeholder="Rua"
              value={rua}
              setValue={setRua}
            />
          </div>

          <InputForm
            inputId="numero"
            type="text"
            nome="Numero"
            placeholder="Numero"
            value={numero}
            setValue={setNumero}
          />
        </div>

        <InputForm
          inputId="complemento"
          type="text"
          nome="Complemento"
          placeholder="Complemento"
          value={complemento}
          setValue={setComplemento}
        />

        <ButtonsModal
          textoBtnEsquerdo={botaoEsquerdo}
          textoBtnDireito={botaoDireito}
          onClickEsquerdo={cliqueEsquerdo}
          onClickDireito={cliqueDireito}
        />
      </form>
    </main>
  )
}

export default Form