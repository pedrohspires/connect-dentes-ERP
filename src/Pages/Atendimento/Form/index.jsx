import React, { useEffect, useState } from 'react'
import ButtonsModal from '../../../Components/ButtonsModal';
import { InputForm, InputTextAreaForm } from '../../../Components/InputForm';
import arcadaDentaria from '../../../Assets/Imagens/arcada-dentaria.png';
import InputCheckbox from '../../../Components/InputCheckbox';
import MySelect from '../../../Components/MySelect';
import { GetMedicos } from '../../../Services/Atendimento';

function Form({ onSubmit, botaoEsquerdo, botaoDireito, cliqueEsquerdo, cliqueDireito, dadosEditar }) {
  const [medicoSelecionado, setMedicoSelecionado] = useState({});
  const [nomePaciente, setNomePaciente] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [dentes, setDentes] = useState([]);
  const [dataAtendimento, setDataAtendimento] = useState("");
  const [dataRetorno, setDataRetorno] = useState("");

  const [medicos, setMedicos] = useState(false);
  const [loading, setLoading] = useState(true);

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
      medicoId: medicoSelecionado.value,
      nomePaciente,
      detalhes,
      observacoes,
      dentes: dentesString,
      dataAtendimento,
      dataRetorno
    }

    let salvoComSucesso = await onSubmit(dadosModal);
    if(salvoComSucesso){
      setMedicoSelecionado({});
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

    if(dentesEditar)
      dentesEditar.forEach(denteCheck => dentesTemp[denteCheck - 1] = true);

    setDentes(dentesTemp);
  }

  const setDentesOnChange = (value, label) => {
    let novoDenteMarcado = dentes;

    novoDenteMarcado[label - 1] = value;
    setDentes([...novoDenteMarcado]);
  }

  const getSelectMedicos = async () => {
    const response = await GetMedicos();

    if (response.sucesso) {
      const options = response.data.map(item => ({
        value: item.id,
        label: item.nome
      }));

      setMedicos(options)
      return options;
    }

    return false;
  }

  const iniciaModal = async () => {
    iniciaDentes();
    let medicos = await getSelectMedicos();

    if (dadosEditar) {
      setMedicoSelecionado(medicos?.find(medico => medico.value === dadosEditar.medicoId))
      setNomePaciente(dadosEditar.nomePaciente || '');
      setDetalhes(dadosEditar.detalhes || '');
      setObservacoes(dadosEditar.observacoes || '');
      setDataAtendimento(dadosEditar.dataAtendimento?.split('T')[0] || '');
      setDataRetorno(dadosEditar.dataRetorno?.split('T')[0] || '');
      iniciaDentes(dadosEditar.dentes);
    }
    setLoading(false);
  }

  useEffect(() => iniciaModal, []);

  if (loading)
    return <>Carregando</>

  return (
    <main className='w-full h-full p-4'>
      <form onSubmit={getDadosForm} className="flex flex-col gap-1">
        <MySelect
          isDisabled={loading}
          isLoading={loading}
          isClearable={false}
          isSearchable={true}
          isRequired={true}
          opcaoDefault={medicos?.find(medico => medico.value === dadosEditar?.medicoId)}
          nome="Médico"
          placeholder="Selecione um médico"
          opcoes={medicos}
          onChange={setMedicoSelecionado}
        />

        <InputForm
          inputId="nomePaciente"
          type="text"
          nome="Nome do Paciente"
          placeholder="Insira o nome do paciente"
          value={nomePaciente}
          setValue={setNomePaciente}
          isRequired
        />

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