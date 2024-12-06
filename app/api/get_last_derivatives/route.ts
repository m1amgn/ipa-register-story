import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';


type derivativesList = string[];

export async function GET(): Promise<NextResponse> {
    try {
        const filePath: string = path.join(process.cwd(), 'last_derivatives.json');
        const fileContents: string = await fs.readFile(filePath, 'utf-8');
        const derivatives: derivativesList = JSON.parse(fileContents);
        return NextResponse.json(derivatives);
    } catch (error) {
        console.error('Error reading last_derivatives.json:', error);
        return NextResponse.json(
            { error: 'Can not get derivatives list.' },
            { status: 500 }
        );
    }
}