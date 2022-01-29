import { Dialog, Transition } from '@headlessui/react';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { useStore } from '../../../stores/store';

function ModalContainer() {
    const { modalStore } = useStore();

    return (
        <Transition
            appear
            show={modalStore.modal.open}
            as={Fragment}    
        >
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={modalStore.closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity=0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle
                                        transition-all transform bg-white shadow-xl rounded-2xl"
                        >
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                {modalStore.modal.title}
                            </Dialog.Title>
                            {modalStore.modal.body}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default observer(ModalContainer);