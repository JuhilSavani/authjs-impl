"use server"

const baseUrl = `http://localhost:3000`;

export async function getUserByEmail(email: string){
  try {
    const result = await fetch(`${baseUrl}/api/user/${email}`);
    const { message, user } = await result.json();
    if (result.ok) return { ok: true, message, user };
    return { ok: false, message, user };
  } catch (error) {
    console.error('[user.actions][Error fetching user by email]:', error);
    return { ok: false, message: error instanceof Error ? error.message : 'An error occurred while fetching the account detail', user: null };
  }
}

export async function updateUserPassword(email: string, newPassword: string) {
  try {
    const response = await fetch(`${baseUrl}/api/user/update/password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });
    const { message } = await response.json();
    if(response.ok) return { ok: true, message };
    return { ok: false, message };
  } catch (error) {
    console.error('[user.actions][Error in updating the password]:', error);
    return { ok: false, message: error instanceof Error ? error.message : 'Unexpected error occurred while updating the password!' };
  }
}