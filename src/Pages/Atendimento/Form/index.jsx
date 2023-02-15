import React, { useEffect, useState } from 'react'
import ButtonsModal from '../../../Components/ButtonsModal';
import { InputForm, InputTextAreaForm } from '../../../Components/InputForm';
import arcadaDentaria from '../../../Assets/Imagens/arcada-dentaria.png';
import InputCheckbox from '../../../Components/InputCheckbox';
import MySelect from '../../../Components/MySelect';
import { GetAgendamentos, GetClientes } from '../../../Services/Atendimento';
import { toast } from 'react-toastify';
import SwitchOptions from '../../../Components/SwitchOptions';
import InputLoading from '../../../Components/InputLoading';

function Form({ onSubmit, botaoEsquerdo, botaoDireito, cliqueEsquerdo, cliqueDireito, dadosEditar }) {
  const [clienteSelecionado, setClienteSelecionado] = useState();
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState();
  const [nomePaciente, setNomePaciente] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [dentes, setDentes] = useState([]);
  const [dataAtendimento, setDataAtendimento] = useState("");
  const [dataRetorno, setDataRetorno] = useState("");

  const [clientes, setClientes] = useState();
  const [agendamentos, setAgendamentos] = useState();
  const [isClienteSelect, setIsClienteSelect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSelects, setLoadingSelects] = useState(true);

  const getDadosForm = async (event) => {
    event.preventDefault();

    if (dentes.length > 0) {
      var dentesString = dentes
        .map((item, key) => item ? key + 1 : undefined)
        .filter(valor => valor)
      if (dentesString.length > 0)
        dentesString = dentesString.reduce((acumulador, valorAtual) => acumulador + ";" + valorAtual)
      else dentesString = "";

      dentesString = String(dentesString);
    }

    const dadosModal = {
      clienteId: clienteSelecionado?.value,
      agendamentoId: agendamentoSelecionado?.value,
      nomePaciente,
      detalhes,
      observacoes,
      dentes: dentesString,
      dataAtendimento,
      dataRetorno
    }

    let salvoComSucesso = await onSubmit(dadosModal);
    if (salvoComSucesso) {
      setClienteSelecionado(undefined);
      setAgendamentoSelecionado(undefined);
      setNomePaciente("");
      setDetalhes("");
      setObservacoes("");
      setDataAtendimento("");
      setDataRetorno("");
      iniciaDentes();
    }
  }

  const iniciaDentes = () => {
    let dentesTemp = [];
    let dentesEditar = dadosEditar?.dentes?.split(";");

    for (let i = 0; i < 32; i++)
      dentesTemp.push(false);

    if (dentesEditar)
      dentesEditar.forEach(denteCheck => dentesTemp[denteCheck - 1] = true);

    setDentes(dentesTemp);
  }

  const setDentesOnChange = (value, label) => {
    let novoDenteMarcado = dentes;

    novoDenteMarcado[label - 1] = value;
    setDentes([...novoDenteMarcado]);
  }

  const getSelectClientes = async () => {
    const response = await GetClientes();

    if (response.sucesso) {
      const options = response.data.map(item => ({
        value: item.id,
        label: item.nome
      }));

      setClientes(options)
      return options;
    }

    toast.error("Erro ao carregar os clientes: " + response.mensagem);
    return false;
  }

  const getSelectAgendamento = async () => {
    const response = await GetAgendamentos();

    if (response.sucesso) {
      const options = response.data.map(item => ({
        value: item.id,
        label: item.nomeCliente + " - " + item.status
      }));

      setAgendamentos(options)
      return options;
    }

    toast.error("Erro ao carregar os clientes: " + response.mensagem);
    return false;
  }

  const iniciaModal = async () => {
    iniciaDentes();

    if (dadosEditar) {
      if(!dadosEditar.agendamentoId)
        setIsClienteSelect(true);
      setDetalhes(dadosEditar.detalhes || '');
      setObservacoes(dadosEditar.observacoes || '');
      setDataAtendimento(dadosEditar.dataAtendimento?.split('T')[0] || '');
      setDataRetorno(dadosEditar.dataRetorno?.split('T')[0] || '');
      iniciaDentes(dadosEditar.dentes);
    }
    setLoading(false);
  }

  const switchModified = async () => {
    setLoadingSelects(true);
    setClienteSelecionado(undefined);
    setAgendamentoSelecionado(undefined);

    if(isClienteSelect){
      setClientes([]);
      let clientes = await getSelectClientes();
      if(dadosEditar)
        setClienteSelecionado(clientes?.find(cliente => cliente.value === dadosEditar.clienteId));
    }
    else{
      setAgendamentos([]);
      let agendamentos = await getSelectAgendamento();
      if(dadosEditar && dadosEditar.agendamentoId)
        setAgendamentoSelecionado(agendamentos?.find(agendamento => agendamento.value === dadosEditar.agendamentoId));
    }

    setLoadingSelects(false);
  }

  useEffect(() => iniciaModal, []);
  useEffect(() => {switchModified()}, [isClienteSelect]);

  if (loading)
    return <>Carregando</>

  return (
    <main className='w-full h-full p-4'>
      <form onSubmit={getDadosForm} className="flex flex-col gap-1">
        <div className='grid grid-cols-3 xl:grid-cols-5 relative'>
          <SwitchOptions enabled={isClienteSelect} setEnabled={setIsClienteSelect} textoEsquerdo="Agendamento" textoDireito="Cliente" />

          <div className='col-span-2 xl:col-span-4'>
            {!loadingSelects ?
              <>
                {isClienteSelect
                  ?
                  <MySelect
                    isDisabled={loading}
                    isLoading={loading}
                    isClearable={false}
                    isSearchable={true}
                    isRequired={true}
                    value={clienteSelecionado}
                    nome="Cliente"
                    placeholder="Selecione um cliente"
                    opcoes={clientes}
                    onChange={setClienteSelecionado}
                  />
                  :
                  <MySelect
                    isDisabled={loading}
                    isLoading={loading}
                    isClearable={false}
                    isSearchable={true}
                    isRequired={true}
                    value={agendamentoSelecionado}
                    nome="Cliente agendado"
                    placeholder="Selecione um cliente com agendamento"
                    opcoes={agendamentos}
                    onChange={setAgendamentoSelecionado}
                  />
                }
              </>
              :
              <InputLoading />
            }
          </div>
        </div>

        <InputTextAreaForm
          inputId="detalhes"
          type="text"
          nome="Detalhes"
          placeholder="Detalhes da consulta"
          value={detalhes}
          setValue={setDetalhes}
          isRequired
        />

        <InputTextAreaForm
          inputId="observacoes"
          nome="Observações"
          placeholder="Observações"
          value={observacoes}
          setValue={setObservacoes}
        />

        <div className='grid grid-cols-3 justify-items-stretch gap-4'>
          <div>
            <InputForm
              inputId="dataAtendimento"
              type="date"
              nome="Data atendimento"
              value={dataAtendimento}
              setValue={setDataAtendimento}
              isRequired
            />
            <InputForm
              inputId="dataRetorno"
              type="date"
              nome="Data retorno"
              value={dataRetorno}
              setValue={setDataRetorno}
            />
          </div>
          <div>
            <div className='font-bold'>Dentes</div>
            <div className='grid grid-cols-4 justify-self-center'>
              {dentes.map((dente, key) =>
                <InputCheckbox
                  key={key + 1}
                  label={key + 1}
                  checked={dente}
                  onChange={setDentesOnChange}
                />
              )}
            </div>
          </div>
          <img src={arcadaDentaria} className="w-36 justify-self-center" alt="" />
        </div>

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