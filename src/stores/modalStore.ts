import { makeAutoObservable } from "mobx";

interface Modal {
    open: boolean;
    title: JSX.Element | null;
    body: JSX.Element | null;
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        title: null,
        body: null
    };

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (title: JSX.Element, content: JSX.Element) => {
        this.modal.open = true;
        this.modal.title = title;
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.title = null;
        this.modal.body = null;
    }
}