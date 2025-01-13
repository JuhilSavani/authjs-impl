"use server"

// TODO: complete the implementation of these actions

export async function login(credentials: SignInCredentials){
  console.log(`called login(${JSON.stringify(credentials)})`);
}

export async function register(credentials: SignUpCredentials){
  console.log(`called register(${JSON.stringify(credentials)})`);
}