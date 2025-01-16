"use server"

const baseUrl = `http://localhost:3000`;

export async function getUserByEmail(email: string){
  try {
    const response = await fetch(`${baseUrl}/api/user/${email}`);
    const { message, user } = await response.json();
    if (response.ok) return { ok: true, message, user };
    return { ok: false, message, user };
  } catch (error) {
    console.error('[user.actions][Error fetching user by email]:', error);
    return { ok: false, message: error instanceof Error ? error.message : 'An error occurred while fetching the account detail', user: null };
  }
}

export async function saveUserDetails(data: { 
  firstName: string, 
  lastName: string, 
  email: string, 
  isVerified: boolean, 
  provider: "google" | "github" 
}) {
  try {
    const response = await fetch(`${baseUrl}/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const { message } = await response.json();
    if (response.ok) return { ok: true, message };
    return { ok: false, message };
  } catch (error) {
    console.error('[user.actions][Error saving user details]:', error);
    return { ok: false, message: error instanceof Error ? error.message : 'An error occurred while saving the user details' };
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