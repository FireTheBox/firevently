import { Session } from "next-auth";

export function getUserEmail(session: Session | null) {
    if (!session || !session.user) {
        return;
    }

    const { email } = session.user;

    return email ?? undefined;
}

export function isAdmin(session: Session | null) {
    const email = getUserEmail(session);

    if (!email) {
        return false;
    }

    const adminEmails = process.env.ALLOWED?.split(",");

    return adminEmails && adminEmails.includes(email);
}