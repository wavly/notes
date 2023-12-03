"use server"
import { getUser } from "@/lib/auth";
import { redirect } from  "next/navigation";

export async function getUserId() {
	const { isAuthenticated, user } = await getUser();

	if (!isAuthenticated || !user) {
		redirect("/");
	}

	return user.id;
}
