import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getItensMenu } from '../../Services/Menu';
import { GetUsuarioLogado } from '../../Services/Auth';

import { GrFormClose } from 'react-icons/gr';
import { HiMenuAlt2 } from 'react-icons/hi';
import * as icons from 'react-icons/all';
import { Dialog, Menu, Transition } from '@headlessui/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import logo from '../../Assets/Imagens/logo.png';

function LayoutPage() {
  const navigate = useNavigate();
  const [itensMenu, setItensMenu] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  const verificaUsuarioLogado = async () => {
    const token = localStorage.getItem("@token");
    const response = await GetUsuarioLogado();

    if (!token || !response.sucesso) {
      toast.error("Permissão negada! Realize login.");
      navigate("/login");
    }

    setUsuarioLogado(response.data);
  }

  const carregaItensMenu = async () => {
    const response = await getItensMenu();
    if (response.sucesso)
      setItensMenu(response.data);
    else
      toast.error(response.mensagem);
  }

  const handleSair = () => {
    localStorage.removeItem("@token");
    navigate("/login");
  }

  useEffect(() => { verificaUsuarioLogado() }, []);
  useEffect(() => { carregaItensMenu() }, []);
  
  return (
    <>
      <Transition.Root show={menuOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40" onClose={setMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-paleta-900">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <GrFormClose className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4 pt-4">
                <div className='flex flex-row items-end flex-wrap'>
                  <img
                    className="h-16"
                    src={logo}
                    alt="Workflow"
                  />
                </div>
                {/* <p className='text-white text-2xl font-bold'>CompSys</p> */}
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-hidden">
                <ScrollArea.Root>
                  <ScrollArea.Viewport >
                    <nav className="px-2 space-y-1">
                      {itensMenu.map((item, key) => (
                        <Link
                          key={key}
                          to={item.link}
                          className='text-gray-300 hover:bg-paleta-500 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        >
                          {icons[item.reactIcon]()}
                          {item.nome}
                        </Link>
                      ))}
                    </nav>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar orientation="horizontal">
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner />
                </ScrollArea.Root>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      <div className={`flex flex-col ${menuOpen ? "md:pl-80" : ''}`}>
        <div className="sticky top-0 z-40 flex-shrink-0 flex h-16 bg-paleta-900 shadow">
          <button
            type="button"
            className={`${menuOpen ? 'hidden' : ''} px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <HiMenuAlt2 className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs px-4 py-2 bg-paleta-100 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Abrir menu</span>
                    <h1 className='mr-4 font-semibold text-paleta-900'>{usuarioLogado.nome}</h1>
                    <img
                      className="object-contain h-8 w-8 rounded-full"
                      src={"./user.png"}
                      alt={"usuário"}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-paleta-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {() => (
                        <div
                          onClick={() => handleSair()}
                          className='block px-4 py-2 text-sm text-paleta-100 cursor-pointer'
                        >
                          Sair
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="flex-1 bg-paleta-100">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default LayoutPage