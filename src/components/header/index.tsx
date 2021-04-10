import classNames from "classnames";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type MenuItemProps = {
  title: string;
  link: string;
};

const MENU_ITEMS: MenuItemProps[] = [
  {
    title: "Main",
    link: "main-page",
  },
  {
    title: "Tasks",
    link: "tasks-page",
  },
  {
    title: "Settings",
    link: "settings-page",
  },
];

const SUB_MENU_ITEMS = [
  {
    title: "Notifications",
  },
  {
    title: "Sign out",
  },
];

export const HeaderComponent = (): JSX.Element => {
  const router = useRouter();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const defaultStyle = "text-gray-300 hover:bg-gray-700 hover:text-white";
  const selectedStyle = "bg-gray-900 text-white";

  return (
    <nav className="bg-gray-800 w-screen fixed top-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* モバイルメニューボタン */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-gray-50 font-extrabold text-2xl">Tasker</h1>
            </div>
            {/* メインメニュー */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {MENU_ITEMS.map((item) => (
                  <Link href={`/${item.link}`}>
                    <a
                      className={classNames(
                        "px-3 py-2 rounded-md text-sm font-medium",
                        router.pathname === `/${item.title.toLowerCase()}`
                          ? selectedStyle
                          : defaultStyle
                      )}
                    >
                      {item.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                {/* クリックでサブメニュー切り替え */}
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
              {/* サブメニュー */}
              <div
                className={classNames(
                  "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",
                  !isSubMenuOpen && "hidden"
                )}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                {SUB_MENU_ITEMS.map((item) => (
                  <Link href="#">
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {item.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* モバイルのメインメニュー画面 */}
      <div
        className={classNames("sm:hidden", !isMenuOpen && "hidden")}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {MENU_ITEMS.map((item) => (
            <Link href={`/${item.link}`}>
              <a
                className={classNames(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  router.pathname === `/${item.title.toLowerCase()}`
                    ? selectedStyle
                    : defaultStyle
                )}
              >
                {item.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
