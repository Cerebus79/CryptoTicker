import { useStore } from "../../stores/store";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import blankAvatar from '../../assets/images/blank_avatar.jpg'
import { Link } from "react-router-dom";



function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileMenu() {

    const loginUrl = '/login';
    const signoutUrl = '/signout';

    const { userStore } = useStore();

    return (

        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="h-8 w-8 rounded-full"
                        src={
                            userStore.IsLoggedIn ? userStore.user?.image : blankAvatar
                        }
                        alt=""
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
                {userStore.IsLoggedIn ? (
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={"/profile"}
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    
                                >
                                    Your Profile
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={"/settings"}
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Settings
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={signoutUrl}
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Sign out
                                </Link>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                ) : (
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <Link  
                                    to={loginUrl}
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Login / Register
                                </Link>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                )}
            </Transition>
        </Menu>


    )
}