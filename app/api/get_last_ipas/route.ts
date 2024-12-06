import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';


type IPAList = string[];

export async function GET(): Promise<NextResponse> {
    try {
        const filePath: string = path.join(process.cwd(), 'last_ipas.json');
        const fileContents: string = await fs.readFile(filePath, 'utf-8');
        const ipas: IPAList = JSON.parse(fileContents);
        return NextResponse.json(ipas);
    } catch (error) {
        console.error('Error reading last_ipas.json:', error);
        return NextResponse.json(
            { error: 'Can not get IPAS list.' },
            { status: 500 }
        );
    }
}
