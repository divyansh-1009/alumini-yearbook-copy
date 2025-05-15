import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Section from '../../../models/Section';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userEmail = session.user?.email;
        if (!userEmail) {
            return NextResponse.json({ error: 'No email found in session' }, { status: 400 });
        }
        let userSections;
        try{
            userSections = await Section.find({ email: userEmail });
        }
        catch(_){ 
            return NextResponse.json({ error: 'Failed gather' }, { status: 500 });
        }
        return NextResponse.json(userSections);
    } catch (err) { 
        console.error('Error fetching user Sections:', err);
        return NextResponse.json({ error: 'Failed to fetch user Sections' }, { status: 500 });
    }
}