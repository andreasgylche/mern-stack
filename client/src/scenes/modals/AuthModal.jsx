import React, { Fragment, useContext } from 'react'
import { AuthModalContext } from '../../App'
import { Dialog, Transition } from '@headlessui/react'
import Form from '../loginPage/Form'

export default function AuthModal() {
  const [isAuthOpen, setIsAuthOpen] = useContext(AuthModalContext)

  return (
    isAuthOpen && (
      <Transition appear show={isAuthOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsAuthOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900 bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg p-4 text-left align-middle shadow-xl transition-all bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Welcome to gametalk, hero!
                  </Dialog.Title>
                  <Dialog.Description className="text-sm opacity-40 mt-1">
                    Sign in or sign up to partake in the festivities.
                  </Dialog.Description>

                  <Form />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  )
}
