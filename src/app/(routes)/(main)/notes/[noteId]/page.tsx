"use client";

import { Notes } from "@/app/_lib/db";
import Editor from "@/app/_components/editor";

import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";

interface NoteIdPageProps {
	params: {
		noteId: string;
	};
}

type Note = {
	id: number;
	title: string;
	content: string;
};

const NoteIdPage = ({ params }: NoteIdPageProps) => {
	const router = useRouter();
	const [note, setNote] = useState<Note>();
	const [title, setTitle] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	const NoteDb = new Notes("note");

	useEffect(() => {
		const fetchedNote = NoteDb.getNoteById(parseInt(params.noteId));

		if (fetchedNote === null) {
			router.push("/note");
		}

		setIsLoading(false);
		setNote(fetchedNote);
		setTitle(fetchedNote.title);
	}, []);

	const handleContentChange = (content: string) => {
		if (typeof note !== "undefined") {
			const newNote = {
				id: Number(params.noteId),
				title: title,
				content,
			};
			// Save in local storage
			NoteDb.updateNote(newNote);
			// Update local state also
			setNote(newNote);
		}
	};

	function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		setTitle(value);
		if (note === undefined) return;
		const newNote = {
			id: Number(params.noteId),
			title: value, // Only title is updated
			content: note.content,
		};

		// Save in the local storage
		NoteDb.updateNote(newNote);
		// Update the local state also
		setNote(newNote);
	}

	return (
		<>
			<div className="p-5 flex text-center justify-center ">
				<input
					className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
					type="text"
					value={title}
					onChange={(e) => handleTitleChange(e)}
				/>
			</div>
			<div className="pt-20">
				<div className="md:max-w-3xl lg:max-w-4xl mx-auto">
					{!isLoading && note ? (
						<Editor
							onChange={handleContentChange}
							initialContent={note.content}
						/>
					) : (
						<div className="flex text-center items-center justify-center">
							loading...
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default NoteIdPage;
