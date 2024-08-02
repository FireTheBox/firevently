"use server";

export async function getProjectsCount(): Promise<number | null> {
    const pageId = "YRo7SuUISP";
    const tableId = "grid-ROLloJcPZR";
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

    return body?.items?.length ?? 0;
}