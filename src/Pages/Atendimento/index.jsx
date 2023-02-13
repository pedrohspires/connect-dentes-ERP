import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { GetAtendimentoById, GetAtendimentos, NovoAtendimento, EditarAtendimento, DeletarAtendimento } from '../../Services/Atendimento';
import Form from './Form';
import Table from "../../Components/Table";
import Button from '../../Components/Button';
import ModalHeader from '../../Components/ModalHeader';
import AcoesDropdownMenu from '../../Components/AcoesDropdownMenu';
import ButtonsModal from '../../Components/ButtonsModal';
import { GetAcessos } from '../../Services/Auth';

function Atendimento() {
  const [dataTable, setDataTable] = useState([]);
  const [acessos, setAcessos] = useState();
  const [dadosEditar, setDadosEditar] = useState(undefined);
  const [idEditando, setIdEditando] = useState(undefined);
  const [idExcluindo, setIdExcluindo] = useState(undefined);
  const [dadosExcluindo, setDadosExcluindo] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const customModalStyle = {
    content: {
      width: '80%',
      backgroundColor: "#cbdad5",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '0px',
      marginRight: '-50%',
      borderRadius: '10px',
      transform: 'translate(-50%, -50%)'
    },
    overlay: {
      zIndex: 100
    }
  }

  const customModalDeleteStyle = {
    content: {
      width: '50%',
      backgroundColor: "#cbdad5",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '0px',
      marginRight: '-50%',
      borderRadius: '10px',
      transform: 'translate(-50%, -50%)'
    },
    overlay: {
      zIndex: 100
    }
  }

  const getDataTable = async () => {
    const response = await GetAtendimentos();
    setDataTable([]);

    if (response.sucesso)
      setDataTable(response.data);
    else {
      toast.error(response.mensagem);
      setDataTable([]);
    }
  }

  const carregaAcessos = async () => {
    const response = await GetAcessos("atendimento");
    
    if(response.sucesso){
      setAcessos({
        listar: response.data.includes("listar"),
        cadastrar: response.data.includes("cadastrar"),
        editar: response.data.includes("editar"),
        excluir: response.data.includes("excluir")
      });
    }else toast.error(response.mensagem);
  }

  const iniciaPagina = async () => {
    await getDataTable();
    await carregaAcessos();
  }

  const getDadosEditar = async (id) => {
    const response = await GetAtendimentoById(id)

    if (response.sucesso) {
      setDadosEditar(response.data);
      setModalOpen(true);
      setIdEditando(id);
    } else {
      toast.error(response.mensagem);
      setIdEditando(undefined);
    }
  }

  const adicionaAtendimento = (event) => {
    event.preventDefault();

    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setDadosEditar(undefined);
    setIdEditando(undefined);
  }

  const salvar = async (dados) => {
    const response = dadosEditar ? await EditarAtendimento(dados, idEditando) : await NovoAtendimento(dados);

    if (response.sucesso) {
      getDataTable();
      toast.success(`${dadosEditar ? "Editado" : "Adicionado"} com sucesso!`);
      setModalOpen(false);
      setDadosEditar(undefined);
      setIdEditando(undefined);
      return true;
    }

    toast.error(response.mensagem);
    return false;
  }

  const excluir = async () => {
    const response = await DeletarAtendimento(idExcluindo);

    if (response.sucesso) {
      toast.success("Excluído com sucesso!");
      getDataTable();
    }else{
      toast.error(response.mensagem);
    }
    
    closeModalDelete();
  }

  const closeModalDelete = () => {
    setDadosExcluindo(undefined);
    setIdExcluindo(undefined);
    setModalDeleteOpen(false);
  }

  useEffect(() => { iniciaPagina() }, [])

  return (
    <div className="h-screen p-5 flex flex-col gap-4">
      <div className="flex justify-end">
        { acessos?.cadastrar &&
          <Button
            texto="Adicionar"
            onClick={adicionaAtendimento}
          />
        }
      </div>

      <Table
        rows={dataTable}
        columnsHeaders={[
          {titulo: "Id", ordenavel: true, columnName: "id"},
          {titulo: "Paciente", ordenavel: true, columnName: "clienteId"}, 
          {titulo: "Medico responsável", ordenavel: true, columnName: "medico"}, 
          {titulo: "Detalhes", ordenavel: true, columnName: "detalhes"}, 
          {titulo: "Ações",  ordenavel: false, columnName: "acoes"}
        ]}
        columns={{
          id: (value) => value,
          cliente: (value) => value.nome,
          medico: (value) => value.nome,
          detalhes: (value) => value,
          acoes: (row) => {
            let itens = [
              {
                texto: "Editar",
                acao: () => getDadosEditar(row.id),
                icone: <AiOutlineEdit />
              },
              {
                texto: "Excluir",
                acao: (rowData) => {
                  setIdExcluindo(rowData.id);
                  setDadosExcluindo(rowData);
                  setModalDeleteOpen(true);
                },
                icone: <AiOutlineDelete />
              }
            ]

            return <AcoesDropdownMenu rowData={row} itens={itens} />
          }
        }}
      />

      <Modal isOpen={modalOpen} onRequestClose={closeModal} style={customModalStyle}>
        <ModalHeader
          title="Atendimento"
          tag="Novo"
          onRequestClose={closeModal}
        />

        <Form
          botaoEsquerdo="Cancelar"
          botaoDireito="Salvar"
          cliqueEsquerdo={closeModal}
          onSubmit={salvar}
          dadosEditar={dadosEditar}
        />
      </Modal>

      <Modal isOpen={modalDeleteOpen} onRequestClose={closeModalDelete} style={customModalDeleteStyle}>
        <ModalHeader
          title="Excluir atendimento"
          tag={idEditando}
          onRequestClose={closeModal}
        />

        <main className='p-4'>
          Deseja deletar o atendimento <b>#{idExcluindo} - {dadosExcluindo?.detalhes}
          </b> do(a) paciente <b>{dadosExcluindo?.nomePaciente}</b>?
        
          <ButtonsModal
            textoBtnEsquerdo={"Cancelar"}
            textoBtnDireito={"Confirmar"}
            onClickEsquerdo={closeModalDelete}
            onClickDireito={excluir}
          />
        </main>

      </Modal>
    </div>
  )
}

export default Atendimento