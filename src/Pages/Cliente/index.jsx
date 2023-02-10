import Modal from 'react-modal';
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { DeletarCliente, EditarCliente, GetClientes, NovoCliente } from "../../Services/Cliente";
import { GetAcessos } from "../../Services/Auth";
import { AiOutlineEdit, AiOutlineDelete, AiFillCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import LoadingPage from "../LoadingPage";
import Button from "../../Components/Button";
import Table from "../../Components/Table";
import AcoesDropdownMenu from '../../Components/AcoesDropdownMenu';
import ModalHeader from '../../Components/ModalHeader';
import ButtonsModal from '../../Components/ButtonsModal';
import Form from './Form';


function Cliente() {
  const [loading, setLoading] = useState(true);
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

  const carregaAcessos = async () => {
    const response = await GetAcessos("atendimento");

    if (response.sucesso) {
      setAcessos({
        listar: response.data.includes("listar"),
        cadastrar: response.data.includes("cadastrar"),
        editar: response.data.includes("editar"),
        excluir: response.data.includes("excluir")
      });
    } else toast.error(response.mensagem);
  }

  const getDataTable = async () => {
    const response = await GetClientes();

    if (response.sucesso)
      setDataTable(response.data);
    else {
      toast.error(response.mensagem);
      setDataTable([]);
    }
  }

  const iniciaPagina = async () => {
    await carregaAcessos();
    await getDataTable();
    setLoading(false);
  }

  const closeModal = () => {
    setModalOpen(false);
    setDadosEditar(undefined);
    setIdEditando(undefined);
  }

  const closeModalDelete = () => {
    setDadosExcluindo(undefined);
    setIdExcluindo(undefined);
    setModalDeleteOpen(false);
  }

  const adicionaCliente = (event) => {
    event.preventDefault();

    setModalOpen(true);
  }

  const editaCliente = (rowData) => {
    setIdEditando(rowData.id);
    setDadosEditar(rowData);
    setModalOpen(true);
  }

  const salvar = async (dados) => {
    const response = dadosEditar ? await EditarCliente(dados, idEditando) : await NovoCliente(dados);

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
    const response = await DeletarCliente(idExcluindo);

    if (response.sucesso) {
      toast.success("Excluído com sucesso!");
      getDataTable();
    } else {
      toast.error(response.mensagem);
    }

    closeModalDelete();
  }

  useEffect(() => { iniciaPagina() }, []);

  if (loading)
    return <LoadingPage />

  return (
    <div className="h-screen p-5 flex flex-col gap-4">
      <div className="flex justify-end">
        {acessos?.cadastrar &&
          <Button
            texto="Adicionar"
            onClick={adicionaCliente}
          />
        }
      </div>

      <Table
        rows={dataTable}
        columnsHeaders={[
          { titulo: "Id", ordenavel: true, columnName: "id" },
          { titulo: "Nome", ordenavel: true, columnName: "nome" },
          { titulo: "Telefone", ordenavel: true, columnName: "telefone" },
          { titulo: "Whatsapp", ordenavel: false, columnName: "isWhatsapp" },
          { titulo: "CPF", ordenavel: true, columnName: "cpf" },
          { titulo: "E-mail", ordenavel: true, columnName: "email" },
          { titulo: "Ações", ordenavel: false, columnName: "acoes" },
        ]}
        columns={{
          id: (value) => value,
          nome: (value) => value,
          telefone: (value) => {
            if (!value) return ""
            value = value.replace(/\D/g, '')
            value = value.replace(/(\d{2})(\d)/, "($1) $2")
            value = value.replace(/(\d)(\d{4})$/, "$1-$2")
            return value
          },
          isWhatsapp: (value) => {
            return (
              <div className="w-full grid place-items-center">
                {value ?
                  <AiFillCheckCircle className="fill-green-500" size={18} />
                  :
                  <AiOutlineCloseCircle className="fill-red-500" size={18} />}
              </div>
            )
          },
          cpf: (value) => {
            if (!value) return ""
            value = value.replace(/\D/g, '')
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
            return value;
          },
          email: (value) => value,
          acoes: (row) => {
            let itens = [
              {
                texto: "Editar",
                acao: editaCliente,
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
          title="Cliente"
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
          Deseja deletar o cliente <b>#{idExcluindo} - {dadosExcluindo?.nome}
          </b>?

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

export default Cliente