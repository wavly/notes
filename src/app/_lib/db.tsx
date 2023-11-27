"use client"

type Note = {
    id: number;
    title: string;
    content: string;
};

export class Auth {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    private get storage(): Storage {
        if (typeof window === 'undefined') {
            throw new Error('LocalStorage is not available on server-side');
        }
        return window.localStorage;
    }

    public checkAuth() {
        return this.storage.getItem(this.key);
    }

    public async createAuth(): Promise<void> {
        this.storage.setItem(this.key, Date.now().toString())
    }
    public async removeAuth(): Promise<void> {
        this.storage.removeItem(this.key);
    }
}

export class Notes {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    private get storage(): Storage {
        if (typeof window === 'undefined') {
            throw new Error('LocalStorage is not available on server-side');
        }
        return window.localStorage;
    }

    private getData(): Note[] {
        const data = this.storage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    private saveData(data: Note[]): void {
        this.storage.setItem(this.key, JSON.stringify(data));
    }

    public getNotes(): Note[] {
        return this.getData();
    }

    public createNote(note: Omit<Note, 'id'>): void {
        const notes = this.getNotes();
        const newNote = { ...note, id: Date.now() };
        this.saveData([...notes, newNote]);
    }

    public updateNote(updatedNote: Note): void {
        const notes = this.getNotes();
        this.saveData(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    }

    public deleteNote(noteId: number): void {
        const notes = this.getNotes();
        this.saveData(notes.filter(note => note.id !== noteId));
    }
}
