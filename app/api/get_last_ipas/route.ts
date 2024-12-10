import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';


const API_KEY = process.env.API_KEY_SET_OWNER_NFT_CONTRACT;

type IPAList = string[];

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    const filePath = path.join(process.cwd(), 'db/last_ipas.json');

    let ipas: IPAList = [];

    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      ipas = JSON.parse(jsonData);
    }

    const startIndex = (page - 1) * limit;
    const paginatedData = ipas.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      data: paginatedData,
      total: ipas.length,
      page,
      limit,
  });

  } catch (error) {
    console.error('Error reading last_ipas.json:', error);
    return NextResponse.json(
      { error: 'Can not get IPAS list.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== API_KEY) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { IPAssetAddress } = body;

  if (!IPAssetAddress) {
    return NextResponse.json({ error: 'IPAssetAddress is required' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'db/last_ipas.json');
    let addresses: string[] = [];

    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      addresses = JSON.parse(jsonData);
      if (!Array.isArray(addresses)) {
        addresses = [];
      }
    }

    if (!addresses.includes(IPAssetAddress)) {
      addresses.push(IPAssetAddress);
    }

    fs.writeFileSync(filePath, JSON.stringify(addresses, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Unable to save IPAssetAddress' }, { status: 500 });
  }
}