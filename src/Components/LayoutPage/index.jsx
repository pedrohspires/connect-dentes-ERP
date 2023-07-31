import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getItensMenu } from '../../Services/Menu';
import { GetUsuarioLogado } from '../../Services/Auth';

import { IoExitOutline } from 'react-icons/io5';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import * as icons from 'react-icons/all';
import SwitchDefault from '../SwitchDefault';

function LayoutPage() {
  const navigate = useNavigate();
  const [itensMenu, setItensMenu] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.theme === 'dark');
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

  const handleTheme = () => {
    if(!isDarkMode)
      localStorage.theme = 'dark'
    else
      localStorage.theme = 'light'
    
    setIsDarkMode(!isDarkMode);
  }

  const loadTheme = () => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => { verificaUsuarioLogado() }, []);
  useEffect(() => { carregaItensMenu() }, []);
  useEffect(loadTheme, [isDarkMode]);

  return (
    <>
      <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2">
            {itensMenu.map((item, key) => (
              <Link
                key={key}
                to={item.link}
                className='flex w-full items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'
              >
                <span className='px-2'>{icons[item.reactIcon]()}</span>
                {item.nome}
              </Link>
            ))}
          </ul>

          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <div className="flex w-full items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                {isDarkMode ? <MdOutlineNightlight /> : <MdOutlineLightMode />}
                <span className="ml-4"><SwitchDefault id="dark-mode-switch" text="Dark Mode" onChange={handleTheme} checked={isDarkMode} /></span>
              </div>
            </li>
            <li>
              <button onClick={handleSair} className="flex w-full items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                <IoExitOutline />
                <span className="ml-4">Sair</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 bg-gray-200">
        <Outlet />
      </div>
    </>
  )
}

export default LayoutPage