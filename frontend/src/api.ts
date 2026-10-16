

export async function sendMessage(message:string): Promise<string>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({message}),
    });
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.error.message)
    }
    return data.reply;
}