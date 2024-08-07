"use server";

export async function getProjectsCount(eventId: string): Promise<number | null> {
    const pageId = eventId === "66b3bdfa0d97c5415ee6c2be" ? "nXHOTOYHKh" : "YRo7SuUISP";
    const tableId = eventId === "66b3bdfa0d97c5415ee6c2be" ? "grid-qhjRrsJBup" : "grid-ROLloJcPZR";
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

    if (body?.items?.length === 1) {
        if (body.items[0].name.trim() === "Nenhuma equipe inscrita ainda") {
            return 0;
        }
    }

    return body?.items?.length ?? 0;
}