import React, { useEffect, useState } from 'react'
import ButtonsModal from '../../../Components/ButtonsModal';
import { InputForm } from '../../../Components/InputForm';
import MySelect from '../../../Components/MySelect';
import { GetClientes, GetHorarios } from '../../../Services/Agendamento';
import LoadingPage from '../../LoadingPage';
import InputArea from '../../../Components/InputArea';

function Form({ onSubmit, botaoEsquerdo, botaoDireito, cliqueEsquerdo, cliqueDireito, dadosEditar }) {
  const [clienteSelecionado, setClienteSelecionado] = useState();
  const [dataAgendada, setDataAgendada] = useState("");
  const [horaAgendada, setHoraAgendada] = useState();

  const [clientes, setClientes] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDadosForm = async (event) => {
    event.preventDefault();

    const dadosModal = {
      clienteId: clienteSelecionado?.value,
      dataAgendada: dataAgendada + "T" + horaAgendada?.value
    }

    let salvoComSucesso = await onSubmit(dadosModal);
    if (salvoComSucesso) {
      setClienteSelecionado();
      setDataAgendada("");
      setHoraAgendada();
    }
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

  const carregaHorarios = async (data) => {
    const response = await GetHorarios(data);
    setHorarios([]);
    setHoraAgendada(null);

    if (response.sucesso) {
      let horariosTemp = response.data.map(data => {
        return {
          value: data.split("T")[1],
          label: data.split("T")[1].split(":").slice(0, 2).join(":")
        }
      });
      setHorarios(horariosTemp);
      return horariosTemp;
    }

    return false;
  }

  const iniciaModal = async () => {
    let clientes = await getSelectClientes();

    if (dadosEditar) {
      let horariosDisponiveis = await carregaHorarios(dadosEditar.dataAgendada.split("T")[0]);
      let horarioIndex = horariosDisponiveis.findIndex(horario => horario.value == dadosEditar.dataAgendada.split("T")[0]);
      let horarioAgendado = {
        value: dadosEditar.dataAgendada.split("T")[1],
        label: dadosEditar.dataAgendada.split("T")[1].split(":").slice(0, 2).join(":")
      }
      horariosDisponiveis.splice(horarioIndex, 0, horarioAgendado);

      setClienteSelecionado(clientes?.find(cliente => cliente.value === dadosEditar.clienteId));
      setDataAgendada(dadosEditar.dataAgendada.split("T")[0]);
      setHoraAgendada(horarioAgendado);
    }

    setLoading(false);
  }

  useEffect(() => { iniciaModal() }, []);

  if (loading)
    return <LoadingPage />

  return (
    <main className='w-full h-full p-4'>
      <form onSubmit={getDadosForm} className="flex flex-col gap-1">
        <InputArea>
          <MySelect
            isDisabled={loading}
            isLoading={loading}
            isClearable={false}
            isSearchable={true}
            isRequired={true}
            nome="Cliente"
            placeholder="Selecione um cliente"
            opcoes={clientes}
            value={clienteSelecionado}
            onChange={setClienteSelecionado}
          />

          <div className='grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 md:gap-1'>
            <InputForm
              inputId="dataAgendada"
              type="date"
              nome="Data agendada"
              value={dataAgendada}
              setValue={(value) => {
                carregaHorarios(value);
                setDataAgendada(value);
              }}
              isRequired
            />

            <MySelect
              isDisabled={loading}
              isLoading={loading}
              isClearable={true}
              isSearchable={true}
              isRequired={true}
              nome="Horario"
              placeholder="Selecione um horario"
              opcoes={horarios}
              value={horaAgendada}
              onChange={setHoraAgendada}
            />
          </div>
        </InputArea>

        <ButtonsModal
          textoBtnEsquerdo={botaoEsquerdo}
          textoBtnDireito={botaoDireito}
          onClickEsquerdo={cliqueEsquerdo}
          onClickDireito={cliqueDireito}
        />
      </form>
    </main >
  )
}

export default Form;