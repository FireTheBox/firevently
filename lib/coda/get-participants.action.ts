"use server";

export async function getParticipants(eventId: string): Promise<string[] | null> {
    const pageId = eventId === "66b3bdfa0d97c5415ee6c2be" ? "EmC_WBrbTO" : "OY5gXjYYxk";
    const tableId = eventId === "66b3bdfa0d97c5415ee6c2be" ? "grid-sync-10087-Submissions-dynamic-d504c0d0b974b358120d326eb6b514870f20af985597e114e01752b919934bc8" : "grid-sync-10087-Submissions-dynamic-f5d937029f92425d01fe4f6efe8ecc96745d52ea67db90c5ac230747035cf737";
    const result = await fetch(`https://coda.io/apis/v1/docs/${pageId}/tables/${tableId}/rows`, {
        headers: {
            "Authorization": `Bearer ${process.env.CODA_API_TOKEN}`
        },
        next: {
            revalidate: 5 * 60
        }
    })

    const body = await result.json();

    if (!result.ok) {
        return null;
    }

    const participants = body.items;
    const emails: string[] = []

    for (const participant of participants) {
        const email = participant.values[eventId === "66b3bdfa0d97c5415ee6c2be" ? "c-bigZyphUj_" : "c-Mvtyg7ekvt"]
        emails.push(email);
    }

    return emails;
}