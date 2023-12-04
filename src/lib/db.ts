import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type NoteParams = {
	id: string;
	userId: string;
};

type CreateNoteParams = {
	userId: string;
	title?: string;
	content?: string;
};

type UpdateNoteParams = {
	id: string;
	userId: string;
	title?: string;
	content?: string;
};

export async function createNote({
	userId,
	title = "Untitled",
	content = "",
}: CreateNoteParams) {
	const { data, error } = await supabase
		.from("notes")
		.insert([{ user_id: userId, title, content }])
		.select("*")
		.single();

	if (error) {
		throw error;
	}

	return data;
}

export async function updateNote({
	id,
	userId,
	title,
	content,
}: UpdateNoteParams) {
	const updates: any = {};
	if (title !== undefined) updates.title = title;
	if (content !== undefined) updates.content = content;

	const { data, error } = await supabase
		.from("notes")
		.update(updates)
		.match({ id: id, user_id: userId });

	if (error) {
		throw error;
	}

	return data;
}

export async function deleteNote({ id, userId }: NoteParams) {
	const { data, error } = await supabase
		.from("notes")
		.delete()
		.match({ id: id, user_id: userId });

	if (error) {
		throw error;
	}

	return data;
}

export async function getNote({ id, userId }: NoteParams) {
	const { data, error } = await supabase
		.from("notes")
		.select("*")
		.match({ id: id, user_id: userId });

	if (error) {
		throw error;
	}

	return data;
}

export async function getNotesByUser(userId: string) {
	const { data, error } = await supabase
		.from("notes")
		.select("*")
		.eq("user_id", userId);

	if (error) {
		throw error;
	}

	return data;
}

